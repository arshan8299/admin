import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTest from './screens/HomeTest';
import Agent from './screens/Agent';
import CreateListing from './screens/CreateListing';
import CreateUser from './screens/CreateUser';
import Logout from './screens/Logout';
import MyProfile from './screens/MyProfile';
import StaffReport from './screens/StaffReport';
import Users from './screens/Users';
import Login from './screens/Login';
import AllProperty from './screens/AllProperty';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropertyDetails from './screens/PropertyDetails';
import EditUser from './screens/EditUser';
import CreateStaffs from './screens/CreateStaffs';
import ContactUser from './screens/ContactUsers';
import AgentAssign from './screens/AgentAssign';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeTest" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeTest" component={HomeTest} />
      <Drawer.Screen name="Agent" component={Agent} />
      <Drawer.Screen name="Create Listing" component={CreateListing} />
      <Drawer.Screen name="ALL Properties" component={AllProperty} />
      <Drawer.Screen name="ContactUser" component={ContactUser} />
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="Create Users" component={CreateUser} />
      <Drawer.Screen name="Create Staff" component={CreateStaffs} />
      <Drawer.Screen name="Staff Report" component={StaffReport} />
      <Drawer.Screen name="My Profile" component={MyProfile} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='drawer'>
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="AllProperties" component={AllProperty} />
        <Stack.Screen name="PropertyDetailStack" component={PropertyDetails} />
        <Stack.Screen name="Assign Agent" component={AgentAssign} />
        <Stack.Screen name="EditUser" component={EditUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
