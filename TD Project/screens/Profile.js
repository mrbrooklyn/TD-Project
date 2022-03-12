import React,{useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import { auth } from '../database/firebaseDB';
import { signOut } from 'firebase/auth'; 

const Profile = ({navigation}) => {

    const logout = async () => {
        console.log("Logout. . .");
        await signOut(auth);
    }

    const showConfirmDialog = () => {
        return Alert.alert(
          "Logging Out?",
          "Are you sure you want to logout from this application?",
          [
            // The "Yes" button
            {
                text: "Yes",
                onPress: () => {
                logout();
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(!user) {
                navigation.replace('SignIn')
            }
        })
        return unsubscribe
    })

    return (
        <View style = {styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 100}}>
                    <View
                        style={{
                            width: 300,
                            height: 50,
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ 
                            ...FONTS.h2,
                            color: COLORS.white
                        }}>User</Text>
                    </View>
            </View>
 
            <View 
                style={{ flexDirection: 'row' }}>
                <Image
                    source={icons.user2}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary
                    }}
                />
                <Text style={{...FONTS.body2, marginLeft: 10, color: COLORS.darkgray}}>{auth?.currentUser.email}</Text>
            </View>

            <View style = {{flex:1}}>
                        <TouchableOpacity
                                    style = {styles.button}
                                    onPress={showConfirmDialog}
                                >
                                    <Text style={{ ...FONTS.h4, color: COLORS.white }}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white, 
        flex:1, 
        alignItems: 'center', 
    },
    button: {
        width: "85%", 
        height: 50,
        backgroundColor: COLORS.pink,      
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        bottom: 50,
        position: 'absolute'
    },
})

export default Profile


