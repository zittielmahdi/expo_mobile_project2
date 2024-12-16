import { DB } from "@/FireBaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, SafeAreaView, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const UpdateNote = ({ navigation, route }) => {
  const { id } = route.params;
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Note, setNote] = useState({});
  const [Color,setColor]=useState("")

  const Colors=["#9370db","#7b68ee","#ba55d3","#dda0dd","#800080","#663399","#6a5acd","#d8bfd8","#98fb98","#afeeee","#f5fffa"]

  const getNote = () => {
    getDoc(doc(DB, 'MyNote', id)).then((noteDoc) => {
      const noteData = noteDoc.data();
      setNote(noteData);
      setTitle(noteData.Title);
      setDescription(noteData.Description);
    });
  };

  const EditNote = () => {
    updateDoc(doc(DB, 'MyNote', id), {
      user: Note.user,
      Title: Title,
      Description: Description,
      created_at: Note.created_at,
      color:Color
    })

    navigation.navigate("Home")
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <SafeAreaView style={{height:"100%",backgroundColor:"#f8f8ff", justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{color:"#9370db",fontWeight:"bold",fontSize:20}}>EditNote</Text>
      <TextInput
        style={{margin:20,height:"10%",width:"80%",backgroundColor:"#9370db",color:"#f5fffa",fontWeight:"bold",fontSize:20,borderRadius:15,padding:10,shadowColor: "#000", shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84, elevation: 5,}}
        placeholder="Title"
        value={Title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={{margin:20,height:"50%",width:"80%",backgroundColor:"#9370db",color:"#f5fffa",fontWeight:"bold",fontSize:20,borderRadius:15,padding:10,shadowColor: "#000", shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}
        placeholder="Description"
        value={Description}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setDescription(text)}
      />

      <SafeAreaView style={{height:30,width:"80%",flexDirection:"row",margin:10}}>
         {Colors.map((color)=>(
          <TouchableOpacity style={{backgroundColor:color,height:20,width:20,marginLeft:10}} onPress={()=>setColor(color)}>
          
          </TouchableOpacity>
         ))}
      </SafeAreaView>

      <TouchableOpacity onPress={EditNote} style={{borderRadius:20,height:50,width:"80%",justifyContent:"center",alignItems:"center",margin:20,backgroundColor:"#f5fffa",shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,}}>
        <Text style={{color:"#9370db",fontSize:20,fontWeight:"bold"}}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{margin:5}} onPress={() => navigation.navigate("Home")}>
         <AntDesign name="home" size={24} color="#9370db" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UpdateNote;
