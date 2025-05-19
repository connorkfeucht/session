import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

import {EXPO_SUPABASE_URL, EXPO_SUPABASE_ANON_KEY } from '@env'

export const supabase = createClient(EXPO_SUPABASE_URL, EXPO_SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})