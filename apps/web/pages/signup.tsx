import React, { FormEvent, useState } from "react";
import { useRegisterMutation } from "@monotonous/sdk-client";

export default function Signup() {
  const [{ data, fetching }, register] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await register({
        email,
        firstName,
        lastName,
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (data) {
    return <p>Check your email for a confirmation.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-2xl">
      <p>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </p>
      <p>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
      </p>
      <p>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
      </p>

      <button type="submit" disabled={fetching}>
        Submit
      </button>
    </form>
  );
}
