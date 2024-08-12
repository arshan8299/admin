import { View, Text, SafeAreaView, Modal, TouchableOpacity, FlatList, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../api/axios";
import { useIsFocused } from "@react-navigation/native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const DropdownPicker = ({ items, selectedValue, setSelectedValue, placeholder, label }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
      onPress={() => handleSelect(item.value)}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{label}</Text>
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          backgroundColor: '#fff',
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{
            width: '80%',
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
          }}>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item.value.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AgentAssign = ({ route, navigation }) => {
  const [propertyData, setPropertyData] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { items } = route.params;
  const isFocussed=useIsFocused();

  useEffect(() => {
    const getPropertyData = async () => {
      try {
        const res = await axiosInstance.get(`/property/getAll/1`);
        setPropertyData(res.data.data || []);
        console.log("Property Data ===>", res.data.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    getPropertyData();
  }, [isFocussed]);

  useEffect(() => {
    const getAgentData = async () => {
      try {
        const res = await axiosInstance.get(`/staff/getAll/1`);
        setAgents(res.data.data || []);
        console.log("Agents Data ===>", res.data.data);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };

    getAgentData();
  }, [isFocussed]);

  const handleConfirm = (date) => {
    setSelectedDate(date.toLocaleDateString());
    setDatePickerVisibility(false);
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post("visit-assign/BulkAssgin", {
        usersId: items.map((i) => Number(i.id)),
        propertyId: selectedProperty,
        staffId: selectedAgent,
        dateOfVisit: selectedDate,
      });
      if(res.status==200)
      {
        console.log("api called success");
        alert("Agent Assign Successfully");
        navigation.navigate("HomeTest");
        setSelectedProperty([])
        
      }
      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal:20 }}>
      <Text style={{fontSize:25, textAlign:'center', color:"#246EE9", fontWeight:600}}>Assign Agent</Text>
      <View style={{marginTop:'10%'}}>
      <DropdownPicker
        items={propertyData.map(property => ({
          label: property.name,
          value: property.id,
        }))}
        selectedValue={selectedProperty}
        setSelectedValue={setSelectedProperty}
        placeholder="Select a property..."
        label="Select Property"
      />
      <DropdownPicker
        items={agents.map(agent => ({
          label: agent.Role,
          value: agent.id,
        }))}
        selectedValue={selectedAgent}
        setSelectedValue={setSelectedAgent}
        placeholder="Select an agent..."
        label="Select Agent"
      />

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Date</Text>
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
          }}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text>{selectedDate ? selectedDate : 'Select a date...'}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />


      <View>
        <Pressable style={{ padding:20, backgroundColor:"green", width:'40%', borderRadius:10, margin:'auto'}} onPress={handleSubmit}>
          <Text style={{color:"white", textAlign:'center', fontSize:20}}>Submit</Text>
        </Pressable>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default AgentAssign;
