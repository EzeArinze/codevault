import { footerLinks } from "@/utils/constants";
import { Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full border-t py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
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
                <Image
                  src={"/public/social-svg/github.svg"}
                  alt="footer-social-icons"
                  width={24}
                  height={24}
                />
                <span className="sr-only">GitHub</span>
              </Link>

              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Image
                  src={"/public/social-svg/twitter.svg"}
                  alt="footer-social-icons"
                  width={24}
                  height={24}
                />

                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
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
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CodeVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
