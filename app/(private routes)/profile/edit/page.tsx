import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";
import { updateMe, UpdateUser } from "@/lib/api/clientApi";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function Edit() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const handleSubmit = async (formData: FormData) => {
    const formValues: UpdateUser = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    };
    const response = await updateMe(formValues);
    if (response) {
      setUser(response);
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="user avatar"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user?.username}
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
