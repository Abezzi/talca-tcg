import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function DeckPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  console.log("shouldn't see this");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">Deck Page</h1>
      <p className="mt-4 text-lg">This is your /deck page! It works!</p>
      <p className="mt-4 text-lg">only works if you are logged in</p>
    </main>
  );
}
