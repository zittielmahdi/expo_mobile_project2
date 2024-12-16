import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNote from "./(Tab)/AddNote";
import React, { useEffect, useState } from "react";
import {onAuthStateChanged } from "firebase/auth";
import { AUTH } from "@/FireBaseConfig"; // Ensure this import is correct
import { Tabs } from "expo-router";
import TabsLayout from "./(Tab)/_layout";
import AuthLayout from "./(Auth)/_layout";
import UpdateNote from "./Update";

const Stack = createNativeStackNavigator();
export const Context=React.createContext()

export default function RootLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(AUTH, (user) => {
      console.log("Auth state changed, user:", user); 
      setUser(user);
    });
    return () => unsubscribe();
  }, []);


  return (
    <Context.Provider value={[user,setUser]}>
   <NavigationContainer independent={true}>
    <Stack.Navigator screenOptions={{headerShown:false}} >
      {user?( 
          <>
           <Stack.Screen name="(Tab)" component={TabsLayout}/>
           <Stack.Screen name="Update" component={UpdateNote}/>
          </>
        )
      :(
      
         <Stack.Screen name="(Auth)" component={AuthLayout}/>
     )}
      
    </Stack.Navigator>
   </NavigationContainer>
   </Context.Provider>
  );
}
