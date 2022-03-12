import React,{useState} from 'react'
import { StyleSheet, TouchableOpacity, TextInput, View, Image } from 'react-native'
import { icons, SIZES, COLORS } from '../constants'

const Search = () => {

    const [text, onChangeText] = useState("")

    return (
        <View style = {{backgroundColor: COLORS.white, flex:1}}>
            <View 
                style={{
                    backgroundColor: COLORS.white, 
                    flexDirection:'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 50
                }}>
                <View>
                    <TextInput
                        style = {styles.input}
                        onChangeText = {onChangeText}
                        value = {text}
                        placeholder = "  Search Now..."
                    />
                </View>
                <View style={{
                }}>
                    <TouchableOpacity 
                        style={styles.button}
                        //onPress = { () => this.props.navigation.navigate('Details')}
                        > 
                        <Image
                            source={icons.search}
                            resizeMode='contain' 
                            style={{flex:2 ,tintColor: COLORS.white, width: "80%"}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 300,
        backgroundColor: COLORS.white,
    },
    input: {
        width: 250,
        height: 50,
        padding: 10,
        borderRadius: 3,
        shadowColor: COLORS.darkgray,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            height: 20,
            width: 20,
        },
        elevation: 2,
        borderTopLeftRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
   },
    button: { 
        width:50,
        height: 50,
        padding: 10,
        borderRadius: 3,
        borderTopRightRadius: SIZES.radius,
        borderBottomRightRadius: SIZES.radius,
        justifyContent: 'center', 
        alignItems:'center',
        backgroundColor: COLORS.primary,
   }
});

export default Search
