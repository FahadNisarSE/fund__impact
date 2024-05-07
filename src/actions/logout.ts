import { signOut } from "auth";

export default async function LogOut() {
  await signOut();
}
