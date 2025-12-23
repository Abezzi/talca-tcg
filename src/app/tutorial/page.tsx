import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function DeckPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold">TUTORIAL</h1>
      </main>
    </div>
  );
}
