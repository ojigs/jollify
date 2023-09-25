import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="grid grid-cols-5">
      <aside className="col-span-1 sticky top-0 h-screen overflow-y-auto bg-primary text-white">
        <NavBar />
      </aside>
      <main className="col-span-4 grid grid-rows-[1fr,auto]">
        <div className="bg-secondary-200 row-span-1 min-h-screen overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
