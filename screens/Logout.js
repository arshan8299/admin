import { View, Text, SafeAreaView, Image, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Logo from "../assets/images/cropped-12.png";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomDrawerContent from "../component/CustomDrawerContent";


const Logout = ({navigation}) => {
  const [userName, setUserName] = useState('');

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              console.log('AsyncStorage cleared successfully');
              navigation.navigate("Login");
            } catch (error) {
              console.error('Error clearing AsyncStorage:', error);
            }
          }
        }
      ]
    );
  };


  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        setUserName(name || ''); // Ensure we set an empty string if name is null
      } catch (err) {
        console.error('Error fetching user name:', err.message);
      }
    };

    fetchUserName();

    const interval = setInterval(fetchUserName, 3000); // Set the interval to 3 seconds for regular updates

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView>
      <View>
        <CustomDrawerContent color="black" paddingLeft={40} pt={1} />
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: 220, height: 82, marginTop: 30 }}>
            <Image
              source={Logo}
              style={{ height: "100%", width: "100%" }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={{ margin: 'auto', marginTop: 20 }}>
          <FontAwesome name="user-circle-o" size={100} color="#246EE9" />
        </View>
        <Text style={{ textAlign: 'center', paddingTop: 10, fontWeight: '700', fontSize: 25 }}>
          {userName}
        </Text>
      </View>
      <Pressable onPress={handleLogout}>
        <View style={{ flexDirection: 'row', borderWidth: 2, borderColor: '#246EE9', width: '70%', padding: 20, borderRadius: 50, alignItems: 'center', gap: 10, justifyContent: 'center', margin: 'auto', marginTop: 130 }}>
          <Text style={{ fontSize: 20 }}>Logout</Text>
          <MaterialCommunityIcons name="logout" size={35} color="black" />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Logout;
