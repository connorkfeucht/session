import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { useRouter } from "expo-router";

// Landing page
export default function Index() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter();

  useEffect(() => {
    // Fetch any already logged in session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        router.replace("/1-home"); // go to home tab if theres a session
      }
    })

    // watch for future login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        router.replace("/1-home");
      }
    });

    return () => {
      subscription.unsubscribe();
    };

  }, [router])

  // show sign-in form
  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}