import { Outlet } from "react-router-dom";
import ProfileSidebar from "../profile-sidebar/ProfileSidebar";

const AccountLayout = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-8 flex-col gap-8 p-8">
        <h1 className="text-3xl font-bold col-span-full">Account Settings</h1>
        <div className="bg-white p-2 rounded-lg col-span-2">
          <ProfileSidebar />
        </div>
        <div className="flex flex-col col-span-6 p-4 gap-8 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
