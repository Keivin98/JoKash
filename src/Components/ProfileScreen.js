import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

const ProfileScreen = () => (
    <SafeAreaView style={styles.container}>
        <Text>Profile Screen</Text>
    </SafeAreaView>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: "#EEF5FF"
    },
})

export default ProfileScreen;
