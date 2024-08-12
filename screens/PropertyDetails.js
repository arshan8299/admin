import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
// import parse from 'html-react-parser';
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { axiosInstance } from "../api/axios";
// import { FontAwesome } from '@expo/vector-icons';
import PageContact from "../component/PageContact";
import PhotoModel from "../component/PhotoModel";
import SwiperComponent from "../component/SwiperComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ChildProcess } from "child_process";

const PropertyDetails = ({ navigation, route }) => {
  // const{width,height}=Dimensions.getWindow();
  const { width, height } = Dimensions.get("window");
  const { id } = route.params;
  const [propdata, setPropdata] = useState();
  const [similarProperty, setSimilarProperty] = useState();
  const [featuredProperty, setFeaturedProperty] = useState();
  const [listedByData, setListedByData] = useState(false);
  const [showModel, setShowModel] = useState({ uri: null });
  const [Fav, setFav] = useState(false);
  console.log("fav--->", Fav);

  const scrollRef = useRef();

  const getData = async () => {
    try {
      const res = await axiosInstance.get(`/property/getById/${id}`);
      setPropdata(res.data);

      const data = {
        status: res.data.status,
        location: res.data.location,
        type: res.data.type,
      };
      const resSimilarProperty = await axiosInstance.post(
        "/property/similarProperty",
        { data }
      );
      const featuredPropertyRes = await axiosInstance.get(
        "/property/getFeaturedProperty/1"
      );

      setSimilarProperty(resSimilarProperty.data);
      setFeaturedProperty(featuredPropertyRes.data.data);

      const listedByRes = await axiosInstance.get(
        `/user/contactDetails/${res.data.id}`
      );
      setListedByData(listedByRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const idd = await AsyncStorage.getItem("id");
        setUserId(idd || "");
      } catch (err) {
        console.error("Error fetching user ID:", err.message);
      }
    };
    fetchUserId();
  }, [userId]);

  // console.log("user id ======>", userId);

  // console.log(propdata.overView)
  const cleanDescription = propdata?.overView?.replace(/<\/?[^>]+(>|$)/g, "");
  const [open, setOpen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleNextSlide = () => {
    if (slideNumber == propdata.photoGallery.length - 1) {
      setSlideNumber(0);
    } else {
      setSlideNumber(slideNumber + 1);
    }
  };

  const handlePrevSlide = () => {
    if (slideNumber === 0) {
      setSlideNumber(propdata.photoGallery.length - 1);
    } else {
      setSlideNumber(slideNumber - 1);
    }
  };
  const [wishLoading, setWishLoading] = useState(false);

  const propertyId = id;
  // console.log(auth.result.id);
  const addToFavorite = async () => {
    const userId = await AsyncStorage.getItem("id");

    Alert.alert(
      "Add to Favorites",
      "Are you sure you want to add this item to your favorites?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              setWishLoading(true);
              const res = await axiosInstance.post("user/addTofavorite", {
                userId: userId,
                propertyId: propertyId,
              });
              console.log(res.data)

              if (res.status === 200) {
                // Show a separate confirmation alert after the item is added
                Alert.alert(
                  "Added",
                  "The item has been added to your favorites.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Update state only after confirmation
                      },
                    },
                  ]
                );
              }
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Failed to add the item to your favorites.");
            } finally {
              setFav(true);
              setWishLoading(false);
            }
          },
        },
      ]
    );
  };

  const removeFromFavorite = async () => {
    const userId = await AsyncStorage.getItem("id");

    Alert.alert(
      "Add to Favorites",
      "Are you sure you want to add this item to your favorites?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const res = await axiosInstance.post("user/removeFromFavourite", {
                userId: userId,
                // index: ,
              });

              if (res.status === 200) {
                // Show a separate confirmation alert after the item is added
                Alert.alert(
                  "Added",
                  "The item has been added to your favorites.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Update state only after confirmation
                      },
                    },
                  ]
                );
              }
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Failed to add the item to your favorites.");
            } finally {
              setFav(true);
            }
          },
        },
      ]
    );
  };

  // console.log("property id ======>", id);
  // console.log("User id =====>",userId);

  return propdata === undefined ? (
    <View>
      <ActivityIndicator size={100} color="#246EE9" />
    </View>
  ) : (
    <ScrollView
      ref={scrollRef}
      style={{
        // flex: 1,
        backgroundColor: "#EEEEEE",
      }}
    >
      <View
        style={{
          // flex: 1,
          marginHorizontal: 20,
          marginVertical: 20,
          backgroundColor: "#F3F3F3",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </Pressable>
          <View style={{ flexDirection: "row" }}>
            {/* {!Fav && (
              <Pressable onPress={() => setFav(false)}>
                <FontAwesome name="heart" size={24} color="black" />
              </Pressable>
            )} */}
            {Fav ? (
              <Pressable onPress={() => setFav(false)}>
                <FontAwesome name="heart" size={24} color="red" />
              </Pressable>
            ) : (
              <Pressable onPress={addToFavorite}>
                {wishLoading ? (
                  <View>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <View>
                    <FontAwesome name="heart-o" size={24} color="red" />
                  </View>
                )}
              </Pressable>
            )}
            {/* {Fav && (
              <Pressable onPress={() => setFav(false)}>
                <FontAwesome name="heart" size={24} color="black" />
              </Pressable>
            )} */}
          </View>
        </View>
        <View>
          {open && (
            <View style={{ width: width, height: height, marginTop: "10%" }}>
              <Entypo
                name="circle-with-cross"
                size={30}
                color="black"
                style={{ position: "absolute", right: 30, zIndex: 999 }}
                onPress={() => setOpen(false)}
              />
              {/* <TouchableOpacity> */}
              <AntDesign
                name="rightcircle"
                size={40}
                color="black"
                onPress={handleNextSlide}
                style={{
                  position: "absolute",
                  top: "30%",
                  right: 30,
                  zIndex: 999,
                }}
              />
              {/* </TouchableOpacity> */}

              <AntDesign
                name="leftcircle"
                size={40}
                color="black"
                onPress={handlePrevSlide}
                style={{
                  position: "absolute",
                  top: "30%",
                  left: 0,
                  zIndex: 999,
                }}
              />
              <Image
                source={{ uri: propdata.photoGallery[slideNumber].url }}
                style={{
                  width: 380,
                  height: 600,
                  borderRadius: 10,
                  marginTop: 30,
                }}
              />
            </View>
          )}
        </View>

        {/* photoGallery */}
        {open == false && (
          <View style={{ marginTop: 30 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: 300 }}
            >
              {propdata.photoGallery.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  // onPress={() => setShowModel({ uri: item.url })}
                  onPress={() => handleOpen(i)}
                >
                  <Image
                    key={i}
                    source={{ uri: item.url }}
                    style={{
                      width: 260,
                      height: 350,
                      borderRadius: 10,
                      marginTop: 3,
                      marginRight: 3,
                      marginLeft: 3,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <PhotoModel showModel={showModel} setShowModel={setShowModel} />
          </View>
        )}

        {/* details like price and etc */}
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              marginLeft: 5,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: propdata.photoGallery[0].url }}
              style={{ width: 70, height: 50, borderRadius: 10 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#246EE9",
                paddingBottom: 5,
                width: 300,
              }}
            >
              {/* <FontAwesome name="rupee" size={16} color="black" />{" "} */}
              {/* {propdata.details.price} */}
              {propdata.name}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {propdata.details.baths}, 3, 4,5 BHK {propdata.type}{" "}
              {propdata.keyDetails.builtIn} persq.ft.
            </Text>
          </View>
        </View>

        {/* listed by */}
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 10, fontWeight: "400" }}>
            {/* {propdata.name} */}
          </Text>
          {listedByData ? (
            <View style={{ flexDirection: "row", gap: 15 }}>
              {/* <Text style={{ fontSize: 13, width:90 }}>
                Listed by : {listedByData.name}
              </Text> */}
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <FontAwesome5 name="user-check" size={20} color="#246EE9" />
                  <Text style={{ fontWeight: 600, fontSize: 17 }}>
                    Listed By:
                  </Text>
                </View>
                <Text style={{ textAlign: "center" }}>{listedByData.name}</Text>
              </View>

              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <MaterialCommunityIcons
                    name="email-check"
                    size={20}
                    color="#246EE9"
                  />
                  <Text style={{ fontWeight: 600, fontSize: 17 }}>Email:</Text>
                </View>
                <Text>{listedByData.email}</Text>
              </View>

              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <FontAwesome5
                    name="phone-square-alt"
                    size={20}
                    color="#246EE9"
                  />
                  <Text style={{ fontWeight: 600, fontSize: 17 }}>Phone:</Text>
                </View>
                <Text>{listedByData.phoneNo}</Text>
              </View>

              {/* <Text style={{ fontSize: 8, fontSize: 13, width:90  }}>Email: {listedByData.email}</Text>
              <Text style={{ fontSize: 8 , fontSize: 13, width:90 }}>Phone: {listedByData.phoneNo}</Text> */}
            </View>
          ) : (
            <View>
              <ActivityIndicator size={100} color="#246EE9" />
            </View>
          )}
        </View>

        {/* location */}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <View style={{ maxWidth: 200 }}>
            <Text style={{ fontSize: 10 }}>{propdata.location}</Text>
          </View> */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo
              name="location"
              size={25}
              color="#246EE9"
              style={{ paddingRight: 5 }}
            />
            <Text style={{ fontWeight: 600, fontSize: 17 }}>Location :</Text>
            <Text style={{ fontSize: 17 }}>{propdata.location}</Text>
          </View>
        </View>

        {/* keyDetails */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            marginTop: 40,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#246EE9",
              textAlign: "center",
            }}
          >
            Key Details
          </Text>
          <View style={{ marginTop: 5 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <View style={{ alignItems: "center", width: 70 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>STATUS</Text>
                <Text style={{ fontSize: 14 }}>{propdata.status}</Text>
              </View>

              <View style={{ alignItems: "center", width: 100 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>BUILD</Text>
                <Text style={{ fontSize: 14 }}>
                  {propdata.keyDetails.builtIn}
                </Text>
              </View>

              <View style={{ alignItems: "center", width: 150 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  ROOM COUNT
                </Text>
                <Text style={{ fontSize: 14 }}>
                  {propdata.keyDetails.roomCount}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <View style={{ alignItems: "center", width: 70 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>TYPE</Text>
                <Text style={{ fontSize: 11 }}>{propdata.type}</Text>
              </View>

              <View style={{ alignItems: "center", width: 100 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  STORIES
                </Text>
                <Text style={{ fontSize: 13 }}>
                  {propdata.keyDetails.stories}
                </Text>
              </View>

              <View style={{ alignItems: "center", width: 150 }}>
                <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                  PARKING SPACE
                </Text>
                <Text style={{ fontSize: 13 }}>
                  {propdata.keyDetails.parkingSpaces}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Overview */}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#246EE9",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Overview
          </Text>
          <Text style={{ fontSize: 13, marginVertical: 5 }}>
            {/* {propdata.overView} */}
            {cleanDescription}
          </Text>
        </View>

        {/* 360view */}
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#246EE9",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            360 View
          </Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {propdata.wideImage.length > 0 ? (
              <Image
                source={{ uri: propdata.wideImage[0].url }}
                style={{ width: 150, height: 150 }}
              />
            ) : (
              <Text>N/A</Text>
            )}
          </View>
        </View>

        {/* Amenities */}
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#246EE9",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Amenities
          </Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.entries(propdata.amenities).map(([key, value]) =>
                value === "true" ? (
                  <View
                    key={key}
                    style={{
                      marginBottom: 5,
                      marginTop: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingRight: 10,
                      gap: 5,
                    }}
                  >
                    <FontAwesome name="dot-circle-o" size={24} color="black" />
                    <Text style={{ fontSize: 15 }}>{key.toUpperCase()}</Text>
                  </View>
                ) : null
              )}
            </ScrollView>
          </View>
        </View>

        {/* floorPlan */}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#246EE9",
              marginTop: 40,
              textAlign: "center",
            }}
          >
            Floor Plan
          </Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {propdata.floorPlan.length > 0 ? (
              <TouchableOpacity
                onPress={() =>
                  setShowModel({ uri: propdata.floorPlan[0].url, index: null })
                }
              >
                <Image
                  source={{ uri: propdata.floorPlan[0].url }}
                  style={{ width: 150, height: 150 }}
                />
              </TouchableOpacity>
            ) : (
              <Text>N/A</Text>
            )}
          </View>
        </View>

        {/* Contact Now */}
        <View style={{ marginTop: 20 }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#246EE9",
                marginTop: 40,
                textAlign: "center",
              }}
            >
              Contact Now
            </Text>
          </View>
          <View style={{ marginBottom: 40, marginTop: 10 }}>
            <PageContact />
          </View>
        </View>

        {/* Similar property */}
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 14, fontWeight: "700" }}>
            Similar Property
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ maxHeight: 250 }}
          >
            {similarProperty ? (
              <SwiperComponent
                propdata={similarProperty}
                navigation={navigation}
                scrollRef={scrollRef}
              />
            ) : (
              <Text>Loading</Text>
            )}
            {featuredProperty ? (
              <SwiperComponent
                propdata={featuredProperty}
                navigation={navigation}
                scrollRef={scrollRef}
              />
            ) : (
              <Text>Loading</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({});
