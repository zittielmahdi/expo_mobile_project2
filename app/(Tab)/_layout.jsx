import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View,Text } from "react-native"
import Home from "./Home"
import Profile from "./Profile"
import AddNote from "./AddNote"
const Tabs=createBottomTabNavigator()
const TabsLayout=()=>{
    return(
     <Tabs.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Tabs.Screen name="Home" component={Home}/>
        <Tabs.Screen name="AddNote" component={AddNote}/>
        <Tabs.Screen name="Profile" component={Profile}/>
     </Tabs.Navigator>
    )
}
export default TabsLayout