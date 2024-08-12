import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, View,Dimensions } from "react-native";


function PhotoModel({ showModel, setShowModel }) {
  const { width, height } = Dimensions.get('window');
  return (
    <Modal visible={showModel.uri !== null} animationType="fade" transparent>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: "white", borderRadius: 10, overflow: "hidden" }}>
          <AntDesign
            name="close"
            size={24}
            color="black"
            style={{ alignSelf: "flex-end", marginRight: 12, marginTop: 12 }}
            onPress={() => setShowModel({ uri: null })}
          />
          <Image
            source={showModel.uri ? { uri: showModel.uri } : null}
            style={{
              width: 400,
              height: height-100,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default PhotoModel;

