import { api } from "./api";
import type { CreateNote, Note } from "@/types/note";
import type { NotesResponse } from "@/types/api";
import { User } from "@/types/user";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface UpdateUser {
  email: string;
  username: string;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search: string,
  tag?: string,
): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });
  return data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(content: CreateNote): Promise<Note> {
  const { data } = await api.post<Note>("/notes", content);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function login(data: RegisterRequest): Promise<User> {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
}

export async function register(data: RegisterRequest): Promise<User> {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function logout() {
  const response = await api.post("/auth/logout");
  return response.data;
}

export async function checkSession() {
  const response = await api.get("/auth/session");
  return response.data;
}

export async function getMe() {
  const response = await api.get("/users/me");
  return response.data;
}

export async function updateMe(data: UpdateUser) {
  const response = await api.patch(`/users/me`, data);
  return response.data;
}
