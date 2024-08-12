import { View, Text, SafeAreaView, TextInput, Pressable,ActivityIndicator } from "react-native";
import React, { useState,useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CustomDrawerContent from "../component/CustomDrawerContent";
import { axiosInstance } from "../api/axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contacted, setContacted] = useState("");
  const[loading,setLoading]=useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgents] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance("/staff/getAll/1");
        setAgents(
          res.data.data.map((a) => ({
            label: a.details.name,
            value: a.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchData();
  }, []);

  const data={
    name,
    details:{
      Email:email,
      phoneNo:phone,
      Contacted:contacted
    },
    agents,
    postedBy:"admin"
  }

  const handlesubmit=async()=>
  {
   try
   {
    setLoading(true);
    const res=await axiosInstance.post('/user/create', data);
    if(res.status===200)
    {
      alert("user created success");
      setName("");
      setEmail("");
      setAgent("");
      setPhone("");
      setContacted("");
    }
   }
   catch(err)
   {
    console.log(err)
   }
   finally{
    setLoading(false);
   }
  }

  return (
    <SafeAreaView>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop:20 }}>
          <CustomDrawerContent color="Black" paddingLeft={10} />
          <Text style={{ fontSize: 25, fontWeight: "600", paddingLeft: "10%",color:"#246EE9", marginLeft:'10%' }}>
            Create User Profile
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Name</Text>
          <TextInput
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
            }}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter Name"
          />

          <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>E-Mail</Text>
          <TextInput
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter E-Mail"
          />

          <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Select Agent</Text>
          <DropDownPicker
            open={open}
            value={selectedAgent}
            items={agents}
            setOpen={setOpen}
            setValue={setSelectedAgent}
            setItems={setAgents}
            placeholder="Select Agent"
            containerStyle={{ width: "100%" }}
            style={{ backgroundColor: "#fafafa", zIndex: 999 }}
            dropDownContainerStyle={{ backgroundColor: "#fafafa" }}
          />

          <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Phone</Text>
          <TextInput
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
            }}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Enter Phone"
          />

          <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Contacted</Text>
          <TextInput
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
            }}
            value={contacted}
            onChangeText={(text) => setContacted(text)}
            placeholder="Enter Contacted Status"
          />
        </View>

        <Pressable
          style={{
            marginHorizontal: 20,
            padding: 10,
            marginTop: 40,
            backgroundColor: "#246EE9",
            borderRadius: 10,
          }}
        >
          <Pressable onPress={handlesubmit}>
         {
          loading?(<ActivityIndicator size="small" color="white"/>):(
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
          )
         }
          </Pressable>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateUser;

