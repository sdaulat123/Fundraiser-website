import { NavLink } from "react-router";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
    isActive ? "bg-[#1E3A5F] text-white" : "text-[#1E3A5F] hover:bg-[#1E3A5F]/8",
  ].join(" ");

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1E3A5F]/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-bold tracking-[0.12em] text-[#1E3A5F]">
          LifeResource4You LLC
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClassName}>
            About Us
          </NavLink>
          <NavLink to="/services" className={navLinkClassName}>
            Services Offered
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
