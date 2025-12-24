import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import DeckBuilderClient from "~/app/_components/deck/deck-builder-client";

export default async function DeckPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return <DeckBuilderClient />;
}
