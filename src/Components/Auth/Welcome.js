import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Touchable, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image'


const Welcome = () => {

    const [activeSlide, setActiveSlide] = useState(0);
    const navigation = useNavigation();
    const features = [
        {
            title: 'Track Your Spending',
            description: 'Keep an eye on your expenses with easy tracking.'
        },
        {
            title: 'Budget Smarter',
            description: 'Set budgets and get alerts to stay on track.'
        },
        {
            title: 'Save For Goals',
            description: 'Set goals and watch your savings grow.'
        },
    ];

    const renderCarouselItem = ({item}) => (
        <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    const paginationComponent = () => {
        return (
            <Pagination
                dotsLength={3}
                activeDotIndex={activeSlide}
                dotStyle={styles.paginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FastImage
                style={{width: "80%", height: "40%"}}
                source={require("../../Assets/welcome_image3.png")}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.container}>
                <Carousel
                    data={features}
                    renderItem={renderCarouselItem}
                    sliderWidth={300}
                    itemWidth={300}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={2000}
                    enableMomentum={false}
                    lockScrollWhileSnapping={true}
                    onSnapToItem={index => setActiveSlide(index)}
                    style={styles.welcomeCarousel}
                />
                {paginationComponent()}
            </View>
            {/* Sign Up and Sign In buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.signinButton} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signinText}> Sign In </Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerQuestion}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('OTPNumber')}>
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: "#EEF5FF"
    },

    imageTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },

    slide: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    title: {
        fontSize: 28,
        marginBottom: 15,
        fontFamily: "Avenir-Heavy"
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "Avenir"
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-around',
        width: '100%',
        padding: 18,
    },
    registerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    signinButton: {
        backgroundColor: "#176B87",
        borderRadius: 20,
        height: 40,
        justifyContent: 'center'
    },

    signinText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontFamily: "Avenir"
    },

    registerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#176B87',
        marginLeft: 5,
        fontFamily: "Avenir"
    },

    registerQuestion: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        fontFamily: "Avenir"
    },

    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
});

export default Welcome;

