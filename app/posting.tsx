import { Text, View, TouchableOpacity, ScrollView, Image, TextInput, Switch } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import styles from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "@/lib/supabase";
import getCurrentUserId from "./utils/authUtils";

export default function Posting() {
    const router = useRouter();
    const { setsCompleted } = useLocalSearchParams();
    const [title, setTitle] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState(""); // TODO: make a proper location function
    const [productivity, setProductivity] = useState(50);
    const [isPrivate, setIsPrivate] = useState(false);
    const userId = getCurrentUserId();
    
    const pickImage = () => {
        // TODO: make image selecting function
    }

    const toggleSwitch = () => {
        if (isPrivate) {
            setIsPrivate(false);
        } else {
            setIsPrivate(true);
        }
    }

    const handlePostSeshn = async () => {
        // creating Activity in Supabase
        const { data: activityData, error: insertError } = await supabase
            .from('activities')
            .insert([{
                uid: userId,
                title: title,
                description: caption, 
                is_private: isPrivate, 
                sets_completed: setsCompleted,
                location: location, 
            }]) // TODO: Get the images[] to insert into the table as well
        
        if (insertError) throw insertError;
        console.log("insert ->", {activityData, insertError})

        // updating the number of seshns_completed in the database.
        // 1) fetching seshns_completed
        const { data: profileRow, error: fetchError } = await supabase
            .from("profiles")
            .select("seshns_completed")
            .eq("id", userId)
            .single();

        if (fetchError) throw fetchError;
        
        const currentCount = profileRow?.seshns_completed ?? 0;

        // 2) write it back +1
        const { error: updateError } = await supabase
            .from("profiles")
            .update({ seshns_completed: currentCount + 1 })
            .eq("id", userId);
        
        if (updateError) throw updateError;

        // go back to home page
        router.replace({
            pathname: "/1-home"
        });
    }
    // TODO: Add productivity and mood sliders
    return (
    <View style={styles.containerTwo}>
        <Text style={{...styles.statsText, marginTop: 20, marginBottom: 20}}>You completed {setsCompleted} sets this seshn!</Text>
        {/* <Text style={styles.statsText}>Title</Text> */}
        <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={"Enter a Title..."}
            placeholderTextColor={"#8E8E93"}
            style={{...styles.textBox,
                borderBottomWidth: 1,
                marginBottom: 20,
                padding: 4,}}
        />
        {/* <Text style={styles.statsText}>Images</Text> */}
        <TouchableOpacity
        onPress={pickImage}
        style={{
            width: "100%",
            height: 140,
            backgroundColor: "#F7F7F8",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E5EA",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
        }}
        >
        {images[0] ? (
            <Image source={{ uri: images[0] }} style={{ width: "100%", height: "100%", borderRadius: 12 }} />
        ) : (
            <Ionicons name="camera-outline" size={32} color="#999" />
        )}
        </TouchableOpacity>

        {/* <Text style={styles.statsText}>Caption</Text> */}
        <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Write a caption…"
            placeholderTextColor="#AAA"
            multiline
            style={{...styles.textBox,
                borderBottomWidth: 1,
                marginBottom: 20,
                padding: 4,}}
        />

        {/* <Text style={styles.statsText}>Location</Text> */}
        <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Set your Location…"
            placeholderTextColor="#AAA"
            multiline
            style={{...styles.textBox,
                borderBottomWidth: 1,
                marginBottom: 20,
                padding: 4,}}
        />

        {/* Private switch */}
        <View style={styles.row}>
            <Text style={styles.statsText}> Private Activity</Text>
            <Switch onValueChange={toggleSwitch} value={isPrivate} />
        </View>

        { /* TODO: Productivity and mood slider here */}

        <TouchableOpacity style={{...styles.button, alignSelf: "center"}} onPress={handlePostSeshn}>
            <Text style={styles.buttonText}>FINISH</Text>
        </TouchableOpacity>
    </View>
    

    );
}