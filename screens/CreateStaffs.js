import { View, Text, SafeAreaView, TextInput, Pressable, ScrollView, ActivityIndicator } from "react-native";
import React, { useState,useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CustomDrawerContent from "../component/CustomDrawerContent";
import { axiosInstance } from "../api/axios";

const CreateStaffs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState("");
  const [assignZipCode, setAssignZipCode] = useState(""); // Fixed state name
  const [open, setOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgents] = useState([]);

  const [open2, setOpen2] = useState(false);
  const [role, setRole] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Manager", value: "Manager" },
    { label: "Team Lead", value: "Team Lead" },
    { label: "Staff", value: "Staff" },
  ]);

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
  const data = {
    details: {
      name,
      email,
      phoneNo: phone,
      password,
    },
    role,
    parent: "1",
    zipCodeAssign: assignZipCode, // Fixed data property name
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/staff/create", data);
      if (res.status === 200) { // Use strict equality
        alert("Staff Registered Successfully");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAssignZipCode(""); // Clear the ZipCode field
        setRole(null); // Reset the dropdowns
        setAgent(null);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to create staff");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" , marginTop:20}}>
            <CustomDrawerContent color="Black" paddingLeft={10} />
            <Text style={{ fontSize: 25, fontWeight: "600", paddingLeft: "10%",color:"#246EE9" }}>
              Create Staffs Profile
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

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Select Role</Text>
            <DropDownPicker
              open={open2}
              value={role}
              items={items2}
              setOpen={setOpen2}
              setValue={setRole}
              setItems={setItems2}
              placeholder="Select Role"
              containerStyle={{ width: "100%" }}
              style={{ backgroundColor: "#fafafa", zIndex: 999 }}
              dropDownContainerStyle={{ backgroundColor: "#fafafa" }}
            />

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Password</Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter Password"
              secureTextEntry={true} // Use secureTextEntry for passwords
            />

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Select Work Under Type</Text>
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

            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 5 }}>Assign Zip Code</Text>
            <TextInput
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
              }}
              value={assignZipCode} // Use corrected state variable
              onChangeText={(text) => setAssignZipCode(text)}
              placeholder="Enter Zip Code"
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
            onPress={handleSubmit} // Moved onPress to outer Pressable
          >
           {
            loading?(<ActivityIndicator color="white"/>):( <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "white",
                fontWeight: "600",
              }}
            >
              Submit
            </Text>)
           }
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateStaffs;
