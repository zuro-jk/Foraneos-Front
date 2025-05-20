import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Home",
    url: "/user/main-dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/user/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/user/schedule",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/user/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar
      variant="sidebar"
      side="left"
      collapsible="icon"
    >
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
