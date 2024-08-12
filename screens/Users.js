import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomDrawerContent from "../component/CustomDrawerContent";
import { axiosInstance } from "../api/axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";

const Users = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const isFocused = useIsFocused();

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, [page]);

  useEffect(() => {
    if(isFocused)
    {
      fetchData();
    }
  }, [isFocused]);


  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/user/getAll/${page}`);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <CustomDrawerContent color="black" paddingLeft={10} />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "600",
                  marginLeft:'20%',
                  flex: 1,
                  color:"#246EE9"
                }}
              >
                Users Details
              </Text>
            </View>

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
                  fontWeight: "600",
                  paddingVertical: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  color:"#246EE9"
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: "600",
                  paddingVertical: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  color:"#246EE9"
                }}
              >
                Email
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: "600",
                  paddingVertical: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  color:"#246EE9"
                }}
              >
                Phone
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: "600",
                  paddingVertical: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  color:"#246EE9"
                }}
              >
                Active
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 110,
                  fontWeight: "600",
                  paddingVertical: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  color:"#246EE9"
                }}
              >
                Have Subscription
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: "600",
                  paddingVertical: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  color:"#246EE9"
                }}
              >
                Action
              </Text>
            </View>

            {loading ? (
              <ActivityIndicator size="small" color="#246EE9" />
            ) : (
              data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingVertical: 10,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingVertical: 10,
                    }}
                  >
                    {item.details.Email ? item.details.Email : "N/A"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingVertical: 10,
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
                      paddingVertical: 10,
                    }}
                  >
                    {item.active ? "True" : "False"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 110,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingVertical: 10,
                    }}
                  >
                    {item.haveSubscription ? "True" : "False"}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 50,
                      gap: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      borderWidth: 1,
                    }}
                  >
                    <AntDesign
                      name="edit"
                      size={24}
                      color="black"
                      onPress={() => {
                        setEdit(true);
                        navigation.navigate("EditUser", { id: item.id });
                      }}
                      
                    />
                    {/* <AntDesign name="delete" size={24} color="black" /> */}
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Pressable onPress={handlePrev}  style={({ pressed }) => [
            {
              marginHorizontal: 10,
              opacity: page === 1 ? 0.5 :  1,
            },
          ]}
          disabled={page === 1}>
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

export default Users;
