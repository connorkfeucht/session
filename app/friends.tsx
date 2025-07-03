import { Text, View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Image, Touchable } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import getCurrentUserId from "@/app/utils/authUtils";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type IncomingRequestRow = {
  requester_id: string,
  addressee_id: string,
  created_at: string,
  status: string,
  requester_username: string,
  requester_avatar_url: string,
}

export default function Friends() {
  const [value, setValue] = useState<string>("");
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequestRow[] | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIncomingFriendRequests = async () => {
      const userId = await getCurrentUserId();
      try {
        const {data: incomingRequestData, error: incomingRequestError } = await supabase // fetching incoming pending requests for user
          .from("friendships")
          .select()
          .eq("addressee_id", userId)
          .eq("status", "pending")

        if (incomingRequestError) throw incomingRequestError;

        const items: IncomingRequestRow[] = await Promise.all(
          (incomingRequestData || []).map(async (r) => { // fetching the username and avatar of the current friend request sender
            const {data: profileData, error: profileError } = await supabase
              .from("profiles")
              .select("username, avatar_url")
              .eq("id", r.requester_id)
              .single()
            
            if (profileError) throw profileError;

            return {
              requester_id: r.requester_id,
              addressee_id: r.addressee_id,
              created_at: r.created_at,
              status: r.status,
              requester_username: profileData.username,
              requester_avatar_url: profileData.avatar_url,
            }
          })

        )

        setIncomingRequests(items);

      } catch(error: any) {
        console.error("Error loading incoming friend requests: ", error.message)
      } finally {
        setLoading(false);
      }
    }

    loadIncomingFriendRequests();
  }, [])

  const handleSendFriendRequest = async () => {
    const userId = await getCurrentUserId();
    const { data: addresseeData, error: selectError } = await supabase // returns an array of users that match the query.
      .from("profiles")
      .select("id, username")
      .eq("username", value.toLowerCase())
    
    if (selectError) throw selectError;

    if (!addresseeData || addresseeData.length === 0) { // if user is not found
      console.log("not found error")
      throw new Error("There was an error finding this user.")
    }

    if (addresseeData[0].id === userId) { // addressee is not the user. (cant send to self)
      console.log("self error")
      throw new Error("You cannot send a friend request to yourself.")
    }

    // checks that the friend request doesn't already exist
    // checks both directions: user -> addresse and addresse -> user
    const { data: friendshipsData, error: friendshipsError } = await supabase
      .from("friendships")
      .select("requester_id, addressee_id")
      .in("requester_id", [userId, addresseeData[0].id])
      .in("addressee_id", [userId, addresseeData[0].id])

    if (friendshipsError) throw friendshipsError;
    if (friendshipsData && friendshipsData.length > 0) {
      console.log("dupe error")
      throw new Error("You cannot send a duplicate friend request.")
    }

    const { error: insertError } = await supabase
      .from("friendships")
      .insert({
        requester_id: userId,
        addressee_id: addresseeData[0].id,
        status: "pending",
      })

    if (insertError) throw insertError;
    console.log("successfully sent friend request")

  }

  const handleAcceptFriendRequest = async (requester_id: string) => {
    const userId = await getCurrentUserId();
    try {
      const {data: requestData, error: requestError } = await supabase
        .from("friendships")
        .update({status: "accepted"})
        .eq("requester_id", requester_id)
        .eq("addressee_id", userId)
        .eq("status", "pending")
  
        if (requestError) throw requestError;

        // removes the request from incoming requests in ui
        setIncomingRequests((prev) => prev?.filter((r) => r.requester_id !== requester_id) ?? null );
    } catch(error: any) {
      console.error("There was an error accepting the friend request", error.message)
    }

  }

  if (loading) { // if activities are still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Search for a friend..."
          placeholderTextColor="#AAA"
          multiline
          style={styles.textBox}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendFriendRequest}>
        <Text style={styles.text}>Send</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{Array.isArray(incomingRequests) && incomingRequests.length > 0 ? "Incoming friend requests": "You currently have no incoming friend requests"}</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
        {incomingRequests?.map((request) => (
          <View key={request.requester_id} style={styles.incomingRequestCard}>
            <View style={styles.row}>
              <Image source={{ uri: request.requester_avatar_url || "https://via.placeholder.com/40/cccccc?text=U", }} style={styles.avatar}/>
              <Text style={styles.text}>{request.requester_username}</Text>
              <TouchableOpacity onPress={() => handleAcceptFriendRequest(request.requester_id)}><FontAwesome name="check" size={24}/></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    fontFamily: "PlayfairDisplay",
  },
  sendButton: {
    width: "45%",
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#111",
    marginBottom: 12,
  },
  textBox: {
    width: "100%",
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 12,
    borderColor: "#111",
    marginBottom: 12,
    marginTop: 12,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    width: "90%",
  },
  incomingRequestCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 12,
  }

});