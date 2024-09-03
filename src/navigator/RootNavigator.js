import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import AddViewEmployee from '../screens/AddViewEmployee';
import Home from '../screens/Dashboard';
import { useEmployeeStore } from '../store/chatStore';
import SearchEmployee from '../screens/SearchEmployees';
import Chat from '../screens/Chat';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  // const {intializing} = useChatStore();
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="dashBoard"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Group>
        <Stack.Screen
          name="dashBoard"
          component={Home}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
         <Stack.Screen
          name="chat"
          component={Chat}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
       
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  flexView: {
    height: '100%',
    backgroundColor: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default RootNavigator;
