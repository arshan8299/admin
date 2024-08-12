import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { launchImageLibrary } from 'react-native-image-picker';
import CustomDrawerContent from "../component/CustomDrawerContent";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";

import { axiosInstance } from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListingPage = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [images, setImages] = useState([]);
 
  useEffect(() => {
    const fetchId = async () => {
      const userId = await AsyncStorage.getItem("id");
      setUserId(userId);
    };
    fetchId();
  }, []);

  const [description, setDescription] = useState("");
  const [isPoolChecked, setIsPoolChecked] = useState(false);
  const [isGarageChecked, setIsGarageChecked] = useState(false);
  const [isBalconyChecked, setIsBalconyChecked] = useState(false);
  const [isDisposalChecked, setIsDisposalChecked] = useState(false);
  const [isElevatorChecked, setIsElevatorChecked] = useState(false);
  const [isInternetChecked, setIsInternetChecked] = useState(false);
  const [isFirePlaceChecked, setIsFirePlaceChecked] = useState(false);
  const [isDishwasherChecked, setIsDishwasherChecked] = useState(false);
  const [isAirconditioningChecked, setIsAirconditioningChecked] = useState(false);

  const [photoGallery, setPhotoGallery] = useState(null);
  const [floorPlans, setFloorPlans] = useState(null);
  const [wideImage, setWideImage] = useState(null);
  const [BannerImage, setBannerImage] = useState(null);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [items, setItems] = useState([
    { label: "Apartment", value: "Apartment" },
    { label: "Farm House", value: "Farm House" },
    { label: "Villa", value: "Villa" },
    { label: "Land", value: "Land" },
    { label: "Commercial Properties", value: "Commercial Properties" },
    { label: "Shops", value: "Shops" },
    { label: "Pg", value: "Pg" },
    { label: "Flats", value: "Flats" },
  ]);

  const [open2, setOpen2] = useState(false);
  const [status, setStatus] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Rent", value: "Rent" },
    { label: "Sale", value: "Sale" },
  ]);

  const [hoa, setHoa] = useState("");
  const [beds, setBeds] = useState("");
  const [bath, setBath] = useState("");
  const [price, setPrice] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [propertytax, setPropertytax] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");
  const [location, setLocation] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  
  const [keyDetails, setKeyDetails] = useState({
    builtIn: "",
    lotWidth: "",
    lotDepth: "",
    stories: "",
    roomCount: "",
    parkingSpaces: "",
  });



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: "row" }}>
           <CustomDrawerContent/>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 25,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Add a New Property
            </Text>
          </View>
          <Text style={{ textAlign: "center" }}>
            We are glad to see you again
          </Text>

          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Create Listing
            </Text>

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              Property Title
            </Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              value={propertyTitle}
              onChangeText={(text) => setPropertyTitle(text)}
              placeholder="Property Title"
            />

            <View style={{ zIndex: 1000, marginTop: 20 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Type:</Text>
              <DropDownPicker
                open={open}
                value={type}
                items={items}
                setOpen={setOpen}
                setValue={setType}
                setItems={setItems}
                placeholder="Property Type"
                containerStyle={{ width: "100%" }}
                style={{ backgroundColor: "#fafafa", zIndex: 999 }}
                dropDownContainerStyle={{ backgroundColor: "#fafafa" }}
              />
            </View>

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              Status:
            </Text>
            <DropDownPicker
              open={open2}
              value={status}
              items={items2}
              setOpen={setOpen2}
              setValue={setStatus}
              setItems={setItems2}
              placeholder="Status"
              containerStyle={{ width: "100%" }}
              style={{ backgroundColor: "#fafafa" }}
              dropDownContainerStyle={{ backgroundColor: "#fafafa" }}
            />

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>
                Description:
              </Text>
              <TextInput
                style={{
                  height: 100,
                  borderColor: "gray",
                  borderWidth: 1,
                  padding: 10,
                  textAlignVertical: "top",
                }}
                multiline
                numberOfLines={4}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter your description here"
              />
            </View>

            <View>
              <Text style={{ marginTop: 30, fontSize: 20, fontWeight: "600" }}>
                Location
              </Text>
              <Text style={{ marginTop: 10, fontSize: 18, marginBottom: 5 }}>
                location
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={location}
                onChange={(text) => setLocation(text)}
                placeholder="Enter location"
              />

              <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
                Zip Code
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={zipCode}
                onChangeText={(text) => setZipCode(text)}
                placeholder="Enter zip code"
              />

              <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
                Latitude
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={latitude}
                onChangeText={(text) => setLatitude(text)}
                placeholder="Enter latitude"
              />

              <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
                Longitude
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={longitude}
                onChangeText={(text) => setLongitude(text)}
                placeholder="Enter longitude"
              />
            </View>

            <View>
              <Text style={{ marginTop: 30, fontSize: 20, fontWeight: "600" }}>
                Detail Information
              </Text>
              <Text style={{ marginTop: 10, fontSize: 18, marginBottom: 5 }}>
                HOA
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={hoa}
                onChange={(text) => setHoa(text)}
                placeholder="Enter location"
              />

              <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
                Beds
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={beds}
                onChangeText={(text) => setBeds(text)}
                placeholder="Enter zip code"
              />

              <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
                Bath
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={bath}
                onChangeText={(text) => setBath(text)}
                placeholder="Enter latitude"
              />

              <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
                Price
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={price}
                onChangeText={(text) => setPrice(text)}
                placeholder="Enter longitude"
              />

              <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
                Price Label (e.g. "per month")
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={priceLabel}
                onChangeText={(text) => setPriceLabel(text)}
                placeholder="Enter longitude"
              />

              <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
                Property Tax
              </Text>
              <TextInput
                style={{
                  padding: 15,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 10,
                }}
                value={propertytax}
                onChangeText={(text) => setPropertytax(text)}
                placeholder="Enter longitude"
              />
            </View>

            <Text style={{ fontSize: 20, marginTop: 30, fontWeight: "600" }}>
              Key Detail
            </Text>

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              Built In
            </Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              placeholder="Enter built-in details"
              onChangeText={(text) =>
                setKeyDetails({ ...keyDetails, builtIn: text })
              }
            />

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              Stories
            </Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              placeholder="Enter number of stories"
              onChangeText={(text) =>
                setKeyDetails({ ...keyDetails, stories: text })
              }
            />

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              IOT Depth
            </Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              placeholder="Enter IOT depth"
              onChangeText={(text) => ({ ...keyDetails, IotDepth: text })}
            />

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              IOT Width
            </Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              placeholder="Enter IOT width"
              onChangeText={(text) => ({ ...keyDetails, IotWidth: text })}
            />

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              Room Count
            </Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              placeholder="Enter number of rooms"
              onChangeText={(text) =>
                setKeyDetails({ ...keyDetails, roomCount: text })
              }
            />

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              Parking Space
            </Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              placeholder="Enter parking space"
              onChangeText={(text) =>
                setKeyDetails({ ...keyDetails, parkingSpaces: text })
              }
            />

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>
              Amenities
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 140 }}>
                <CheckBox
                  title="Pool"
                  checked={isPoolChecked}
                  onPress={() => setIsPoolChecked(!isPoolChecked)}
                />
              </View>
              <View style={{ width: 140 }}>
                <CheckBox
                  title="Garage"
                  checked={isGarageChecked}
                  onPress={() => setIsGarageChecked(!isGarageChecked)}
                />
              </View>

              <View style={{ width: 170 }}>
                <CheckBox
                  title="Balcony"
                  checked={isBalconyChecked}
                  onPress={() => setIsBalconyChecked(!isBalconyChecked)}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 140 }}>
                <CheckBox
                  title="Disposal"
                  checked={isDisposalChecked}
                  onPress={() => setIsDisposalChecked(!isDisposalChecked)}
                />
              </View>
              <View style={{ width: 140 }}>
                <CheckBox
                  title="Elevator"
                  checked={isElevatorChecked}
                  onPress={() => setIsElevatorChecked(!isElevatorChecked)}
                />
              </View>

              <View style={{ width: 170 }}>
                <CheckBox
                  title="Internet"
                  checked={isInternetChecked}
                  onPress={() => setIsInternetChecked(!isInternetChecked)}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 140 }}>
                <CheckBox
                  title="Fireplace"
                  checked={isFirePlaceChecked}
                  onPress={() => setIsFirePlaceChecked(!isFirePlaceChecked)}
                />
              </View>

              <View style={{ width: 140 }}>
                <CheckBox
                  title="Dishwasher"
                  checked={isDishwasherChecked}
                  onPress={() => setIsDishwasherChecked(!isDishwasherChecked)}
                />
              </View>

              <View style={{ width: 170 }}>
                <CheckBox
                  title="Air Conditioning"
                  checked={isAirconditioningChecked}
                  onPress={() =>
                    setIsAirconditioningChecked(!isAirconditioningChecked)
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 20,
                marginTop: 20,
              }}
            >
              <Pressable >
                <Text
                  style={{ fontSize: 18, textAlign: "center", marginBottom: 5 }}
                >
                  Floor Plan
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    padding: 20,
                    width: 150,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    margin: "auto",
                  }}
                >
                  <Entypo name="upload" size={24} color="#246EE9" />
                  <Text style={{ textAlign: "center" }}>Select image</Text>
                </View>
                {/* {photoGallery && <Text style={{ fontSize: 16, color: "green", marginTop: 10 }}>Uploaded</Text>} */}
              </Pressable>

              <Pressable
            //    onPress={selectImages}
               >
                <Text
                  style={{ fontSize: 18, textAlign: "center", marginBottom: 5 }}
                >
                  Photo Gallery
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    padding: 20,
                    width: 150,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    margin: "auto",
                  }}
                >
                  <Entypo name="upload" size={24} color="#246EE9" />
                  <Text style={{ textAlign: "center" }}>Select image</Text>
                </View>
              </Pressable>

              <Pressable >
                <Text
                  style={{ fontSize: 18, textAlign: "center", marginBottom: 5 }}
                >
                  Upload Banner
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    padding: 20,
                    width: 150,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    margin: "auto",
                  }}
                >
                  <Entypo name="upload" size={24} color="#246EE9" />
                  <Text style={{ textAlign: "center" }}>Select image</Text>
                </View>
              </Pressable>

              <Pressable >
                <Text
                  style={{ fontSize: 18, textAlign: "center", marginBottom: 5 }}
                >
                  Upload 360 Image
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    padding: 20,
                    width: 150,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    margin: "auto",
                  }}
                >
                  <Entypo name="upload" size={24} color="#246EE9" />
                  <Text style={{ textAlign: "center" }}>Select image</Text>
                </View>
              </Pressable>
            </View>

            <Pressable
              style={{
                padding: 10,
                marginTop: 40,
                backgroundColor: "#246EE9",
                borderRadius: 10,
              }}
              
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingPage;
