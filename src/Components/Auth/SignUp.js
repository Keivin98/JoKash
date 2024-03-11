import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image'
import {CountryPicker} from "react-native-country-codes-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import {parsePhoneNumber, ParseError} from 'libphonenumber-js';
import {useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';
import auth from '@react-native-firebase/auth';


const OTPNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('+974');
    const [country, setCountry] = useState('QA');
    const [countryShow, setCountryShow] = useState(false);
    const [isValidNumber, setIsValidNumber] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const shakeAnimation = new Animated.Value(0);

    const navigation = useNavigation();


    const handlePhoneInput = (text) => {
        setPhoneNumber(text);
        console.log("text", text)
        try {
            const phoneNumberParsed = parsePhoneNumber(text, country);
            console.log("phoneNumberParsed", phoneNumberParsed)
            setIsValidNumber(phoneNumberParsed ? phoneNumberParsed.isValid() : false);
        } catch (error) {
            setIsValidNumber(false);
        }
    };
    handleSendCode = (phoneNumber, countryCode) => {
        // Request to send OTP
        auth()
            .signInWithPhoneNumber(countryCode + phoneNumber)
            .then(confirmResult => {
                setConfirmationResult(confirmResult);
            })
            .catch(error => {
                alert(error.message)
                console.log(error)
            })
    }
    const handleContinue = () => {
        if (!isValidNumber) {
            Animated.sequence([
                Animated.timing(shakeAnimation, {toValue: 10, duration: 100, useNativeDriver: true}),
                Animated.timing(shakeAnimation, {toValue: -10, duration: 100, useNativeDriver: true}),
                Animated.timing(shakeAnimation, {toValue: 10, duration: 100, useNativeDriver: true}),
                Animated.timing(shakeAnimation, {toValue: 0, duration: 100, useNativeDriver: true})
            ]).start();
        } else {
            handleSendCode(phoneNumber, countryCode);
            navigation.navigate('OTPSignUp', {phoneNumber, countryCode, confirmationResult, name, email});
        }
    };

    const onSelectCountry = (country) => {
        setCountryCode(country.dial_code);
        setCountry(country.code);
        setCountryShow(false);
    };


    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="angle-left" size={30} color="#176B87" />
                </TouchableOpacity>
                <Text style={styles.header}>Step 1/3</Text>
                <FastImage
                    style={{width: 200, height: 200, alignSelf: 'center'}}
                    source={require("../../Assets/phone_otp.png")}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.title}>Registration</Text>
                <Text style={styles.subtitle}>Enter your information,{'\n'}
                    we will send you OTP to verify later</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.numberContainer}>
                        <TextInput
                            style={[styles.input]}
                            onChangeText={setName}
                            value={name}
                            placeholder="Full Name"
                        />
                    </View>
                    <View style={styles.numberContainer}>
                        <TextInput
                            style={[styles.input]}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Email"
                        />
                    </View>
                    <View style={styles.numberContainer}>
                        <TouchableOpacity
                            onPress={() => setCountryShow(true)}
                            style={{
                                width: 80,
                                padding: 10,
                                flexDirection: 'row'
                            }}
                        >
                            {country ? <Text style={styles.country}>({country}) </Text> : null}
                            <Text style={styles.country}>{countryCode}</Text>
                        </TouchableOpacity>

                        <CountryPicker
                            pickerButtonOnPress={onSelectCountry}
                            show={countryShow}
                            style={{
                                modal: {
                                    height: 500,
                                },
                            }}
                        />

                        <TextInput
                            style={[styles.input, {flex: 1}]}
                            onChangeText={handlePhoneInput}
                            value={phoneNumber}
                            keyboardType="phone-pad"
                            placeholder="Enter your mobile number"
                        />
                        {phoneNumber.length > 0 && (
                            <Animated.View style={{transform: [{translateX: shakeAnimation}]}}>
                                <Icon name={isValidNumber ? "check-circle" : "times-circle"} size={24} color={isValidNumber ? "green" : "red"} />
                            </Animated.View>
                        )}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleContinue}
                        disabled={name === "" || email == ""}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#EEF5FF',
        height: "70%",
    },
    container: {
        backgroundColor: '#EEF5FF',
        alignItems: 'center',
        paddingHorizontal: "5%",
    },
    header: {
        alignSelf: 'center',
        marginVertical: 10,
        fontSize: 16,
        fontFamily: "Avenir-Heavy",
        color: "#176B87"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: "Avenir-Heavy",
        marginVertical: 10,
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginBottom: 20,
        fontFamily: "Avenir-Light",
    },
    input: {
        width: '100%',
        padding: 15,
        fontSize: 14,
        fontFamily: "Avenir-Light",
        borderRadius: 8,
        backgroundColor: '#fafeff',
    },
    country: {
        fontSize: 14,
        fontFamily: "Avenir-Light",
    },
    inputContainer: {
        backgroundColor: '#fafeff',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    numberContainer: {
        flexDirection: 'row',
        backgroundColor: '#fafeff',
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 8,
        marginVertical: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#176B87',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Avenir-Light",
        fontWeight: 'bold',
    },
    countryCode: {
        marginRight: 5,
        fontSize: 16,
        color: '#333',
    },
    backButton: {
        position: 'absolute',
        top: 5,
        left: 20,
        zIndex: 10,
    },
});

export default OTPNumber;
