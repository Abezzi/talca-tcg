import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function DeckPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">SETTINGS</h1>
    </main>
  );
}
