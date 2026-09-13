import { api } from "../../app/api/api";
import { cookies } from "next/headers";
import type { NotesResponse } from "@/types/api";
import type { Note } from "@/types/note";

export async function fetchNotes(
  page: number,
  perPage: number,
  search: string,
  tag?: string,
): Promise<NotesResponse> {
  const cookieStore = await cookies();
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getMe() {
  const cookieStore = await cookies();
  const response = await api.get("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const response = await api.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}
