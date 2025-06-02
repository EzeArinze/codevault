"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = !!session;

  return { session, isAuthenticated };
};
