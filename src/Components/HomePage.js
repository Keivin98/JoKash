// HomePage.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Platform, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Import your screen components
import PersonalScreen from './PersonalScreen';
import BusinessScreen from './BusinessScreen';
import ChatScreen from './ChatScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();


const CustomTabBar = ({state, descriptors, navigation}) => {

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.floatingContainer, {bottom: insets.bottom - 20}]}>
            <View style={[styles.floatingTab, {marginBottom: insets.bottom}]}>
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    // Determine the icon based on the route name
                    let iconName;
                    if (route.name === 'Personal') {
                        iconName = isFocused ? 'user' : 'user-o';
                    } else if (route.name === 'Business') {
                        iconName = isFocused ? 'briefcase' : 'briefcase';
                    } else if (route.name === 'Chat') {
                        iconName = isFocused ? 'comments' : 'comments-o';
                    } else if (route.name === 'Profile') {
                        iconName = isFocused ? 'user-circle' : 'user-circle-o';
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{flex: 1, alignItems: 'center', paddingVertical: 10}}
                        >
                            <Icon name={iconName} size={20} color={isFocused ? '#673fff' : '#888'} />
                            <Text style={{color: isFocused ? '#673fff' : '#888', fontFamily: "Avenir-Medium"}} />
                            <Text style={{color: isFocused ? '#673fff' : '#888', fontFamily: isFocused ? 'Avenir-Heavy' : "Avenir-Medium"}}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })
                }
            </View></View>
    );
}


const FloatingTabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name="Personal" component={PersonalScreen} options={{headerShown: false}} />
            <Tab.Screen name="Business" component={BusinessScreen} options={{headerShown: false}} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{headerShown: false}} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
        </Tab.Navigator>
    );
};

styles = StyleSheet.create({
    floatingContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        elevation: 20,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    floatingTab: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
export default FloatingTabNavigator;