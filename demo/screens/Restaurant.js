import React,{useState, useEffect} from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, Animated, Alert } from "react-native"
import { isIphoneX } from 'react-native-iphone-x-helper'
import { icons, COLORS, SIZES, FONTS } from '../constants';
import DatePicker from 'react-native-datepicker';

const Restaurant = ({ route, navigation }) =>{

    const [date, setDate] = useState(null);

    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    useEffect(()=> {
        let {item, currentLocation} = route.params;

        setRestaurant(item)
        setCurrentLocation(currentLocation)
    })

    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }
            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }
            setOrderItems(orderList)
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    //Page Header 
    function renderHeader() {
        return(// Back Button
            <View style = {{ flexDirection: 'row', top:1 }}>
                <TouchableOpacity
                    style = {{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress = { ()=> navigation.goBack() }
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
                {/*Restaurant Name on top of Page*/}
                <View
                    style = {{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style = {{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
                    </View>
                </View>
                {/*Top Right Button of Page*/}
                <TouchableOpacity
                    style = {{
                        width: 50,
                        padding: SIZES.padding,
                        justifyContent: 'center'
                    }}
                >
                    {/*<Image
                        source={icons.list}
                        resizeMode="contain"
                        style = {{
                            width: 30,
                            height: 40,

                        }}
                    > 
                    </Image>*/}

                </TouchableOpacity>
            </View>
        )
    }

    //Food Info
    function renderFoodInfo() {
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) =>(
                        <View
                            key = {`menu-${index}`}
                            style = {{ alignItems:'center' }}
                        >
                            <View style={{ height: SIZES.height * 0.30 }}>
                                {/* Food Image */}
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "100%"
                                    }}
                                />

                                {/* Quantity */}
                                <View
                                    style = {{
                                        position: 'absolute',
                                        bottom: - 20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                    }}
                                >
                                    {/* Minus Button */}
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity>

                                    {/* Quantity Number */}
                                    <View
                                        style = {{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    {/* Plus Button */}
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>+</Text>
                                    </TouchableOpacity>
                    
                                </View>
                            </View>
                            {/*Name & Description*/}
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text 
                                    style = {{
                                        marginVertical: 10,
                                        textAlign: 'center',
                                        ...FONTS.h2
                                    }}
                                >
                                    {item.name} - ฿{item.price.toFixed(2)}
                                </Text>
                                <Text style = {{...FONTS.body3 }}>
                                    {item.description}
                                </Text>
                            </View>

                            {/*Calories*/}
                            <View
                                style = {{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={icons.weight}
                                    style = {{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10,
                                        tintColor: COLORS.primary
                                    }}
                                />

                                <Text 
                                    style = {{ 
                                        ...FONTS.body3, 
                                        color: COLORS.darkgray 
                                    }}
                                >
                                    {item.weight.toFixed(2)} KG.
                                </Text>
                            </View>
                        </View>
                    ))
                }
                
            </Animated.ScrollView>
        )
    }
    //Dot marks on Order 
    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View style={{ height: 30 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}
                >
                    {restaurant?.menu.map((item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: "clamp"
                        })

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, COLORS.pink, COLORS.darkgray],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }
    
    //Pricing Order 
    function renderOrder() {
        return (
            <View>
                {
                    renderDots()
                }
                <View
                    style = {{ //cruve on item cart
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    > 
                        {/* Description */}
                        <Text style = {{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style = {{ ...FONTS.h3 }}>฿{sumOrder()}</Text>
                    </View>
                    
                    {/* Location In Order */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            {/*<Image
                                source = {icons.calender}
                                resizeMode="contain"
                                style = {{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style = {{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Order</Text>*/}
                            </View>

                        <View style = {{ flexDirection: 'row' }}>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={date} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="Select Date"
                                format="DD-MM-YYYY"
                                minDate={new Date()}
                                maxDate="01-01-2025"
                                //confirmBtnText="Confirm"
                                //cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        //display: 'none',
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        borderRadius: 20,
                                    },
                                }}
                                onDateChange={(date) => {
                                    setDate(date);
                                }}
                            />
                        </View>
                    </View>

                    {/* Order Button */}
                    <View
                        style = {{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style = {{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress = {() => 
                                {
                                    if (getBasketItemCount() === 0) {
                                        Alert.alert('Empty QTY','You need to add QTY')
                                    } else if(date === null){
                                        Alert.alert('Empty Date','You need to enter the Date Order.')
                                    } else {
                                        {/*const arr = new Array();
                                        for (const [key , value] of Object.entries(data)) {
                                            arr.push({ title: key, data: value.data });
                                        }*/}
                                        //console.log(orderItems)
                                        navigation.navigate("OrderDelivery", {
                                            restaurant: restaurant,
                                            currentLocation: currentLocation,
                                            dateorder: date,
                                            sumorder: sumOrder(),
                                            orderItems: (orderItems, orderItems)
                                        })
                                    }
                                }
                            }
                        >
                            <Text style = {{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isIphoneX() &&
                    <View
                        style = {{
                            position: 'absolute',
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}
                    >
                    </View>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style = {styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})

export default Restaurant;