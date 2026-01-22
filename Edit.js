import React, { useState } from 'react';
import {
    StatusBar,
    View,
    Button,
    Text,
    TextInput,
    Alert,
    ToastAndroid
} from 'react-native';

const Edit = ({ navigation, route }) => {
    const [name, setName] = useState(route.params.name);
    const [pic, setPic] = useState(route.params.pic);

    return (
        <View>
            <StatusBar />

            <Text>Card Name:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text>Card Pic URL:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                value={pic}
                onChangeText={(text) => setPic(text)}
            />

            <Text> </Text>

            <Button
                title="Update"
                onPress={() => {
                    let updatedCard = {
                        card_name: name,
                        card_pic: pic
                    };

                    fetch(
                        "https://onlinecardappwebservice-vxmc.onrender.com/updatecard/" +
                        route.params.id,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(updatedCard)
                        }
                    )
                        .then((response) => response.json())
                        .then(() => {
                            navigation.navigate("Home");
                        });
                }}
            />

            <Text> </Text>

            <Button
                title="Delete"
                onPress={() => {
                    Alert.alert(
                        "Are you sure you want to delete this card?",
                        "",
                        [
                            {
                                text: "Yes",
                                onPress: () => {
                                    fetch(
                                        "https://onlinecardappwebservice-vxmc.onrender.com/deletecard/" +
                                        route.params.id,
                                        {
                                            method: "DELETE"
                                        }
                                    )
                                        .then((response) => response.json())
                                        .then((myJson) => {
                                            ToastAndroid.show(
                                                myJson.message,
                                                ToastAndroid.SHORT
                                            );
                                            navigation.navigate("Home");
                                        });
                                }
                            },
                            { text: "No" }
                        ]
                    );
                }}
            />
        </View>
    );
};

export default Edit;