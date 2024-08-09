import { NavLink } from "react-router-dom";

interface NavBarLink {
    label: string;
    href: string;
}

const NavBar = () => {
    const links: NavBarLink[] = [
        { label: "Home", href: "/" },
        { label: "Users", href: "/users" },
        { label: "Posts", href: "/posts" },
        { label: "Events", href: "/events" },
    ];

    return (
        <nav className="flex gap-6 p-4">
            {links.map((link) => (
                <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) => (isActive ? "font-bold text-white" : "")}
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
};

export default NavBar;
