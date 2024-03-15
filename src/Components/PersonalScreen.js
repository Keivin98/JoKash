import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LineChart from "./Charts/LineChart"
import TransactionCard from './TransactionCard';

const periods = ['Week', 'Month', 'Year', 'All Time'];
const currency = "$";
const ptData = [{'value': 160, 'date': '1 Jan 2024', 'expense_type': 'Groceries', 'expense_source': 'Credit Card', 'id': 0}, {'value': 180, 'date': '2 Jan 2024', 'expense_type': 'Groceries', 'expense_source': 'Credit Card', 'id': 1}, {'value': 190, 'date': '3 Jan 2024', 'expense_type': 'Travels', 'expense_source': 'Cash', 'id': 2}, {'value': 180, 'date': '4 Jan 2024', 'expense_type': 'Misc', 'expense_source': 'Credit Card', 'id': 3}, {'value': 140, 'date': '5 Jan 2024', 'expense_type': 'Shopping', 'expense_source': 'Cash', 'id': 4}, {'value': 145, 'date': '6 Jan 2024', 'expense_type': 'Transportation', 'expense_source': 'Debit Card', 'id': 5}, {'value': 160, 'date': '7 Jan 2024', 'expense_type': 'Groceries', 'expense_source': 'Debit Card', 'id': 6}, {'value': 200, 'date': '8 Jan 2024', 'expense_type': 'Groceries', 'expense_source': 'Debit Card', 'id': 7}, {'value': 220, 'date': '9 Jan 2024', 'expense_type': 'Shopping', 'expense_source': 'Cash', 'id': 8}, {'value': 240, 'date': '10 Jan 2024', 'expense_type': 'Food', 'expense_source': 'Debit Card', 'id': 9}, {'value': 280, 'date': '11 Jan 2024', 'expense_type': 'Food', 'expense_source': 'Credit Card', 'id': 10}, {'value': 260, 'date': '12 Jan 2024', 'expense_type': 'Shopping', 'expense_source': 'Cash', 'id': 11}, {'value': 340, 'date': '13 Jan 2024', 'expense_type': 'Food', 'expense_source': 'Debit Card', 'id': 12}, {'value': 385, 'date': '14 Jan 2024', 'expense_type': 'Transportation', 'expense_source': 'Debit Card', 'id': 13}, {'value': 280, 'date': '15 Jan 2024', 'expense_type': 'Food', 'expense_source': 'Debit Card', 'id': 14}, {'value': 390, 'date': '16 Jan 2024', 'expense_type': 'Shopping', 'expense_source': 'Debit Card', 'id': 15}, {'value': 370, 'date': '17 Jan 2024', 'expense_type': 'Shopping', 'expense_source': 'Cash', 'id': 16}, {'value': 285, 'date': '18 Jan 2024', 'expense_type': 'Groceries', 'expense_source': 'Cash', 'id': 17}, {'value': 295, 'date': '19 Jan 2024', 'expense_type': 'Food', 'expense_source': 'Debit Card', 'id': 18}, {'value': 300, 'date': '20 Jan 2024', 'expense_type': 'Travels', 'expense_source': 'Credit Card', 'id': 19}, {'value': 280, 'date': '21 Jan 2024', 'expense_type': 'Shopping', 'expense_source': 'Debit Card', 'id': 20}, {'value': 295, 'date': '22 Jan 2024', 'expense_type': 'Travels', 'expense_source': 'Cash', 'id': 21}, {'value': 260, 'date': '23 Jan 2024', 'expense_type': 'Transportation', 'expense_source': 'Cash', 'id': 22}, {'value': 255, 'date': '24 Jan 2024', 'expense_type': 'Groceries', 'expense_source': 'Cash', 'id': 23}, {'value': 190, 'date': '25 Jan 2024', 'expense_type': 'Food', 'expense_source': 'Cash', 'id': 24}, {'value': 220, 'date': '26 Jan 2024', 'expense_type': 'Transportation', 'expense_source': 'Credit Card', 'id': 25}, {'value': 205, 'date': '27 Jan 2024', 'expense_type': 'Travels', 'expense_source': 'Cash', 'id': 26}, {'value': 230, 'date': '28 Jan 2024', 'expense_type': 'Travels', 'expense_source': 'Debit Card', 'id': 27}, {'value': 210, 'date': '29 Jan 2024', 'expense_type': 'Transportation', 'expense_source': 'Debit Card', 'id': 28}, {'value': 210, 'date': '30 Jan 2024', 'expense_type': 'Groceries', 'expense_source': 'Cash', 'id': 29}, {'value': 210, 'date': '31 Jan 2024', 'expense_type': 'Travels', 'expense_source': 'Debit Card', 'id': 30}, {'value': 160, 'date': '1 Feb 2024', 'expense_type': 'Food', 'expense_source': 'Credit Card', 'id': 31}, {'value': 180, 'date': '2 Feb 2024', 'expense_type': 'Travels', 'expense_source': 'Debit Card', 'id': 32}, {'value': 190, 'date': '3 Feb 2024', 'expense_type': 'Misc', 'expense_source': 'Debit Card', 'id': 33}, {'value': 180, 'date': '4 Feb 2024', 'expense_type': 'Misc', 'expense_source': 'Cash', 'id': 34}, {'value': 140, 'date': '5 Feb 2024', 'expense_type': 'Transportation', 'expense_source': 'Debit Card', 'id': 35}, {'value': 145, 'date': '6 Feb 2024', 'expense_type': 'Transportation', 'expense_source': 'Debit Card', 'id': 36}, {'value': 160, 'date': '7 Feb 2024', 'expense_type': 'Travels', 'expense_source': 'Credit Card', 'id': 37}, {'value': 200, 'date': '8 Feb 2024', 'expense_type': 'Misc', 'expense_source': 'Debit Card', 'id': 38}, {'value': 220, 'date': '9 Feb 2024', 'expense_type': 'Food', 'expense_source': 'Cash', 'id': 39}, {'value': 240, 'date': '10 Feb 2024', 'expense_type': 'Transportation', 'expense_source': 'Cash', 'id': 40}, {'value': 280, 'date': '11 Feb 2024', 'expense_type': 'Shopping', 'expense_source': 'Cash', 'id': 41}, {'value': 260, 'date': '12 Feb 2024', 'expense_type': 'Shopping', 'expense_source': 'Cash', 'id': 42}, {'value': 340, 'date': '13 Feb 2024', 'expense_type': 'Travels', 'expense_source': 'Credit Card', 'id': 43}, {'value': 385, 'date': '14 Feb 2024', 'expense_type': 'Transportation', 'expense_source': 'Cash', 'id': 44}, {'value': 280, 'date': '15 Feb 2024', 'expense_type': 'Misc', 'expense_source': 'Cash', 'id': 45}, {'value': 390, 'date': '16 Feb 2024', 'expense_type': 'Shopping', 'expense_source': 'Cash', 'id': 46}, {'value': 370, 'date': '17 Feb 2024', 'expense_type': 'Food', 'expense_source': 'Cash', 'id': 47}, {'value': 285, 'date': '18 Feb 2024', 'expense_type': 'Food', 'expense_source': 'Debit Card', 'id': 48}, {'value': 295, 'date': '19 Feb 2024', 'expense_type': 'Misc', 'expense_source': 'Cash', 'id': 49}, {'value': 300, 'date': '20 Feb 2024', 'expense_type': 'Misc', 'expense_source': 'Credit Card', 'id': 50}, {'value': 280, 'date': '21 Feb 2024', 'expense_type': 'Groceries', 'expense_source': 'Debit Card', 'id': 51}, {'value': 295, 'date': '22 Feb 2024', 'expense_type': 'Travels', 'expense_source': 'Credit Card', 'id': 52}, {'value': 260, 'date': '23 Feb 2024', 'expense_type': 'Travels', 'expense_source': 'Cash', 'id': 53}, {'value': 255, 'date': '24 Feb 2024', 'expense_type': 'Transportation', 'expense_source': 'Debit Card', 'id': 54}, {'value': 190, 'date': '25 Feb 2024', 'expense_type': 'Transportation', 'expense_source': 'Cash', 'id': 55}, {'value': 220, 'date': '26 Feb 2024', 'expense_type': 'Misc', 'expense_source': 'Cash', 'id': 56}, {'value': 205, 'date': '27 Feb 2024', 'expense_type': 'Groceries', 'expense_source': 'Cash', 'id': 57}, {'value': 230, 'date': '28 Feb 2024', 'expense_type': 'Travels', 'expense_source': 'Cash', 'id': 58}, {'value': 210, 'date': '29 Feb 2024', 'expense_type': 'Food', 'expense_source': 'Cash', 'id': 59}, {'value': 240, 'date': '1 Mar 2024', 'expense_type': 'Food', 'expense_source': 'Cash', 'id': 60}, {'value': 250, 'date': '2 Mar 2024', 'expense_type': 'Transportation', 'expense_source': 'Cash', 'id': 61}, {'value': 280, 'date': '3 Mar 2024', 'expense_type': 'Food', 'expense_source': 'Cash', 'id': 62}, {'value': 250, 'date': '4 Mar 2024', 'expense_type': 'Groceries', 'expense_source': 'Credit Card', 'id': 63}, {'value': 210, 'date': '5 Mar 2024', 'expense_type': 'Groceries', 'expense_source': 'Debit Card', 'id': 64}, {'value': 240, 'date': '6 Mar 2024', 'expense_type': 'Travels', 'expense_source': 'Cash', 'id': 65}, {'value': 205, 'date': '7 Mar 2024', 'expense_type': 'Shopping', 'expense_source': 'Debit Card', 'id': 66}, {'value': 230, 'date': '8 Mar 2024', 'expense_type': 'Travels', 'expense_source': 'Debit Card', 'id': 67}, {'value': 210, 'date': '9 Mar 2024', 'expense_type': 'Groceries', 'expense_source': 'Cash', 'id': 68}, {'value': 240, 'date': '10 Mar 2024', 'expense_type': 'Shopping', 'expense_source': 'Credit Card', 'id': 69}, {'value': 250, 'date': '11 Mar 2024', 'expense_type': 'Groceries', 'expense_source': 'Credit Card', 'id': 70}, {'value': 280, 'date': '12 Mar 2024', 'expense_type': 'Travels', 'expense_source': 'Debit Card', 'id': 71}, {'value': 250, 'date': '13 Mar 2024', 'expense_type': 'Transportation', 'expense_source': 'Cash', 'id': 72}, {'value': 210, 'date': '14 Mar 2024', 'expense_type': 'Transportation', 'expense_source': 'Debit Card', 'id': 73}, {'value': 240, 'date': '15 Mar 2024', 'expense_type': 'Transportation', 'expense_source': 'Debit Card', 'id': 74}]

const PersonalScreen = () => {

    const [activePeriod, setActivePeriod] = useState('Week');
    return (
        <LinearGradient
            colors={[
                "#c58ede",
                "#403696",
                "#191985",
                "#000094",
                "#000094",
                "#191985",
                "#6b6b8c"
            ]}
            start={{x: 0.2, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.linearGradient}
        >
            <SafeAreaView style={styles.container}>

                <Text
                    style={styles.headerText}>
                    Expenses
                </Text>
                <LineChart activePeriod={activePeriod} currency={currency} ptData={ptData} />

                <View style={styles.periodContainer}>
                    {periods.map((period) => (
                        <TouchableOpacity
                            key={period}
                            style={styles.periodButton}
                            onPress={() => setActivePeriod(period)}
                        >
                            <Text style={[
                                styles.periodText,
                                activePeriod === period && styles.activePeriod,
                            ]}>
                                {period}
                            </Text>
                            {activePeriod === period && <View style={styles.underline} />}
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={[styles.headerText, {fontSize: 24}]}>Transactions</Text>
                <ScrollView style={{flex: 1, width: "100%"}}>
                    {
                        ptData.map(val =>
                            <TransactionCard transaction={{category: val.expense_type, card: val.expense_source, amount: val.value, currency: currency}} />
                        )
                    }
                </ScrollView>


            </SafeAreaView>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignItems: "center",
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },

    periodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
    },
    periodButton: {
        alignItems: 'center',
    },
    periodText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: "Avenir"
    },
    activePeriod: {
        fontWeight: 'bold',
    },
    underline: {
        height: 2,
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginTop: 2,
    },
    headerText: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
        fontFamily: "Avenir-Heavy",
        color: "#fff",
        fontSize: 32,
        paddingBottom: 20,
        paddingTop: 30
    }
})

export default PersonalScreen;
