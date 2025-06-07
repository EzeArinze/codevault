import { getServerSession } from "@/data/user/get-server-session";
import { LoginForm } from "@/components/auth/ui/login-view";
import { ChevronsLeftRight } from "lucide-react";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { isAuthenticated } = await getServerSession();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ChevronsLeftRight className="size-4" />
          </div>
          CodeVault.
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
