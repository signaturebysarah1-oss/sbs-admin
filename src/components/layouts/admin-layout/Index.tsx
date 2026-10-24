import Container from "@/components/shared/inputs/Container";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../ui/sidebar";
import { AppSidebar, MobileSidebarTrigger } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
     <div className="hidden lg:flex">
     <AppSidebar />

     </div>

      <SidebarInset className="bg-[#FAFAF8]">
        <header className="flex items-center px-4 py-3 lg:hidden">
          <MobileSidebarTrigger  />
        </header>

        <Container>
  <div className="hidden lg:flex justify-end my-4">
    <SidebarTrigger
      className="h-9 w-auto rounded-md px-3 text-sm font-medium text-white bg-[#18120E] hover:bg-[#C9A227] hover:text-white transition-colors duration-200"
    />
  </div>

  <Outlet />
</Container>
      </SidebarInset>
    </SidebarProvider>
  );
}
