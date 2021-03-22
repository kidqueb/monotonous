import { useConfirmEmailMutation } from "@monotonous/sdk-client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function ConfirmEmail() {
  const router = useRouter();
  const initialToken =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("token");
  const email =
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("email")) ||
    "";
  const [{ fetching }, confirmEmail] = useConfirmEmailMutation();
  const [token, setToken] = useState(initialToken || "");

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault();

      await confirmEmail({
        email,
        token,
      });

      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Confirm Your Email</p>

      <p>
        <label>Email</label>
        <input value={email} readOnly />
      </p>

      <p>
        <label>Confirmation Token</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.currentTarget.value)}
        />
      </p>

      <button disabled={fetching}>Submit</button>
    </form>
  );
}
