import Sidebar from "@/app/components/(desk)/SideBar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
