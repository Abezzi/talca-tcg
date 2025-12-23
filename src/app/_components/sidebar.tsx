"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCartIcon } from "./icons/shopping-cart";
import { PlayIcon } from "./icons/play";
import { DeckIcon } from "./icons/deck";
import { SettingsIcon } from "./icons/settings";
import { LogoutIcon } from "./icons/logout";
import { TutorialIcon } from "./icons/graduation-cap";

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

  const activeClasses = "bg-white/20 ring-2 ring-white/50";
  const hoverClasses = "hover:bg-white/10";

  return (
    <aside className="group fixed top-0 right-0 z-50 flex h-full w-20 flex-col items-center justify-between bg-black/50 py-8 backdrop-blur-md transition-all duration-300 hover:w-64 hover:bg-black/80">
      <div className="flex w-full flex-col items-center gap-8">
        {/* Avatar */}
        <Link
          href={session ? "/profile" : "/api/auth/signin"}
          className="flex flex-col items-center gap-3 px-4"
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-green-800 transition-all">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "User avatar"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-purple-600 to-pink-600">
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

          <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100">
            {session?.user?.name ?? "Sign in"}
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="flex w-full flex-col items-center gap-4 px-4">
          {/* Play */}
          {session && (
            <Link
              href="/play"
              className={`${isActive("/play") ? activeClasses : hoverClasses} flex w-full items-center justify-center rounded-lg px-6 py-3 text-white transition group-hover:justify-start`}
            >
              <PlayIcon />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
                Play
              </span>
            </Link>
          )}

          {/* Tutorial */}
          <Link
            href="/tutorial"
            className={`${isActive("/tutorial") ? activeClasses : hoverClasses} flex w-full items-center justify-center rounded-lg px-6 py-3 text-white transition group-hover:justify-start`}
          >
            <TutorialIcon />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
              Tutorial
            </span>
          </Link>

          {/* Deck */}
          {session && (
            <Link
              href="/deck"
              className={`${isActive("/deck") ? activeClasses : hoverClasses} flex w-full items-center justify-center rounded-lg px-6 py-3 text-white transition group-hover:justify-start`}
            >
              <DeckIcon />
              <span className="text white max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
                Deck
              </span>
            </Link>
          )}

          {/* Shop */}
          {session && (
            <Link
              href="/shop"
              className={`${isActive("/shop") ? activeClasses : hoverClasses} flex w-full items-center justify-center rounded-lg px-6 py-3 text-white transition group-hover:justify-start`}
            >
              <ShoppingCartIcon />
              <span className="text white max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
                Shop
              </span>
            </Link>
          )}

          {/* Settings */}
          {session && (
            <Link
              href="/settings"
              className={`${isActive("/settings") ? activeClasses : hoverClasses} flex w-full items-center justify-center rounded-lg px-6 py-3 text-white transition group-hover:justify-start`}
            >
              <SettingsIcon />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
                Settings
              </span>
            </Link>
          )}
        </nav>
      </div>

      {/* Logout - Only visible when logged in */}
      {session && (
        <div className="px-4">
          <Link
            href="/api/auth/signout"
            className="flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm text-red-400 transition group-hover:justify-start hover:bg-white/10 hover:text-red-300"
          >
            <LogoutIcon />
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100">
              Logout
            </span>
          </Link>
        </div>
      )}
    </aside>
  );
}
