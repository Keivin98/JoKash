import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from "./Auth/Welcome"
import OTPNumber from './Auth/OTPNumber';
import OTPVerification from './Auth/OTPVerification';
import SignIn from "./Auth/SignIn"

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="OTPNumber"
                    component={OTPNumber}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="OTPVerification"
                    component={OTPVerification}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{headerShown: false}}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;