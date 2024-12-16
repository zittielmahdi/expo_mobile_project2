import { AUTH, DB } from "@/FireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Context } from "../_layout";

const AddNote = ({ navigation,route}) => {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [user, setUser] = useContext(Context)
  const [color,setColor]=useState("")
  const Colors=[{id:1,color:"#9370db"},{id:2,color:"#7b68ee"},{id:3,color:"#ba55d3"},{id:4,color:"#dda0dd"},{id:5,color:"#800080"},{id:6,color:"#663399"},{id:7,color:"#6a5acd"},{id:8,color:"#d8bfd8"},{id:9,color:"#98fb98"},{id:10,color:"#afeeee"},{id:11,color:"#f5fffa"}]


  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const AddNoteInFireBase = () => {

    addDoc(collection(DB, 'MyNote'), {
      user: user.email,
      Title: Title,
      Description: Description,
      created_at: getCurrentDate(),
      color:color
    })
      .then(() => {
        console.log("data submitted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
      setTitle('')
      setDescription('')
      navigation.navigate("Home")


  };

  return (
    <SafeAreaView style={{height:"100%",backgroundColor:"#f8f8ff", justifyContent: "center", alignItems: "center", flex: 1 }}>
      
        <Text style={{color:"#9370db",fontWeight:"bold",fontSize:20}}>AddNote</Text>
        <TextInput
          placeholder="Title"
          value={Title}
          onChangeText={(text) => setTitle(text)}
          style={{width:"80%",backgroundColor:'#9370db',padding:10,color:"#f5fffa",fontWeight:"bold",height:"10%",borderRadius:15,margin:20,fontSize:20,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,}}
        />
        <TextInput
          placeholder="Description"
          value={Description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={4}
          style={{width:"80%",backgroundColor:'#9370db',color:"#f5fffa",fontWeight:"bold",padding:10,height:"50%",borderRadius:15,margin:20,fontSize:20,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,}}
        />

      <SafeAreaView style={{height:30,width:"80%",flexDirection:"row",margin:10}}>
         {Colors.map((color)=>(
          <TouchableOpacity style={{backgroundColor:color.color,height:20,width:20,marginLeft:10}} onPress={()=>setColor(color.color)}>
          
          </TouchableOpacity>
         ))}
      </SafeAreaView>

        <TouchableOpacity style={{borderRadius:20,height:50,width:"80%",justifyContent:"center",alignItems:"center",margin:20,backgroundColor:"#f5fffa",shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}} onPress={AddNoteInFireBase}>
          <Text style={{color:"#9370db",fontSize:20,fontWeight:"bold"}}>Save</Text>
        </TouchableOpacity>
     
    </SafeAreaView>
  );
};

export default AddNote;
