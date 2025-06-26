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
        <main className="w-full">
          <SidebarTrigger className={"lg:hidden"} />
          <Outlet />
        </main>
      </SidebarProvider>
      <Footer />
    </>
  );
}

export default App;
