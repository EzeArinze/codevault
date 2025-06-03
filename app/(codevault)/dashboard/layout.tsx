import type { Metadata } from "next";
import "../../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import DashboardHeader from "@/components/dashboard/sidebar/dashboard-hearder";

export const metadata: Metadata = {
  title: "Code Vault",
  description: "Dashboard for managing your code snippets",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <NuqsAdapter>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <DashboardHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </NuqsAdapter>
      <Toaster />
    </ThemeProvider>
  );
}
