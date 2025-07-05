import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/appSidebar";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <SidebarProvider>
        {pathname === "/" && <AppSidebar />}
        <main className="w-full py-7 xl:px-20 sm:px-18 px-1p">
          <Outlet />
        </main>
        {pathname === "/" && (
          <SidebarTrigger className="sticky top-2 right-2 md:hidden font-semibold" />
        )}
      </SidebarProvider>
      <Footer />
    </>
  );
}

export default App;
