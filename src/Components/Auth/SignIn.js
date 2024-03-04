import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';

import auth from '@react-native-firebase/auth';
import SignInGoogle from './SignInGoogle';
import SignInApple from './SignInApple';

export default function SignIn() {
    return (
        <View style={styles.container}>
            <SignInApple />
            <SignInGoogle />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF', // Or any other suitable background color
    },
    appleButton: {
        width: '100%', // Take the full width of the container minus paddings
        height: 45, // Common button height
        // Optionally, you can add shadows, borders, etc. here
    },
});
