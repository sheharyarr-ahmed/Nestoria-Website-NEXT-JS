"use server";
import { auth, signIn, signOut } from "./auth";

export async function updateGuest(formData) {
  console.log(Object.fromEntries(formData.entries()));
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
