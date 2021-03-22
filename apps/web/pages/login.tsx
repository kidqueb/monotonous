import React, { FormEvent, useState } from "react";
import {
  useRequestLoginMutation,
  useLoginMutation,
} from "@monotonous/sdk-client";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const initialEmail =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("email");
  const initialCode =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("code");
  const [{ fetching }, requestLogin] = useRequestLoginMutation();
  const [{ fetching: loginFetching }, login] = useLoginMutation();
  const [email, setEmail] = useState(initialEmail || "");
  const [code, setCode] = useState(initialCode || "");

  async function handleLoginRequest(e: FormEvent) {
    e.preventDefault();

    try {
      if (data) {
        await requestLogin({ email });
      } else {
        await login({ code });
        router.replace("/");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main className="max-w-sm mx-auto text-sm">
      <form onSubmit={handleLoginRequest}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            readOnly={Boolean(data)}
          />
        </p>
        {data && (
          <p>
            <label htmlFor="code">Code</label>
            <input
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.currentTarget.value)}
            />
          </p>
        )}

        <button type="submit" disabled={fetching || loginFetching}>
          Submit
        </button>
      </form>
    </main>
  );
}
