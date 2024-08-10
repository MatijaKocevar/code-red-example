import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useRef, useState } from "react";
import ErrorDisplay from "../components/ErrorDisplay";

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
        <div className="h-full">
            <ErrorDisplay />
            <div ref={navBarRef}>
                <NavBar />
            </div>
            <div
                style={{
                    height: `calc(100% - ${navBarHeight}px)`,
                    overflowY: "hidden",
                }}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
