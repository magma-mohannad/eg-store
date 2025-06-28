import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/appSidebar";

function App() {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className={"lg:hidden"} />
        <main className="w-full py-7 xl:px-40 px-20">
          <Outlet />
        </main>
      </SidebarProvider>
      <Footer />
    </>
  );
}

export default App;
