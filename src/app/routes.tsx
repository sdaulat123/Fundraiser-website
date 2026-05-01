import { Suspense, lazy, type ReactNode } from "react";
import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { HomePage } from "./pages/HomePage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ServicesPage } from "./pages/ServicesPage";

const AdminStudioPage = lazy(async () => {
  const module = await import("./pages/AdminStudioPage");
  return { default: module.AdminStudioPage };
});

function AdminStudioRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F9FAFB] px-6 py-24">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_rgba(30,58,95,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Owner Blog Admin</p>
            <h1 className="mt-4 text-4xl font-bold text-[#1E3A5F]">Loading the publishing workspace.</h1>
          </div>
        </div>
      }
    >
      <AdminStudioPage />
    </Suspense>
  );
}

export type AppRoute = {
  path: string;
  element: ReactNode;
  label?: string;
  showInNavigation?: boolean;
  end?: boolean;
};

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    element: <HomePage />,
    label: "Home",
    showInNavigation: true,
    end: true,
  },
  {
    path: "/about",
    element: <AboutPage />,
    label: "About Us",
    showInNavigation: true,
  },
  {
    path: "/services",
    element: <ServicesPage />,
    label: "Services Offered",
    showInNavigation: true,
  },
  {
    path: "/blog",
    element: <BlogPage />,
    label: "Blog",
    showInNavigation: true,
  },
  {
    path: "/blog/:slug",
    element: <BlogPostPage />,
  },
  {
    path: "/admin/*",
    element: <AdminStudioRoute />,
  },
  {
    path: "/services/:slug",
    element: <ServiceDetailPage />,
  },
];

export const navigationRoutes = appRoutes.filter((route) => route.showInNavigation && route.label);
