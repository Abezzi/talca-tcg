"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Session = {
  user: {
    name: string | null;
    image: string | null;
  } | null;
} | null;

type SidebarProps = {
  session: Session;
};

export function Sidebar({ session }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="group fixed top-0 right-0 z-50 flex h-full w-20 flex-col items-center justify-between bg-black/20 py-8 backdrop-blur-md transition-all duration-300 hover:w-64 hover:bg-black/40">
      <div className="flex w-full flex-col items-center gap-8">
        {/* Avatar */}
        <Link
          href={session ? "/profile" : "/api/auth/signin"}
          className="flex flex-col items-center gap-3 px-4"
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-white/20 transition-all group-hover:ring-white/40">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "User avatar"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>

          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100">
            {session?.user?.name ?? "Sign in"}
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="flex w-full flex-col items-center gap-4 px-4">
          {/* Play */}
          <Link
            href="/play"
            className={`${isActive("/deck") ? "bg-white/20 ring-2 ring-white/50" : "hover:bg-white/10"} flex w-full items-center justify-center rounded-lg px-6 py-3 transition group-hover:justify-start hover:bg-white/10`}
          >
            <svg
              className="h-6 w-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
              Play
            </span>
          </Link>

          {/* Deck */}
          <Link
            href="/deck"
            className={`${isActive("/deck") ? "bg-white/20 ring-2 ring-white/50" : "hover:bg-white/10"} flex w-full items-center justify-center rounded-lg px-6 py-3 transition group-hover:justify-start hover:bg-white/10`}
          >
            <svg
              className="h-6 w-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-8 0h8"
              />
            </svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
              Deck
            </span>
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            className={`${isActive("/deck") ? "bg-white/20 ring-2 ring-white/50" : "hover:bg-white/10"} flex w-full items-center justify-center rounded-lg px-6 py-3 transition group-hover:justify-start hover:bg-white/10`}
          >
            <svg
              className="h-6 w-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
              Settings
            </span>
          </Link>
        </nav>
      </div>

      {/* Logout - Only visible when logged in */}
      {session && (
        <div className="px-4">
          <Link
            href="/api/auth/signout"
            className="flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm text-red-400 transition group-hover:justify-start hover:bg-white/10 hover:text-red-300"
          >
            <svg
              className="h-6 w-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
              Logout
            </span>
          </Link>
        </div>
      )}
    </aside>
  );
}
