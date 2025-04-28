import Sidebar from "@/app/_components/self_profile/Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}

export default Layout;
