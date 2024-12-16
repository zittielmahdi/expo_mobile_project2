import { AUTH, DB } from "@/FireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, where,query, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Button, Pressable, TextInput } from "react-native";
import { Context } from "../_layout";
import Entypo from '@expo/vector-icons/Entypo';
import { Link, useFocusEffect } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Home = ({navigation}) => {
  const [Notes, setNotes] = useState([]);
  const [user,setUser]=useContext(Context)
  const [search,setSearch]=useState('')

  useFocusEffect(useCallback(()=>{
   getNotes()
  },[]))

  const getNotes=()=>{
    getDocs(query(collection(DB, 'MyNote'),where('user','==',user.email))).then((Datas) => {
      let NotesArray = [];
      Datas.forEach((Notedata) => {
        NotesArray.push({ ...Notedata.data(), id: Notedata.id });
      });
      setNotes(NotesArray);
    });
  }

  const getSearchedNotes=()=>{

    if (search=='') {
       getNotes()
    } else {
      getDocs(query(collection(DB,'MyNote'),where('Title','==',search))).then((searchedNotes=>{
        let sNotes=[]

        searchedNotes.forEach((searchedNote)=>{
          sNotes.push({...searchedNote.data(),id:searchedNote.id})
        })
        setNotes(sNotes)
      }))

      setSearch('')
    }
   
  }


  const DeleteNote=(id)=>{
    deleteDoc(doc(DB,'MyNote',id))
    getNotes()
  }
  
  const DeleteNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(DB, 'MyNote'));
      const batch = writeBatch(DB);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log("All notes deleted successfully");
    } catch (error) {
      console.error("Error deleting notes: ", error);
    }
    getNotes()
  };
return(
<SafeAreaView style={styles.container}>
  <Text style={{fontWeight:"bold",fontSize:25,color:"white",marginTop:30,marginBottom:30}}>MyNotes</Text>
  <View style={{flexDirection:"row"}}>
    <TextInput value={search} onChangeText={setSearch} style={{height:40,width:'60%',backgroundColor:"#fff",borderRadius:10,padding:10,shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}} placeholder="Search"/>
    <TouchableOpacity onPress={getSearchedNotes} style={{justifyContent:"center",alignItems:"center",marginLeft:5,backgroundColor:"#f5fffa",height:40,borderRadius:10,width:40,shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
      <AntDesign name="search1" size={24} color="#7b68ee" />
    </TouchableOpacity>
  </View>
 
 <TouchableOpacity onPress={DeleteNotes} style={{marginLeft:"92%"}}>
    <MaterialIcons name="clear-all" size={30} color="white" />
 </TouchableOpacity>
  
<FlatList
  data={Notes}
  renderItem={({ item }) => (
    <Pressable style={ {
      backgroundColor: item.color,
      padding: 20,
      marginVertical: 8,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,
      
      elevation: 15,
      }
     } onPress={()=>navigation.navigate("Update",{id:item.id})}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Title:</Text>
        <Text style={styles.content}>{item.Title}</Text>
        <Text style={styles.title}>Description:</Text>
        <Text style={styles.content}>{item.Description}</Text>
      </View>
      <TouchableOpacity  onPress={()=>{DeleteNote(item.id)}}>
      <Entypo name="trash" size={24} color="red" />
      </TouchableOpacity>
    </Pressable>
    
  )}
  keyExtractor={(item) => item.id}
/>

</SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#7b68ee',
padding: 16,
},
textContainer: {
  flex: 1,
},
title: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 4,
color: '#7b68ee',
},
content: {
fontSize: 16,
color: '#666',
},

addButton: {
position: 'absolute',
bottom: 16,
left: 16,
backgroundColor: '#fff',
paddingVertical: 12,
paddingHorizontal: 20,
borderRadius: 25,
elevation: 2,
},
addButtonText: {
color: 'purple',
fontSize: 16,
fontWeight: 'bold',
},
});
export default Home