export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: {
    id: string;
    email?: string;
  };
};

export function isSupabaseConfigured() {
  return Boolean(supabaseConfig.url && supabaseConfig.anonKey);
}

export async function signInWithPassword(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configurato.");
  }

  const response = await fetch(`${supabaseConfig.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: supabaseConfig.anonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Credenziali non valide o utente non ancora creato.");
  }

  return (await response.json()) as SupabaseSession;
}

export async function fetchSupabaseTable<T>(table: string, token: string) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configurato.");
  }

  const response = await fetch(`${supabaseConfig.url}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Impossibile leggere la tabella ${table}.`);
  }

  return (await response.json()) as T[];
}
