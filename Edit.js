import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Edit = ({navigation, route}) => {
    const[name,setName] = useState(route.params.name);
    const[pic,setPic] = useState(route.params.pic);

    const showSuccessMessage = (message) => {
        Alert.alert('Success', message, [{ text: 'OK' }]);
    };
    return (
        <View>
            <StatusBar/>
            <Text>Card Name:</Text>
            <TextInput value={name} style={{borderWidth:1}} onChangeText={(text)=>setName(text)}/>
            <Text>Card Pic URL:</Text>
            <TextInput value={pic} style={{borderWidth:1}} onChangeText={(text)=>setPic(text)}/>
            <Text> </Text>
            <Button title='Update'
                    onPress={()=>{
                        let item = {card_name:name, card_pic:pic};
                        fetch("https://onlinecardappwebservice-owag.onrender.com/updatecard/" + route.params.id,
                            {
                                method:"PUT",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify(item)
                            })
                            .then((response)=>{
                                showSuccessMessage('Card updated successfully');
                                setTimeout(() => {
                                    navigation.navigate("Home");
                                }, 1000);
                            })
                    }}
            />
            <Text> </Text>
            <Button title='Delete'
                    onPress={()=>{
                        Alert.alert("Are you sure you want to delete this card?", '',[
                            {
                                text: 'Yes', onPress: () => {
                                    fetch("https://onlinecardappwebservice-owag.onrender.com/deletecard/" + route.params.id,
                                        {
                                            method: "DELETE",
                                        })
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((myJson) => {
                                            showSuccessMessage('Card deleted successfully');
                                            setTimeout(() => {
                                                navigation.navigate("Home");
                                            }, 1000);
                                        })
                                }
                            },
                            {text: 'No'}
                        ]);
                    }}
            />
        </View>
    );
};

export default Edit;