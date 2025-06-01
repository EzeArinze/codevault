import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Code Vault",
  description: "A vault for your code snippets and templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
