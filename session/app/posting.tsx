import { Text, View, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import styles from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Posting() {
    const router = useRouter();
    const { setsCompleted } = useLocalSearchParams();
    const [title, setTitle] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState(""); // TODO: make a proper location function
    const [productivity, setProductivity] = useState(50);
    
    const pickImage = () => {
        // TODO: make image selecting function
    }

    // useEffect(() => {
        
    // }, []);

    const handlePostSeshn = () => {
        // TODO: create activity in supabase
        // TODO: post activity to home.tsx
        router.push({
            pathname: "/1-home"
        });
    }
    // TODO: Improve UI for this page, add productivity scale
    return (
    <View style={styles.container}>
        <Text style={{...styles.statsText, marginBottom: 20}}>You completed {setsCompleted} sets this seshn!</Text>
        <Text style={styles.statsText}>Title</Text>
        <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={"Enter a Title..."}
            placeholderTextColor={"#8E8E93"}
            style={{...styles.button,
                borderBottomWidth: 1,
                marginBottom: 20,
                padding: 4,}}
        />
        <Text style={styles.statsText}>Images</Text>
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

        <Text style={styles.statsText}>Caption</Text>
        <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Write a caption…"
            placeholderTextColor="#AAA"
            multiline
            style={{...styles.button,
                borderBottomWidth: 1,
                marginBottom: 20,
                padding: 4,}}
        />

        <Text style={styles.statsText}>Location</Text>
        <TouchableOpacity
            onPress={() => {}}
            style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#E5E5EA",
            paddingVertical: 10,
            marginBottom: 20,
            }}
        >
            <Ionicons name="location-outline" size={20} color="#555" />
            <Text style={{ ...styles.statsText, marginLeft: 8 }}>
            {location || "Add location"}
            </Text>
        </TouchableOpacity>

        { /* TODO: Productivity Scale Here */}

        <TouchableOpacity style={styles.button} onPress={handlePostSeshn}>
            <Text style={styles.buttonText}>FINISH</Text>
        </TouchableOpacity>
    </View>
    

    );
}