import { auth } from "~/server/auth";
import { Sidebar } from "./sidebar"; // Adjust path if needed

// Define the exact shape we want to pass to the client
type ClientSafeSession = {
  user: {
    name: string | null;
    image: string | null;
  } | null;
} | null;

export async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Create a client-safe version with only the fields we need and correct types
  const safeSession: ClientSafeSession = session
    ? {
      user: session.user
        ? {
          name: session.user.name ?? null, // Convert undefined → null
          image: session.user.image ?? null, // Convert undefined → null
        }
        : null,
    }
    : null;

  return (
    <>
      <Sidebar session={safeSession} />
      {children}
    </>
  );
}
