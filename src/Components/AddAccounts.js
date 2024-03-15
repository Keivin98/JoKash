import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const AddAccounts = () => {
    const [showCardDetail, setShowCardDetail] = useState(false);
    const [showCashDetail, setShowCashDetail] = useState(false);

    const DetailModal = ({visible, onClose, children}) => (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {children}
                    <Icon name="times" size={24} color={"#000"} onPress={onClose} style={styles.modalCloseIcon} />
                </View>
            </View>
        </Modal>
    );
    return (
        <LinearGradient
            colors={['#58077E', "#080689", '#6F1A8E']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}
        >
            <View style={styles.container}>

                {/* Credit Card Card */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => setShowCardDetail(true)}
                >
                    <Icon name="credit-card-alt" size={30} color="#fff" />
                    <Text style={styles.cardText}>Credit Card</Text>
                </TouchableOpacity>

                {/* Cash Card */}
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => setShowCashDetail(true)}
                >
                    <Icon name="money" size={30} color="#fff" />
                    <Text style={styles.cardText}>Cash</Text>
                </TouchableOpacity>

                {/* Credit Card Detail Modal */}
                <DetailModal visible={showCardDetail} onClose={() => setShowCardDetail(false)}>
                    <Text style={styles.modalTitle}>Add Credit Card</Text>
                    {/* Add inputs and buttons here */}
                </DetailModal>

                {/* Cash Detail Modal */}
                <DetailModal visible={showCashDetail} onClose={() => setShowCashDetail(false)}>
                    <Text style={styles.modalTitle}>Add Cash</Text>
                    {/* Add inputs and buttons here */}
                </DetailModal>

            </View></LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    card: {
        elevation: 3,
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        width: "80%",
        height: "15%",
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: "space-around",
        alignItems: "center"
        // Rest of your styling
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalCloseIcon: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    cardText: {
        color: "#fff",
        fontFamily: "Avenir-Heavy",
        fontSize: 20
    }
    // ... other styles
});

export default AddAccounts;
