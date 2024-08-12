import {
  StyleSheet,
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

const ContactUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`user/contactUsGet/${page}`);
      setTotalPage(res.data.meta.lastPage);
      if (res.status == 200) {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  console.log("total page are ==>", totalPage);

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
                fontWeight: 600,
                marginLeft: "20%",
                color:"#246EE9"
              }}
            >
              Users Contact
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
                  color:"#246EE9"
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: 600,
                  paddingTop: 10,
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
                  fontWeight: 600,
                  paddingTop: 10,
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
                  fontWeight: 600,
                  paddingTop: 10,
                  borderWidth: 1,
                  textAlign: "center",
                  color:"#246EE9"
                }}
              >
                Subject
              </Text>
              {/* <Text style={{fontSize:18, width:100,fontWeight:600,paddingTop:10, borderWidth:1 , textAlign:'center'}}>Parent</Text> */}
              <Text
                style={{
                  fontSize: 18,
                  width: 100,
                  fontWeight: 600,
                  paddingTop: 10,
                  borderWidth: 1,
                  color:"#246EE9",
                  textAlign: "center",
                }}
              >
                On Property
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
                      alignItems: "center",
                      height: 50,
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
                      paddingTop: 10,
                      height: 50,
                      alignItems: "center",
                      height: 50,
                    }}
                  >
                    {item.email ? "" : "N/A"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingTop: 10,
                      height: 50,
                      alignItems: "center",
                      height: 50,
                    }}
                  >
                    {item.phoneNo}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingTop: 10,
                      height: 50,
                      alignItems: "center",
                      height: 50,
                    }}
                  >
                    {item.subject}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 100,
                      borderWidth: 1,
                      textAlign: "center",
                      paddingTop: 10,
                      height: 50,
                      alignItems: "center",
                      height: 50,
                    }}
                  >
                    {item.property ? "" : "N/A"}
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

export default ContactUsers;
