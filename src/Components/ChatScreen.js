import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

const ChatScreen = () => (
    <SafeAreaView style={styles.container}>
        <Text>Chat Screen</Text>
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

export default ChatScreen;
