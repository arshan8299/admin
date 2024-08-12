import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { CheckBox } from 'react-native-elements';
import CustomDrawerContent from "../component/CustomDrawerContent";
import { axiosInstance } from "../api/axios";
import { useIsFocused } from "@react-navigation/native";

const Agent = ({navigation}) => {
  const isFocussed=useIsFocused();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); 
  const [selectAll, setSelectAll] = useState(false); 

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    
    if (selectAll) {
      setSelectedItems(data);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, data, isFocussed]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/user/getAll/${page}`);
      setData(res.data.data);
      setTotalPage(res.data.meta.lastPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const toggleSelection = (item) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  console.log(selectedItems.length)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomDrawerContent color="black" paddingLeft={10} />
            <Text
              style={{
                // textAlign: "center",
                fontSize: 25,
                fontWeight: "700",
                marginLeft: "25%",
                marginTop: 10,
                marginBottom: 20,
                color:"#246EE9"
              }}
            >
              User Detail
            </Text>
          </View>
          <Pressable onPress={()=>navigation.navigate("Assign Agent",{items:selectedItems})}>
          <Text
            style={{ fontSize: 15, fontWeight: "600", textAlign: "left", paddingHorizontal:20, borderWidth:1, width:'35%', padding:10, marginLeft:20 }}
          >
            Assign Agent
          </Text>
          </Pressable> 

          <View
            style={{
              flexDirection: "row",
              padding: 20,
              width: "90%",
              justifyContent: "space-between",
              borderRadius: 10,
              marginTop: 10,
              alignItems: "center",
              backgroundColor: "white",
              alignSelf: "center",
            }}
          >
            <CheckBox
              checked={selectAll}
              onPress={toggleSelectAll}
              style={{ width: 10 }}
            />
            <Text style={{ fontSize: 18, width: 90, fontWeight: "600" ,color:"#246EE9"}}>
              Name
            </Text>
            <Text style={{ fontSize: 18, width: 120, fontWeight: "600",color:"#246EE9" }}>
              Email
            </Text>
            <Text style={{ fontSize: 18, width: 100, fontWeight: "600" ,color:"#246EE9"}}>
              Phone
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
                  padding: 10,
                  width: "90%",
                  justifyContent: "space-between",
                  borderRadius: 10,
                  marginTop: 10,
                  alignItems: "center",
                  backgroundColor: "white",
                  alignSelf: "center",
                }}
              >
                <CheckBox
                  checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                  onPress={() => toggleSelection(item)}
                  style={{width:20}}
                />
                <Text style={{ fontSize: 12, width: 90 }}>
                  {item.name || "N/A"}
                </Text>
                <Text style={{ fontSize: 12, width: 120 }}>
                  {item.details?.Email || "N/A"}
                </Text>
                <Text style={{ fontSize: 12, width: 100 }}>
                  {item.details?.phoneNo || "N/A"}
                </Text>
              </View>
            ))
          )}
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
          style={{
            marginHorizontal: 10,
            opacity: page === 1 ? 0.5 : 1,
          }}
          disabled={page === 1}
        >
          <Text style={{ fontSize: 20, borderWidth: 1, paddingHorizontal: 10 }}>
            Prev
          </Text>
        </Pressable>
        <Pressable
          onPress={handleNext}
          style={{
            marginHorizontal: 10,
            opacity: page === totalPage ? 0.5 : 1,
          }}
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

export default Agent;
