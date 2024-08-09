import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";
const MainLayout = () => {
    const [navBarHeight, setNavBarHeight] = useState<number>(0);
    const navBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (navBarRef.current) {
            setNavBarHeight(navBarRef.current.clientHeight);
        }

        const handleResize = () => {
            if (navBarRef.current) {
                setNavBarHeight(navBarRef.current.clientHeight);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={`h-[calc(100%-${navBarHeight}px)]`}>
            <div ref={navBarRef}>
                <NavBar />
            </div>
            <Outlet />
        </div>
    );
};

export default MainLayout;
