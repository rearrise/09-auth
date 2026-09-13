"use client";

import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { register, RegisterRequest } from "@/lib/api/clientApi";
export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: RegisterRequest = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const response = await register(formValues);

      if (response) {
        setUser(response);
        router.push("/profile");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>Error</p>}
      </form>
    </main>
  );
}
