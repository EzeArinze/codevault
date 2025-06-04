import { getServerSession } from "@/actions/get-server-session";

export const isAuthorized = async () => {
  const { session } = await getServerSession();

  if (!session?.user?.id) {
    throw new Error("User is required to create a snippet.");
  }

  return session.user;
};
