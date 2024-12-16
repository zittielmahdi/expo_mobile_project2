import { AUTH } from "@/FireBaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { View,Text, Pressable, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Context } from "../_layout"
import AntDesign from '@expo/vector-icons/AntDesign';

const Profile=()=>{
    const[user,setUser]=useContext(Context)
   
    return(
        <View style={Styles.container}>
            
            <AntDesign name="user" size={24} color="black" style={{fontSize:124,backgroundColor:"#f0fff0",color:"#9370db",padding:10,borderRadius:120,shadowColor: "#000",shadowOffset: {width: 0,height: 7,},shadowOpacity: 0.43,shadowRadius: 9.51,elevation: 15,}}/>
            <Text style={Styles.Email}>Email: {user.email}</Text>
            <TouchableOpacity style={Styles.Button} onPress={()=>{AUTH.signOut()}}>
            <Text style={Styles.Button_Text}>Log Out</Text>
            </TouchableOpacity>
            
        </View>
    )
}


const Styles=StyleSheet.create({
    container:{
        height:"100%",
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#f5fffa"
    },
    Email:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:12,
        marginTop:60,
        color:"#7b68ee"
    },
    Button:{
        backgroundColor:"#7b68ee",
        borderRadius:5,
        width:"80%",
        height:60,
        justifyContent:"center",
        marginTop:30,
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        
        elevation: 15,
    },
    Button_Text:{
        color:"white",
        fontWeight:"bold",
        fontSize:20
    },
    icon:{
      height:100,
      width:100,
      borderRadius:5
    }
})
export default Profile

