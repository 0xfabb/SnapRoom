import { Sidebar } from "../../components/ui/sidebar";

export default function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Sidebar>{children}</Sidebar>;
}
