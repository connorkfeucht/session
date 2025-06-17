import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Friends() {
  const [value, setValue] = useState<string>("");

  const handleAddFriend = async () => {
    const { data: { session }, } = await supabase.auth.getSession();
    const userId = session?.user.id;
    if (!userId) throw new Error("No active session");

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

    // checks that the friend request doesn't already exist.
    const { data: friendshipsData, error: friendshipsError } = await supabase
      .from("friendships")
      .select("requester_id, addressee_id")
      .eq("requester_id", userId)
      .eq("addressee_id", addresseeData[0].id)

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
      <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}