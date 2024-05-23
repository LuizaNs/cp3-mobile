import React, { useEffect, useState } from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db,doc,updateDoc,deleteDoc} from '../services/firebaseConfig'


export default function Roupa(props) {
    const [isChecked, setIsChecked] = useState(props.isChecked)

    const updateIsChecked = async() => {
        const itemRef = doc(db, "roupas", props.id);
        
        await updateDoc(itemRef, {
            isChecked: isChecked
        });
    }

    const deleteItem = async() =>{
       await deleteDoc(doc(db, "roupas", props.id));
       props.getItem()
    }

    useEffect(()=>{
        updateIsChecked()
    },[isChecked])

    return (
        <SafeAreaView>
            <View style={style.container}>
                <Pressable onPress={() => setIsChecked(!isChecked)}>
                    {isChecked ? <AntDesign name="checkcircle" size={24} color="black" /> : <AntDesign name="checkcircleo" size={24} color="black" />}
                </Pressable>

                <Text style={style.txt}>{props.title}</Text>

                <Pressable onPress={deleteItem}>
                    <MaterialIcons name="delete" size={24} color="black" />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 5
    },
    txt: {
        flex: 1,
        fontSize: 18,
        marginLeft: 18,
        fontWeight: '500'
    }
})