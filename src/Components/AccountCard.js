import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

const AccountCard = ({iconName, title, onPress}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Icon name={iconName} size={30} color="#fff" />
            <Text style={styles.cardTitle}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#000"
    },
    cardTitle: {
        fontFamily: "Avenir-Bold",
        color: "#fff"
    }
})