import { useEffect } from "react";

export function AdminRedirectPage() {
  useEffect(() => {
    window.location.replace("/admin/index.html");
  }, []);

  return null;
}
