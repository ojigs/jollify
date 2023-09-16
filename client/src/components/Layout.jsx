import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="grid grid-cols-5 h-screen">
      <aside className="col-span-1 bg-primary text-white ">
        <NavBar />
      </aside>
      <main className="col-span-4 grid grid-rows-[1fr,auto]">
        <div className="bg-secondary-200 row-span-1 overflow-y-auto p-8">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
