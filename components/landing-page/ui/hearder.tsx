"use client";
import { Code, Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between w-full px-4 md:px-6 mx-auto">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
              <div className="flex items-center gap-2 mb-10 px-2">
                <Code className="h-7 w-7 text-primary" />
                <span className="text-2xl font-bold">CodeVault</span>
              </div>
              <div className="flex flex-col h-full bg-background px-6 pb-8">
                <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
                  {Links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-lg font-medium rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 ease-in-out"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t px-2">
                  <Button variant="outline" className="w-full justify-center h-12 text-base rounded-xl" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/sign-in">Log in</Link>
                  </Button>
                  <Button className="w-full justify-center h-12 text-base rounded-xl" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Code className="h-6 w-6 text-primary hidden md:block" />
          <span className="text-xl font-bold">CodeVault</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {Links.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary"
              >
                {" "}
                {link.label}{" "}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:text-primary hidden md:inline-flex"
          >
            Log in
          </Link>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
