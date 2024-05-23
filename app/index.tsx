import { ActivityIndicator,Pressable,StyleSheet, Text, TextInput, View,FlatList } from 'react-native';
import Roupa from '@/src/components/Roupa';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { addDoc, getDocs, doc, collection, deleteDoc } from 'firebase/firestore';
import { app, db } from '@/src/services/firebaseConfig';
import { useState,useEffect } from 'react';

export default function App() {
  const[title,setTitle]=useState('')
  const[roupaList,setProdutoList]=useState([])

  const addItem = async() =>{
    try {
      const docRef = await addDoc(collection(db,"roupas"), {
        title: title,
        isChecked:false
      });
      alert("Roupa Cadastrada")
      setTitle('')
      getItem()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const getItem = async () =>{
    let roupas = []
    const querySnapshot = await getDocs(collection(db, "roupas"));
    querySnapshot.forEach((doc) => {
      //console.log(doc.id , doc.data());
      const roupa = {
        id:doc.id,
        title:doc.data().title,
        isChecked:doc.data().isChecked
      }
      roupas.push(roupa)
    });
    setProdutoList(roupas)
  }

  const deleteItemList = async()=>{
    const pegandoItems = await getDocs(collection(db, "roupas"));
    pegandoItems.docs.map((item)=>deleteDoc(doc(db, "roupas", item.id)))
    getItem()
  }

  useEffect(()=>{
    getItem()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Lista de roupas</Text>
        <Text style={styles.numItem}>{roupaList.length}</Text>
        <Pressable onPress={deleteItemList}>
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      </View>

      {roupaList.length>0?(<FlatList 
        data={roupaList}
        renderItem={({item})=>(
          <Roupa 
            title={item.title}
            isChecked={item.isChecked}
            id={item.id}
            getItem={getItem}
            /> )}
      />):<ActivityIndicator/>}
      

      <TextInput 
        style={styles.txtInput}
        placeholder='Digite o nome da roupa'
        value={title}
        onChangeText={(value)=>setTitle(value)}
        onSubmitEditing={addItem}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },
  header:{
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
    padding:10,
    borderRadius:10,
    alignItems:'center'
  },
  headerTxt:{
    fontSize:25,
    fontWeight:'500',
    flex:1
  },
  numItem:{
    fontSize:25,
    fontWeight:'500',
    marginRight:20
  },
  txtInput:{
    backgroundColor:'lightgrey',
    padding:10,
    width:'90%',
    borderRadius:10,
    alignSelf:'center',
    marginTop:'auto',
    marginBottom:10
  }
});