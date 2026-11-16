import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import SignOutButton from "./sign-out-button";
import Image from "next/image";
import { MonitorUp } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/admin/projects" className="font-bold tracking-tight flex flex-row items-center text-lg">
            <Image
              src="/images/logo.png"
              alt="Hiran Sandakelum logo"
              width={66}
              height={66}
              priority
              className="h-12 w-auto"
            />
            <span className="hidden lg:inline">Admin</span>
            <span className="hidden lg:inline text-primary">.dev</span>
          </Link>
          
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              target="_blank"
              className="text-primary hover:text-primary"
            ><MonitorUp />
              
            </Link>
            <span className="hidden text-gray-500 sm:inline">
              {session.user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
