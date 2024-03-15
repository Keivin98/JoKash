import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TransactionCard = ({transaction}) => {
    return (
        <View style={styles.cardContainer}>
            <Icon name="credit-card" size={20} color="#fff" style={styles.cardIcon} />
            <View style={styles.textContainer}>
                <Text style={styles.categoryText}>{transaction.category}</Text>
                <Text style={styles.cardText}>{transaction.card}</Text>
            </View>
            <Text style={styles.amountText}>{transaction.currency}{transaction.amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4E55AF',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 5, // Only works on Android for shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: {width: 0, height: 2}, // For iOS shadow
        shadowOpacity: 0.25, // For iOS shadow
        shadowRadius: 3.84, // For iOS shadow
    },
    cardIcon: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    categoryText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Avenir-Heavy"
    },
    cardText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: "Avenir-Medium"
    },
    amountText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Avenir-Heavy"
    },
});

export default TransactionCard;
