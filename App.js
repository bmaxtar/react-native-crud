import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteScreen from './app/screens/NoteScreen';
import Intro from './app/screens/Intro';
import NoteDetail from './app/components/NoteDetail';
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './app/contexts/NoteProvider';

const Stack = createStackNavigator()

export default function App() {

  const [user, setUser] = useState({});
  const [isAppFirstTimeeOpen, setIsAppFirstTimeOpen] = useSate(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if(result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
      
  };

  useEffect(() => {
    findUser(); 
    //AsyncStorage.clear();
  }, []);

  const renderNoteScreen = (props) => <NoteScreen {...props} user={user} />

  if(isAppFirstTimeeOpen) return <Intro onFinish={findUser} />;
  return (
  <NavigationContainer>
    <NoteProvider>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
        <Stack.Screen component={renderNoteScreen} name="NoteScreen" />
        <Stack.Screen component={NoteDetail} name="NoteDetail" />
      </Stack.Navigator>
      </NoteProvider>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
   
  },
});
