import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Makes the (tabs) header not show
                tabBarLabelStyle: { fontFamily: "PlayfairDisplay" },
                tabBarActiveTintColor: "#007AFF",    // iOS system blue
                tabBarInactiveTintColor: "#8E8E93",  // iOS system gray
            }}
        >
            <Tabs.Screen
                name="1-home"
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color}/> // TODO: Find icons to put here
                }}
            />
            <Tabs.Screen
                name="2-study"
                options={{
                    tabBarLabel: "Study", // takes you to the study timer page
                    tabBarIcon: ({ color, size }) => <FontAwesome name="book" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="3-profile"
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color}/>
                }}
            />
        </Tabs>

    );
}