import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomDrawerContent from "../component/CustomDrawerContent";
import { axiosInstance } from "../api/axios";
import { useIsFocused } from "@react-navigation/native";

const StaffReport = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`staff/getAll/${page}`);
      if (res.status === 200) {
        setData(res.data.data);
        setTotalPage(res.data.meta.lastPage);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [page, isFocused]);

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };
  console.log("staff Data ===>", data);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <CustomDrawerContent color="Black" paddingLeft={10} />
            <Text
              style={{
                fontSize: 25,
                flex: 1,
                fontWeight: 700,
                marginLeft: "20%",
                color: "#246EE9",
              }}
            >
              Staff Report
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: 600,
                  paddingTop: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  height: 50,
                  color: "#246EE9",
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 150,
                  fontWeight: 600,
                  paddingTop: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  height: 50,
                  color: "#246EE9",
                }}
              >
                Email
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 150,
                  fontWeight: 600,
                  paddingTop: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  height: 50,
                  color: "#246EE9",
                }}
              >
                Phone
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: 600,
                  paddingTop: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  height: 50,
                  color: "#246EE9",
                }}
              >
                Role
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: 600,
                  paddingTop: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  height: 50,
                  color: "#246EE9",
                }}
              >
                Parent
              </Text>
            </View>

            {loading ? (
              <ActivityIndicator size="small" color="#246EE9" />
            ) : (
              data.map((item, index) => (
                <View
                  style={{ flexDirection: "row", paddingHorizontal: 20 }}
                  key={index}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingTop: 10,
                      height: 50,
                    }}
                  >
                    {item.details.name ? item.details.name : "N/A"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 150,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingTop: 10,
                      height: 50,
                    }}
                  >
                    {item.details.email}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 150,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingTop: 10,
                      height: 50,
                    }}
                  >
                    {item.details.phoneNo ? item.details.phoneNo : "N/A"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingTop: 10,
                      height: 50,
                    }}
                  >
                    {item.Role}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingTop: 10,
                      height: 50,
                    }}
                  >
                    {item.parent}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={handlePrev}
          style={({ pressed }) => [
            {
              marginHorizontal: 10,
              opacity: page === 1 ? 0.5 : 1,
            },
          ]}
          disabled={page === 1}
        >
          <Text style={{ fontSize: 20, borderWidth: 1, paddingHorizontal: 10 }}>
            Prev
          </Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          style={({ pressed }) => [
            {
              marginHorizontal: 10,
              opacity: page === totalPage ? 0.5 : pressed ? 0.7 : 1,
            },
          ]}
          disabled={page === totalPage}
        >
          <Text style={{ fontSize: 20, borderWidth: 1, paddingHorizontal: 10 }}>
            Next
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default StaffReport;
