import React from 'react'
import { View, Image,TouchableOpacity } from 'react-native'

import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import Svg, { Path } from 'react-native-svg';

import {Home,History,Search,Profile} from "../screens";

import { COLORS, icons } from "../constants"

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected

    if (isSelected) { //when menu is selected
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    {/*a Curve under Circle Bottom Bar*/}
                    <Svg
                        width={70}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>
                {/*Circle Bottom Bar*/}
                <TouchableOpacity
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white,
                        borderColor : COLORS.primary,
                        borderWidth : 2
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else { //when menu is not selected 
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}
{/*Footer*/}
const CustomTabBar = (props)=> {
    return(
         <View>
            <View
                style = {{
                    position : 'absolute',
                    bottom : 0,
                    left : 0,
                    right : 0,
                    height : 30,
                    backgroudColor: COLORS.white
                }}
            >
            </View>
            <BottomTabBar  {...props.props}/>
        </View>
    )
}


const tabs = ()=> {
    return(
        <Tab.Navigator
            style = {{bottom: 20}}
            
            tabBarOptions={{
                showLabel: false,
                style: {
                    borderTopWidth: 0,
                    backgroudColor: "transparent",
                    elevation: 0,
                }
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen
                name = "Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.box}
                            resizeMode = "contain"
                            style = {{
                                width: 30,
                                height: 30,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),
                    headerShown: false
                }}
            />

            {/*<Tab.Screen
                name = "Search"
                component={Search}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.search}
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),
                    headerShown: false
                }}
            />*/}

            <Tab.Screen
                name = "History"
                component={History}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.basket}
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name = "User"
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={icons.user}
                            resizeMode = "contain"
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    ),
                    headerShown: false
                }}
            />

        </Tab.Navigator>
    )
}

export default tabs
