import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginPage from "./Login"
import SignPage from "./Sign"


const Stack=createNativeStackNavigator()

const AuthLayout=()=>{
    return(
       <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginPage}/>
            <Stack.Screen name="Sign" component={SignPage}/>
        </Stack.Navigator>
       </NavigationContainer>
    )
}

export default AuthLayout