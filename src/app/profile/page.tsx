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
        <h1 className="text-4xl font-bold">{session?.user?.name}&apos;s Profile</h1>
        <p>hours played: 420</p>
        <p>rank: #12345</p>
        <p>favorite card:</p>
        <p>achievements:</p>
      </main>
    </div>
  );
}
