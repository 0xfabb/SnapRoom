"use client";

import dynamic from "next/dynamic";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import { IconHome2, IconSettings } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Editor = dynamic(() => import("../../components/editor"), { ssr: false });

export default function HomePage() {
  const roomId = "main";

  return (
    <Sidebar>
      <div className="sm:flex h-screen bg-black text-white overflow-hidden">
        {/* Sidebar: renders Desktop + Mobile inside */}
        <SidebarBody className="sm:flex sm:justify-between">
          <div>
            <SidebarLink
              link={{
                href: "/room",
                label: "Home",
                icon: <IconHome2 className="text-white" />,
              }}
            />
            <SidebarLink
              link={{
                href: "/settings",
                label: "Settings",
                icon: <IconSettings className="text-white" />,
              }}
            />
          </div>

          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </SidebarBody>

        {/* Main content area */}
        <main className="flex-1 p-8 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">SnapRoom - Shared Space</h1>
          <Editor roomId={roomId} />
        </main>
      </div>
    </Sidebar>
  );
}
