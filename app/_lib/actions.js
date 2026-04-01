"use server";
import { auth, signIn, signOut } from "./auth";

auth;
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
