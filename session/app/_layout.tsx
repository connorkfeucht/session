import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const [loaded] = useFonts({ // TODO: decide on a better font
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PlayfairDisplay: require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
    PlayfairDisplayItalic: require('../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'),
  });
  const noBackArrow = ["1-home", "2-study", "3-profile", "posting"];

  useEffect (() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={({ route }) => ({
        headerTitle: "Seshn",
        headerTitleStyle: { fontFamily: "PlayfairDisplay", fontSize: 24, fontWeight: "700" },
        headerBackVisible: !noBackArrow.includes(route.name),
      })}
    />
  );
}
