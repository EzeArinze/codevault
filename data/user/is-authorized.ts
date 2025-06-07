import "server-only";
import { cache } from "react";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export const isAuthorized = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("User is required to create a snippet.");
  }

  return session.user;
});
