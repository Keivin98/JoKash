import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from "./Auth/Welcome"
import SignIn from "./Auth/SignIn"
import SignUp from "./Auth/SignUp"

import OTPSignUp from './Auth/OTPSignUp';
import OTPSignIn from './Auth/OTPSignIn';




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
                    name="SignIn"
                    component={SignIn}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="OTPSignUp"
                    component={OTPSignUp}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="OTPSignIn"
                    component={OTPSignIn}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{headerShown: false}}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;