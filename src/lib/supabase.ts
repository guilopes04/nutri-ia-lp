// Cliente Supabase para a landing
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !anon) {
  // Não lançar erro para não quebrar build; apenas avisar em console
  console.warn('[env] VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY ausentes')
}

export const supabase = createClient(url || 'http://localhost', anon || '');

