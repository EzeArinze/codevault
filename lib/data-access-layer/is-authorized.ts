"use server";
import { auth } from "../auth";
import { headers } from "next/headers";

export const isAuthorized = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("User is required to create a snippet.");
  }

  return session.user;
};
