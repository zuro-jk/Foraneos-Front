import { PrivateFooter } from "@/components/Footer";
import { PrivateHeader } from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function PrivateLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <PrivateHeader />

        <main className="flex-1 p-4">
          <Outlet />
        </main>

        <PrivateFooter />
      </div>
    </div>
  );
}

export default PrivateLayout;
