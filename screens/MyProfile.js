import { View, Text, SafeAreaView, TextInput, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import CustomDrawerContent from "../component/CustomDrawerContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../api/axios";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [id, setId] = useState(null);
  const [data, setData] = useState("");
  const[loading,setLoading]=useState(false);

  useEffect(() => {
    const fetchId = async () => {
      const res = await AsyncStorage.getItem("id");
      if (res) {
        setId(res);
      }
    };
    fetchId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await axiosInstance.get(`staff/getById/${id}`);
          if (res.status === 200) {
            setData(res.data);
            setName(res.data.details.name);
            setEmail(res.data.details.email);
            setPhone(res.data.details.phoneNo);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const detail = {
    id, // Include id in the detail object
    details: {
      name,
      email,
      phoneNo,
    },
    role: data.Role, // Assuming the role is fetched and available in data
    parent: data.parent, // Assuming the parent is fetched and available in data
    zipCodeAssign: data.zipCodeAssign, // Assuming zipCodeAssign is fetched and available in data
  };

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const update = await axiosInstance.put('/staff/update/', detail);
      if (update.status === 200) {
        alert("User updated successfully");
      } else {
        alert("Error in updation");
      }
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomDrawerContent color="Black" paddingLeft={10} />
          <Text style={{ fontSize: 25, fontWeight: "600", paddingLeft: "10%", marginTop: 10, color:"#246EE9", marginLeft:'10%' }}>
            Edit Staff Profile
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Name</Text>
          <TextInput
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
            }}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter Name"
          />

          <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>E-Mail</Text>
          <TextInput
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter E-Mail"
          />

          <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Phone</Text>
          <TextInput
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
            }}
            value={phoneNo}
            onChangeText={(text) => setPhone(text)}
            placeholder="Enter Phone"
          />
        </View>

        <Pressable
          style={{
            marginHorizontal: 20,
            padding: 10,
            marginTop: 40,
            backgroundColor: "#246EE9",
            borderRadius: 10,
          }}
          onPress={() => handleUpdate()}
        >
         {
          loading?(<ActivityIndicator color="white"/>):( <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              color: "white",
              fontWeight: "600",
            }}
          >
            Submit
          </Text>)
         }
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;
