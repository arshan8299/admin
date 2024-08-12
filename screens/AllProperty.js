import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import SwiperComponentWrap from "../component/SwiperComponentWrap";
import { axiosInstance } from "../api/axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomDrawerContent from "../component/CustomDrawerContent";

const AllProperty = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("property/getAllSearch");
        console.log("all properties data", res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginTop: 20 }}>
          {/* <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          /> */}
          <CustomDrawerContent
          color="black"/>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* {loading ? <ActivityIndicator size="small" color="#246EE9" /> : data.length} */}
            All Properties [{data.length}]
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
            paddingLeft: 13,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#246EE9" style={{margin:'auto'}} />
          ) : (
            <SwiperComponentWrap propdata={data} navigation={navigation} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllProperty;

