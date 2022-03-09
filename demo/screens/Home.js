import React,{useState} from "react";
import { SafeAreaView, View, Text, StyleSheet, Linking, TouchableOpacity, Image, FlatList, Alert } from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Home = ({ navigation }) => {

    const [latitude, setLatitude] = useState(13.737922815103596);
    const [longitude, setLongitude] = useState(100.62836763967373);

    // Dummy Datas
    const initialCurrentLocation = {
        streetName: "TNI",
        gps: {
            latitude: latitude,
            longitude: longitude
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Cloth",
            icon: icons.cloth,
        },
        {
            id: 2,
            name: "Cuisine",
            icon: icons.cuisine,
        },
        {
            id: 3,
            name: "Electronic",
            icon: icons.electronic,
        },
        {
            id: 4,
            name: "Sport",
            icon: icons.sport,
        },
        {
            id: 5,
            name: "Baby",
            icon: icons.baby,
        },
        {
            id: 6,
            name: "Accessory",
            icon: icons.accessory,
        },
        {
            id: 7,
            name: "Tools",
            icon: icons.tools,
        },
        {
            id: 8,
            name: "Toy",
            icon: icons.toy,
        },
        {
            id: 9,
            name: "Cosmetic",
            icon: icons.cosmetic,
        },
        {
            id: 10,
            name: "Stationery",
            icon: icons.stationery,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "Nice Cloth",
            rating: 4.0,
            categories: [1, 4, 5, 6],
            priceRating: affordable,
            photo: images.cloth_a,
            duration: "30 - 45 min",
            location: {
                latitude: 13.737274349214722, 
                longitude: 100.62932328549154
            },
            courier: {
                avatar: images.avatar_1,
                name: "Mia"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Cloth-A-1",
                    photo: images.cloth_a_1,
                    description: "Green, curly hair slightly covers a bony.",
                    weight: 0.01,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Cloth-A-2",
                    photo: images.cloth_a_2,
                    description: "Tense face, Dancing hazel eyes.",
                    weight: 0.01,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Cloth-A-3",
                    photo: images.cloth_a_3,
                    description: "Set concealed within their sockets.",
                    weight: 0.01,
                    price: 8
                }
            ]
        },
        {
            id: 2,
            name: "Good Food",
            rating: 5.0,
            categories: [2],
            priceRating: expensive,
            photo: images.food_a,
            duration: "15 - 20 min",
            location: {
                latitude: 13.736308567361087, 
                longitude: 100.62927850082197
            },
            courier: {
                avatar: images.avatar_2,
                name: "Jack"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Food-A-1",
                    photo: images.food_a_1,
                    description: "This is the face of Alduin Nightgaze.",
                    weight: 0.5,
                    price: 15
                },
                {
                    menuId: 5,
                    name: "Food-A-2",
                    photo: images.food_a_2,
                    description: "Fallen debry left a mark.",
                    weight: 0.2,
                    price: 20
                },
                {
                    menuId: 6,
                    name: "Food-A-3",
                    photo: images.food_a_3,
                    description: "Green, curly hair slightly covers a bony.",
                    weight: 0.3,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Food-A-4",
                    photo: images.food_a_4,
                    description: "Tense face. Dancing hazel eyes.",
                    weight: 1,
                    price: 10
                }
            ]
        },
        {
            id: 3,
            name: "Electronic Tools",
            rating: 4.2,
            categories: [3,7],
            priceRating: expensive,
            photo: images.tool_a,
            duration: "20 - 25 min",
            location: {
                latitude: 13.737439662814872, 
                longitude: 100.62530162207332
            },
            courier: {
                avatar: images.avatar_3,
                name: "John"
            },
            menu: [
                {
                    menuId: 8,
                    name: "Tool-A-1",
                    photo: images.tool_a_1,
                    description: "Combinations found in real life.",
                    weight: 5,
                    price: 20
                },
                {
                    menuId: 9,
                    name: "Tool-A-2",
                    photo: images.tool_a_2,
                    description: "Realistic combinations to give interesting.",
                    weight: 2,
                    price: 20
                },
                {
                    menuId: 10,
                    name: "Electronic-A-1",
                    photo: images.electronic_a_1,
                    description: "Anime produces unusual hair.",
                    weight: 4,
                    price: 20
                },
                {
                    menuId: 11,
                    name: "Electronic-A-2",
                    photo: images.electronic_a_2,
                    description: "Simple or Detailed for basic or more.",
                    weight: 6,
                    price: 20
                }
            ]
        },
        {
            id: 4,
            name: "NBA Shop",
            rating: 4.8,
            categories: [4],
            priceRating: expensive,
            photo: images.sport_a,
            duration: "10 - 15 min",
            location: {
                latitude: 13.73656958985106, 
                longitude: 100.61994537544595
            },
            courier: {
                avatar: images.avatar_4,
                name: "Lucas"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Basketball-A-1",
                    photo: images.sport_a_1,
                    description: "The Selections Only/RANDOMISE option.",
                    weight: 0.3,
                    price: 50
                }
            ]
        },
        {
            id: 5,
            name: "Baby Toy",
            rating: 4.8,
            categories: [5, 8],
            priceRating: affordable,
            photo: images.toy_a,
            duration: "15 - 20 min",
            location: {
                latitude: 13.735616867220411, 
                longitude: 100.63148680106939
            },
            courier: {
                avatar: images.avatar_4,
                name: "Benjamin"
            },
            menu: [
                {
                    menuId: 13,
                    name: "Toy-A-1",
                    photo: images.toy_a_1,
                    description: "Randomly select optional features",
                    weight: 0.5,
                    price: 5
                },
                {
                    menuId: 14,
                    name: "Toy-A-2",
                    photo: images.toy_a_2,
                    description: "Exotic will mix-and-match the Realistic.",
                    weight: 0.2,
                    price: 5
                },
            ]
        },
        {

            id: 6,
            name: "Stationery Shop",
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
            photo: images.stationery_a,
            duration: "35 - 40 min",
            location: {
                latitude: 13.731605772806734, 
                longitude: 100.62699042014634
            },
            courier: {
                avatar: images.avatar_1,
                name: "Ellie"
            },
            menu: [
                {
                    menuId: 15,
                    name: "Stationery-A-1",
                    photo: images.stationery_a_1,
                    description: "More inclusive results respectively.",
                    weight: 0.2,
                    price: 2
                },
                {
                    menuId: 16,
                    name: "Stationery-A-2",
                    photo: images.stationery_a_2,
                    description: "Randomly select optional features",
                    weight: 0.02,
                    price: 3
                },
            ]

        }


    ]

    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [restaurants, setRestaurants] = useState(restaurantData)
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)


    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }
    //Page Header
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 ,top:10}}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => Alert.alert('- Current Location -','Address : 1771/1 Pattanakarn Road, \n                   Suan Luang, Bangkok 10250' +'\nLatitude    : '+ latitude + '\nLongitude : '+ longitude)}
                >
                    <Image
                        source={icons.location}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ 
                            ...FONTS.h3,
                            color: COLORS.white
                        }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={()=> Linking.openURL('https://www.tni.ac.th/home/')}
                >
                    <Image
                        source={icons.tni}
                        resizeMode="contain"
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    //Category Menu
    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                > 
                    {/*circle in category icon menu*/}
                    <View 
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>
                    {/*text under circle in category icon menu*/}
                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }
        
        //Main Categories
        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}></Text>
                <Text style={{ ...FONTS.h1 }}>Group : TD</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    //Restaurant List
    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurant", {
                    item,
                    currentLocation
                })}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={item.photo}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />
                    {/*Duration Time Box*/}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Star Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.pink,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.pink : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
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

export default Home;