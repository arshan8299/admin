import { View, Text , SafeAreaView} from 'react-native'
import React from 'react'
import CustomDrawerContent from '../component/CustomDrawerContent'
import AllProperty from './AllProperty'
import { useNavigation } from '@react-navigation/native'

const MyProperty = () => {
  const navigation=useNavigation();
  return (
    <SafeAreaView>
    <View>
        <CustomDrawerContent
            color="Black"
            paddingLeft={10}
            onPress={()=>navigation.goBack()}/>
      <Text>MyProperty</Text>

      <AllProperty/>
    </View>
    </SafeAreaView>
  )
}

export default MyProperty