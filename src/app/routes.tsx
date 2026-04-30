import type { ReactNode } from "react";
import { AdminRedirectPage } from "./pages/AdminRedirectPage";
import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { HomePage } from "./pages/HomePage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ServicesPage } from "./pages/ServicesPage";

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
    path: "/admin",
    element: <AdminRedirectPage />,
  },
  {
    path: "/services/:slug",
    element: <ServiceDetailPage />,
  },
];

export const navigationRoutes = appRoutes.filter((route) => route.showInNavigation && route.label);
