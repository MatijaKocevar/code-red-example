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
      {links.map((link) => {
        return (
          <NavLink key={link.href} to={link.href}>
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavBar;
