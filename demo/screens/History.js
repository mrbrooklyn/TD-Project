import React, { useState,useCallback } from 'react'
import { StyleSheet, Text, Alert, View, SafeAreaView, TouchableOpacity, Image, RefreshControl, ScrollView, ImageBackground } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore/lite'
import { db } from "../database/firebaseDB";
import { useFocusEffect } from '@react-navigation/native';

const History = () => {

    const [refreshing, setRefreshing] = useState(false);

    const _onRefresh = ()=>{
        getData();
    };

    const [orderList, setOrderList] = useState()
    const [focus, setFocus] = useState(false);

    useFocusEffect(
        //useCallback เอาไว้ optimize เพื่อไม่ให้ re-render ของ child component
        useCallback(()=>{
          getData();
        },[focus])
    )

    const getData = async () => {
        setRefreshing(true);

        const orderCol = collection(db, 'orderlist');
        const orderDoc = await getDocs(orderCol);
        const order = orderDoc.docs.map(doc => doc.data());
        //console.log(order);
        setOrderList(order)
        //console.log("Test Data : ", orderDoc.data);

        setRefreshing(false);
    }

    function renderHistory(navigation) {
        return (
            <FlatList
                data={orderList}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item,index)=> item.shopID}
                renderItem={({item})=> (
                    
                    <TouchableOpacity
                        style={{ marginBottom: SIZES.padding * 2}}
                    >
                        <View style={{ 
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.black,
                            marginLeft: 20,
                            marginRight: 20,
                            padding: SIZES.padding * 2,
                            borderRadius: 20, 
                            opacity: 0.8
                        }}>
                            {/*<Button title='test' onPress={()=> console.log("Test Data : ", orderList)}/>*/}
                            <TouchableOpacity
                                style = {{
                                    padding: SIZES.padding,
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    right: 12,
                                    top: 12
                                }}
                                onPress={()=>
                                    Alert.alert(
                                        "DELETE this Order?",
                                        "Are you sure you want to CANCEL this order?",
                                        [
                                          {
                                              text: "Yes",
                                              onPress: ()=>{

                                                deleteDoc(doc(db, "orderlist", item.orderID));
                                                setTimeout(() => {
                                                    setFocus(true)
                                                }, 1000)
                                                setFocus(false)

                                              },
                                          },
                                          {
                                            text: "No",
                                          },
                                        ]
                                    )
                                }
                            >
                                <Image
                                    source={icons.trash}
                                    resizeMode="contain"
                                    style = {{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.pink
                                    }}
                                />
                            </TouchableOpacity>

                            <Text style={{ 
                                ...FONTS.h1,
                                fontWeight: 'bold',
                                color: COLORS.lightGray2,
                                marginBottom: 20,
                            }}>
                                {item.orderID}
                            </Text>
                            {/* Info */}

                            <View>
                                <Text style={{ ...FONTS.body2, color: COLORS.lightGray2, }}>Shop ID - {item.shopID} : {item.shopName}</Text>
                            </View>

                            <View
                                style={{
                                    marginTop: SIZES.padding,
                                    flexDirection: 'row'
                                }}
                            >
                                {/* Price */}
                                <Image
                                    source={icons.calender}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        tintColor: COLORS.white,
                                        marginRight: 10
                                    }}
                                />
                                <Text style={{ ...FONTS.body3, color: COLORS.lightGray2, }}>Delivery Date : {item.orderDate}</Text>

                                {/* Categories */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginLeft: 20
                                    }}
                                >
                                    <Text style={{ ...FONTS.body3, color: COLORS.lightGray2, }}>Total : {item.orderSum} ฿</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                
                contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground 
                source = {images.bg02} 
                resizeMode = "cover"
                style = {{
                    flex: 1,
                }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl = {
                        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh}/>
                    }
                >
                        {renderHistory()}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default History;