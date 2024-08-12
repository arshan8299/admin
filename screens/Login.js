import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomDrawerContent from "../component/CustomDrawerContent";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { axiosInstance } from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const Logo = require("../../../wire wings web/SqrftLife-Website/client/public/assets/cropped-12.png");
import logo from "../assets/images/cropped-12.png";
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [persist, setPersist] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  const loginUser = async (data) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/staff-auth/login", {
        email: data.Email,
        password: data.Password,
      });

      if (res.status === 200) {
        // await AsyncStorage.clear();
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        // await AsyncStorage.setItem("name", res.data.result.name);
        await AsyncStorage.setItem('id', res.data.result.id.toString());
        await AsyncStorage.setItem("refreshToken", res.data.result.details.refreshToken);

        setLoading(false);

        setTimeout(() => {
          navigation.navigate("Drawer");
        }, 1000);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error.response ? error.response.data : error.message);
      Alert.alert(
        "Unable to Login",
        error.response?.data?.message || "Something went wrong.",
        [{ text: "Close", cancelable: true }]
      );
    }
  };

  const togglePersist = () => {
    setPersist(!persist);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, marginVertical: 10 }}>
          <CustomDrawerContent color="black" paddingLeft={40} pt={60} />
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={{ width: 220, height: 82 }}>
              <Image source={logo} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Welcome Back, Admin</Text>
          </View>
          <View style={{ paddingHorizontal: 60 }}>
            <Text style={{ color: "#455F8A", fontSize: 12 }}>Email</Text>
            <Controller
              rules={{
                required: "Email is required",
                pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
              }}
              control={control}
              name="Email"
              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={{
                      borderWidth: 2,
                      borderColor: error ? "red" : "#91B7F4",
                      borderRadius: 4,
                      width: "100%",
                      height: 40,
                      marginTop: 7,
                      padding: 10,
                    }}
                  />
                  {error && <Text style={{ color: "red", marginTop: 5 }}>{error.message}</Text>}
                </>
              )}
            />
          </View>
          <View style={{ paddingHorizontal: 60, marginTop: 20 }}>
            <Text style={{ color: "#455F8A", fontSize: 12 }}>Password</Text>
            <Controller
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Password should be at least 6 characters" },
              }}
              control={control}
              name="Password"
              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      secureTextEntry={!showPassword}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={{
                        borderWidth: 2,
                        borderRightWidth: 0,
                        borderColor: error ? "red" : "#91B7F4",
                        borderRadius: 4,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        width: 270,
                        height: 40,
                        marginTop: 7,
                        padding: 10,
                      }}
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      style={{
                        borderWidth: 2,
                        height: 40,
                        marginTop: 7,
                        padding: 8,
                        borderLeftWidth: 0,
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                        borderColor: error ? "red" : "#91B7F4",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign name="eye" size={24} color={error ? "red" : "#91B7F4"} />
                    </Pressable>
                  </View>
                  {error && <Text style={{ color: "red", marginTop: 5 }}>{error.message}</Text>}
                </>
              )}
            />
          </View>
          <View style={{ padding: 30, paddingTop: 0, flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              value={persist}
              onValueChange={togglePersist}
              color={persist ? "#246EE9" : undefined}
              style={{ marginLeft: 30, marginTop: 20 }}
            />
            <Text style={{ marginLeft: 10, marginTop: 20 }}>Remember me</Text>
          </View>
          <Pressable
            onPress={handleSubmit(loginUser)}
            disabled={loading}
            style={{
              backgroundColor: "#DBE2EF",
              width: 311,
              height: 58,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: "#246EE9", fontWeight: "bold" }}>
              {loading ? <ActivityIndicator size="small" color="#246EE9" /> : "Login"}
            </Text>
          </Pressable>
          {/* <Text style={{ alignSelf: "center", color: "#246EE9", marginTop: 20 }}>Forgot Password</Text> */}
          <Text style={{ color: "black", marginTop: 10, alignSelf: "center" }}>
            New to Sqft Life? &nbsp;
            <Pressable onPress={() => navigation.navigate("RegisterStack")}>
              <Text style={{ color: "#246EE9", marginBottom: -4 }}>
                Create an account
              </Text>
            </Pressable>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;


