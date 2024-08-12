import axiosInstance from '../api/axios';
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PageContact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const handelForm = async () => {
    try {
      const res = await axiosInstance.post(`user/contactUs`, {
        name,
        email,
        phoneNo: phone,
        subject: " ",
        comment: msg,
      });
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#246EE9",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Leave a Reply
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "47%" }}>
            <Text style={{ color: "#455F8A", fontSize: 10 }}>Name</Text>
            <TextInput
              onChangeText={(e) => setName(e)}
              style={{
                borderWidth: 2,
                borderColor: "#91B7F4",
                borderRadius: 4,
                width: "100%",
                height: 40,
                marginTop: 7,
                padding: 10,
              }}
            />
          </View>

          <View style={{ width: "47%" }}>
            <Text style={{ color: "#455F8A", fontSize: 10 }}>Phone</Text>
            <TextInput
              onChangeText={(e) => setPhone(e)}
              inputMode="numeric"
              style={{
                borderWidth: 2,
                borderColor: "#91B7F4",
                borderRadius: 4,
                width: "100%",
                height: 40,
                marginTop: 7,
                padding: 10,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={{ width: "47%" }}>
            <Text style={{ color: "#455F8A", fontSize: 10 }}>Email</Text>
            <TextInput
              onChangeText={(e) => setEmail(e)}
              style={{
                borderWidth: 2,
                borderColor: "#91B7F4",
                borderRadius: 4,
                width: "100%",
                height: 40,
                marginTop: 7,
                padding: 10,
              }}
            />
          </View>

          <View style={{ width: "47%" }}>
            <Text style={{ color: "#455F8A", fontSize: 10 }}>Message</Text>
            <TextInput
              onChangeText={(e) => setMsg(e)}
              inputMode="text"
              style={{
                borderWidth: 2,
                borderColor: "#91B7F4",
                borderRadius: 4,
                width: "100%",
                height: 40,
                marginTop: 7,
                padding: 10,
              }}
            />
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Pressable
          onPress={() => handelForm()}
          style={{
            backgroundColor: "#DBE2EF",
            width: "100%",
            height: 50,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 18, color: "#246EE9", fontWeight: "bold" }}>
            Send Message
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PageContact;
