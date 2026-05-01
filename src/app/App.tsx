import { Route, Routes, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { SiteHeader } from "./components/SiteHeader";
import { appRoutes } from "./routes";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {isAdminRoute ? null : <SiteHeader />}
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {isAdminRoute ? null : <Footer />}
    </div>
  );
}
