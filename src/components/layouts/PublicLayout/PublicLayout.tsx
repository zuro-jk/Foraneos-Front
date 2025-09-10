import PublicFooter from "@/components/Footer/PublicFooter";
import { PublicHeader } from "@/components/Header";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
