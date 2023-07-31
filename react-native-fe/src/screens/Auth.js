import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import { StackActions } from "@react-navigation/native";

import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

import constants from "../constants";

const AuthScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [googleRequest, googleResponse, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "28367660683-g5ht07590b16p70tsp1hgqbb60lnqqbj.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    const getUserData = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) navigation.navigate("Home");
      else setIsLoading(false);
    };

    getUserData();
  }, []);

  React.useEffect(() => {
    signInWithGoogle();
  }, [googleResponse]);

  const signInWithGoogle = async () => {
    try {
      if (googleResponse?.type === "success") {
        setIsLoading(true);

        const token = googleResponse?.authentication?.accessToken;

        const url = constants.serverUrl + "/authentication/login";

        const options = {
          method: "POST",
          body: JSON.stringify({
            accessToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(url, options);
        const userData = await response.json();

        if (response.status == 200) {
          await AsyncStorage.setItem("user", JSON.stringify(userData.user));
          await AsyncStorage.setItem("token", userData.token);
          navigation.dispatch(StackActions.replace("Home"));
        } else {
          ToastAndroid.show(userData.msg, ToastAndroid.SHORT);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4285F4" />
      ) : (
        <View style={styles.loginScreen}>
          <Image
            source={require("../../assets/logo/highon.png")}
            style={styles.logo}
          />
          <TouchableOpacity
            onPress={() => promptAsync()}
            style={styles.googleButton}
          >
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <Text style={styles.agreementText}>
            By signing in, you agree to our{"\n"}privacy policy and terms of
            service.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  loginScreen: {
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    top: -50,
  },
  googleButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  agreementText: {
    color: "#333333",
    fontSize: 12,
    textAlign: "center",
  },
});

export default AuthScreen;
