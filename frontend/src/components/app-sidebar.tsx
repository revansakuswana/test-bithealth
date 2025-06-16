import * as React from "react";
import { File, Box, List, House } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/useUser";

const data = {
  teams: [
    {
      name: "Bithealth",
      logo: "https://media.licdn.com/dms/image/v2/D4E0BAQEtbeSJkNL14Q/company-logo_200_200/company-logo_200_200/0/1664787920525/bithealth_logo?e=2147483647&v=beta&t=XrTtFiOeMmG2EDSrOY4FI9O8yeX_NKNX33bRFkcCIwQ",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "Master Produk",
      url: "/list-product",
      icon: Box,
    },
    {
      title: "Master Dokumen",
      url: "/master-product",
      icon: File,
    },
    {
      title: "Daftar Pekerjaan",
      url: "/list-pekerjaan",
      icon: List,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.name ?? "User",
              email: user.email,
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${
                user.name ?? user.email
              }`,
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
