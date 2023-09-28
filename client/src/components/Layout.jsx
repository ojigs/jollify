import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-[1fr,auto]">
      <aside className="col-span-5 md:col-span-1 md:sticky md:top-0 md:h-screen overflow-y-auto bg-primary text-white">
        <NavBar />
      </aside>
      <main className="col-span-5 md:col-span-4 grid grid-rows-[1fr,auto]">
        <div className="bg-secondary-200 row-span-1 min-h-screen overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
