import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';
import ConfirmRegistration from './ConfirmRegistration';



const OTPVerification = ({route}) => {
    const {phoneNumber, countryCode} = route.params;
    const [isValidNumber, setIsValidNumber] = useState(false);
    const [timer, setTimer] = useState(30);
    const [showResend, setShowResend] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [otp, setOtp] = useState(['', '', '', '']);
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();

    const navigation = useNavigation();

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        } else {
            setShowResend(true);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleResendCode = () => {
        // Logic to resend code
        setTimer(30);
        setShowResend(false);
    };

    const handleContinue = () => {
        setModalVisible(true);
    };
    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Focus next input on digit enter
        if (text && index < 3) {
            const nextInput = [secondInput, thirdInput, fourthInput][index];
            nextInput.current.focus();
        }
    };

    return (
        <SafeAreaView style={[styles.safeContainer, {opacity: modalVisible ? 0.15 : 1}]}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="angle-left" size={30} color="#176B87" />
                </TouchableOpacity>
                <Text style={styles.header}>Step 2/3</Text>
                <FastImage
                    style={{width: 300, height: 300}}
                    source={require("../../Assets/phone-verification.png")}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.subtitle}>Enter 4 digit OTP sent to: </Text>
                <Text style={styles.subtitle}>{countryCode} {phoneNumber}</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={styles.otpInput}
                                value={digit}
                                onChangeText={(text) => handleOtpChange(text, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={index === 1 ? secondInput : index === 2 ? thirdInput : index === 3 ? fourthInput : null}
                            />
                        ))}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.resendContainer}>
                    {!showResend ? (
                        <Text style={styles.timerText}>Re-send code in 0:{timer < 10 ? `0${timer}` : timer}</Text>
                    ) : (
                        <TouchableOpacity onPress={handleResendCode} style={styles.resendButton}>
                            <Text style={styles.resendText}>Re-send code</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ConfirmRegistration show={modalVisible} setShow={setModalVisible} />
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        width: "100%"
    },
    otpInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#999999',
        width: 40,
        fontSize: 24,
        textAlign: 'center',
        margin: 10
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
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 10,
        left: 10,
        zIndex: 10,
    },
    resendContainer: {
        padding: 20
    },
    timerText: {
        fontSize: 16,
        fontFamily: "Avenir-Light",
    },
    resendButton: {
        fontSize: 16,
        fontFamily: "Avenir-Light",
    },
    resendText: {
        fontSize: 16,
        fontFamily: "Avenir-Light",
        textDecorationLine: 'underline'
    },

});

export default OTPVerification;
