import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

const SwiperComponentWrap = ({ propdata, navigation, scrollRef }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {propdata.map((data, index) => (
        <Pressable
          key={index}
          onPress={() => {
            navigation.navigate("PropertyDetailStack", { id: data.id });
            if (scrollRef !== undefined) {
              scrollRef.current?.scrollTo({
                y: 0,
                animated: true, // x: index * width,
              });
            }
          }}
        >
          <View
            style={{
              marginRight: 15,
              marginVertical: 10,
              backgroundColor: "#FEFEFE",
              borderRadius: 5,
              height: 200,
              width: 185,
              shadowColor: "#246EE9",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Image
              source={{ uri: data.photoGallery[0].url }}
              alt={data.photoGallery[0].name}
              style={{
                width: 185,
                height: "60%",
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
              }}
            />
            <View style={{ marginLeft: 5 }}>
              <Text
                style={{
                  fontSize: 12,
                  width: 180,
                  overflow: 'hidden',
                  paddingTop: 5,
                }}
                numberOfLines={1}
              >
                {data.name}
              </Text>
              <Text
                style={{ color: "#939292", fontSize: 12, paddingVertical: 5 }}
              >
                {data.location}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "700" }}>
                <FontAwesome name="rupee" size={12} color="black" />
                {data.details.price}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default SwiperComponentWrap;
