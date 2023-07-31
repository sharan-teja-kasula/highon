import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "./src/screens/Auth";
import HomeScreen from "./src/screens/Home";
import PostScreen from "./src/screens/Post";
import PostSourceScreen from "./src/screens/PostSource";
import CameraScreen from "./src/screens/Camera";
import ImageEditScreen from "./src/screens/ImageEdit";
import GalleryScreen from "./src/screens/Gallery";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="PostSource" component={PostSourceScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="ImageEdit" component={ImageEditScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
