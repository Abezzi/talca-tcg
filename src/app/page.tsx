import Link from "next/link";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div className="relative min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {/* Main Content */}
        <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
          <div className="container flex max-w-4xl flex-col items-center justify-center gap-12">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Talca <span className="text-[hsl(280,100%,70%)]">TCG</span> Online
            </h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 transition hover:bg-white/20"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">How to Play →</h3>
                <div className="text-lg">
                  Just the basics - Everything you need to know to become the
                  greatest player in history.
                </div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 transition hover:bg-white/20"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">Lore →</h3>
                <div className="text-lg">
                  Read about the history of your favorite characters and the
                  Talca universe.
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
