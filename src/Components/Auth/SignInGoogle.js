import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '382100094090-935bt2apcfpi1b4bevht4t6civ0jjif8.apps.googleusercontent.com',
});

export default function SignInGoogle() {
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        // Get the users ID token
        const {idToken} = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    return (
        // <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
            <Image
                source={require('../../Assets/google-logo.png')} // Replace with the path to your Google logo
                style={styles.buttonImageIconStyle}
            />
            {/* <View style={styles.buttonIconSeparatorStyle} /> */}
            <Text style={styles.buttonTextStyle}>Sign in with Google</Text>
        </TouchableOpacity>
        // </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderColor: '#808080',
        height: 40,
        borderRadius: 5,
        width: "100%",
        margin: 5,
    },
    buttonImageIconStyle: {
        // padding: 10,
        // margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#808080',
        marginBottom: 4,
        marginLeft: 5,
        // marginRight: 20,
        fontSize: 16,
        // fontWeight: 'bold',
    },
    buttonIconSeparatorStyle: {
        backgroundColor: '#808080',
        width: 1,
        height: 40,
    },
});