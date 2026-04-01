"use server";
import { auth, signIn, signOut } from "./auth";

export async function updateGuest(fromData) {
  console.log(FormData);
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
