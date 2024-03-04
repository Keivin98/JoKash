import {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';


const ConfirmRegistration = ({show, setShow}) => {
    return (
        <View style={styles.container}>
            {/* ... other components ... */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={show}
                style={styles.container}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={require("../../Assets/confirm-registration.png")}
                            style={styles.modalImage}
                        />
                        <Text style={styles.modalTitle}>Congratulations</Text>
                        <Text style={styles.modalText}>Now you are registered</Text>
                        <Text style={styles.modalSubtitle}>Start saving with JoKash</Text>
                        <TouchableOpacity
                            style={styles.startNowButton}
                            onPress={() => {
                                // Handle "Start Now" action
                                setShow(!show);
                            }}
                        >
                            <Text style={styles.startNowButtonText}>Start Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* ... other components ... */}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEF5FF',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#EEF5FF",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%"
    },
    modalImage: {
        marginBottom: 15,
        height: 200, // Set image size according to your asset
        width: 200,  // Set image size according to your asset
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 14,
        color: "#176B87",
        fontFamily: "Avenir-BlackOblique"
    },
    modalText: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Avenir-Heavy"

    },
    modalSubtitle: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 16,
        color: "#555",
        fontFamily: "Avenir-Light"
    },
    startNowButton: {
        backgroundColor: "#176B87",
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    startNowButtonText: {
        color: "white",
        fontFamily: 'Avenir-Light',
        fontSize: 16,
        textAlign: "center",
        padding: 10
    },
    // ... other styles ...
});


export default ConfirmRegistration;
