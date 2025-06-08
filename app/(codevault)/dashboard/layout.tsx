import type { Metadata } from "next";
import "../../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import DashboardHeader from "@/components/dashboard/sidebar/dashboard-hearder";
import Providers from "@/providers/query-provider";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Suspense } from "react";

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
        <Providers>
          <Suspense>
            <SidebarProvider>
              <Sidebar />
              <SidebarInset>
                <DashboardHeader />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </Suspense>
        </Providers>
      </NuqsAdapter>
      <Toaster position={"top-center"} duration={1000} />
    </ThemeProvider>
  );
}
