import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://aencgxfbrqzxngggxwrj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlbmNneGZicnF6eG5nZ2d4d3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NDAyNDcsImV4cCI6MjA2MjMxNjI0N30.eRRvxr-MAi3mIISClRwx0wUvcmxT-XFGSfMAoQ9wTlM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})