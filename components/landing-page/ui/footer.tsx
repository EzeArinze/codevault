// import { footerLinks } from "@/utils/constants/constants";
import { Code, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CodeVault</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Store, organize, and reuse your code snippets efficiently.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </Link>

              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="w-4 h-4 rounded-full" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          {/* <div className="space-y-4">
            {footerLinks.map((linkGroup) => {
              return (
                <div key={linkGroup.title} className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider">
                    {linkGroup.title}
                  </h4>
                  <ul className="space-y-2">
                    {linkGroup.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div> */}
        </div>
        <div className=" mt-2 border-t pt-2 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CodeVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
