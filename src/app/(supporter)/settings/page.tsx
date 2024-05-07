import { signOut } from "@/../auth";
import { Button } from "@/components/ui/button";

export default async function page() {
  return (
    <main>
      <h1>Setting pages</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </main>
  );
}
