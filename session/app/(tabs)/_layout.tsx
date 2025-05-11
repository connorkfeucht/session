import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Makes the (tabs) header not show
                tabBarLabelStyle: { fontFamily: "PlayfairDisplay" }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: "Home",
                    // tabBarIcon: () => <ICONHERE/> // TODO: Find icons to put here
                }}
            />
            <Tabs.Screen
                name="study"
                options={{
                    tabBarLabel: "Study" // takes you to the study timer page
                    // tabBarIcon: () => </>
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "Profile"
                    // tabBarIcon: () => </>
                }}
            />
        </Tabs>

    );
}