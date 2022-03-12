import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"

import { Restaurant, OrderDelivery, FirstPage, SignIn } from './screens'

import Tabs from './navigation/tabs'

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={"Home"}
            >
                <Stack.Screen name="FirstPage" component={FirstPage} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="Main" component={Tabs} />
                <Stack.Screen name="Restaurant" component={Restaurant} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
