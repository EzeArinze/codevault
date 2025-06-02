import { authClient } from "@/lib/auth-client";

export const useSession = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const initials = user?.name.slice(0, 2).toUpperCase() || "CV";

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return {
    user,
    initials,
    isPending,
    isAuthenticated: !!session,
    signOut,
  };
};
