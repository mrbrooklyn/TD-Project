import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { icons, SIZES, COLORS, FONTS, images } from '../constants'

const FirstPage = ({navigation}) => {

    function renderHeaderLogo() {
        return (
            <View
                style = {{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                }}
            >
                <Image
                    source={icons.tni}
                    resizeMode = 'contain'
                    style={{
                        width: SIZES.width * 0.5,
                        height: 100,
                    }}
                />
            </View>
        )
    }

    function renderDetail() {
        return (
            <View style = {{ alignItems: 'center', marginTop: 150,  }}>
                <Text style={{
                    fontWeight: "bold", 
                    ...FONTS.h2, 
                    color: COLORS.primary,
                    textShadowColor: COLORS.lightGray2,
                    textShadowRadius:20,
                }}>
                    TD Project
                </Text>
                <Text style={{fontWeight: "bold", ...FONTS.body2, color: COLORS.lightGray}}>for ITE-439</Text>
                <Text style={{...FONTS.body2, color: COLORS.lightGray}}>( Mobile Device Application Development )</Text>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style = {{flex:1}}>
                <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.replace('SignIn')}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Click to Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }
    
    return (
        <View style = {{flex:1}}>
            <ImageBackground 
                source = {images.bg01} 
                resizeMode = "cover"
                style = {{
                    flex: 1,
                }}
            >
                {renderHeaderLogo()}
                {renderDetail()}
                {renderButton()}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "110%", 
        height: 60,
        backgroundColor: COLORS.primary,      
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        bottom: 0,
        position: 'absolute'
    },
})

export default FirstPage


