import { supabase } from "@/lib/supabase";

async function getCurrentUserId(): Promise<string> {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;

    const userId = session?.user.id;
    if (!userId) throw new Error("No active session");

    return userId;
}

export default getCurrentUserId;
