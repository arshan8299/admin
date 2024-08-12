import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const CustomDrawerContent = ({ color, paddingLeft, pt }) => {
  const navigation = useNavigation();
  
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Entypo
          name="menu"
          size={34}
          color={color}
          style={{ paddingLeft: paddingLeft, paddingTop: pt }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({});


