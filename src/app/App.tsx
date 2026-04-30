import { Route, Routes } from "react-router";
import { Footer } from "./components/Footer";
import { SiteHeader } from "./components/SiteHeader";
import { appRoutes } from "./routes";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}
