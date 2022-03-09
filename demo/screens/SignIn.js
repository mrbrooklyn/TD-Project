import React,{useState, useEffect} from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { icons, SIZES, COLORS, FONTS } from '../constants';
import { InputForm } from './components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import Utils from './components/Utils';
import { auth } from '../database/firebaseDB';
import { signInWithEmailAndPassword } from 'firebase/auth'; 

const SignIn = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [showPass, setShowPass] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.replace('Main')
            }
        })
        return unsubscribe
    })
    {/*
    const authenLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with: ', user.email)
            })
            .catch(error => alert("Error"))
    } */}


    const login = async () => {
        try {
            //console.log(email, " Logged In")
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error) {
            console.log("Error");
            Alert.alert('Something is wrong...', 'Incorrect Email or Password');
        }
    };
    
    function isEnableSignIn() {
        return email != "" && password != "" && emailError == ""
    }

    return (
        <View 
            style={{
                flex: 1,
                paddingVertical: SIZES.padding,
                backgroundColor: COLORS.white,
            }}
        >
            <KeyboardAwareScrollView
                keyboardDismissMode = "on-drag"
                contentContainerStyle = {{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source = {icons.tni}
                        resizeMode = "contain"
                        style = {{
                            height: 100,
                            width: 200,
                            marginTop: 40
                        }}
                    />
                </View>
                <View
                    style = { styles.textbox }
                >
                    <Text
                        style = {{
                            fontWeight: 'bold',
                            ...FONTS.h1
                        }}
                    >
                        Welcome Back
                    </Text>
                    <Text
                        style = {{
                            color: COLORS.darkgray,
                            marginTop: SIZES.base,
                            ...FONTS.body3
                        }}
                    >
                        Sign-In to continue
                    </Text>
                </View>
                {/* Username Box */}
                <View
                    style = {{
                        flex: 1,
                        marginTop: SIZES.padding * 2,
                        width: "90%", 
                        alignSelf: 'center'
                    }}
                >
                    {/* Input Email */}
                    <InputForm
                        label = "Email"
                        keyboardType = "email-address"
                        autoCompleteType = "email"
                        onChange = {(value) => {
                            Utils.validEmail(value, setEmailError)
                            setEmail(value)
                        }}
                        errorMsg = {emailError}
                        appendComponent = {
                            <View
                                style = {{
                                    justifyContent: 'center'
                                }}
                            >
                                <Image
                                    source={email == "" || (email != "" && emailError == "") 
                                    ? icons.correct
                                    : icons.cancel}
                                    style = {{
                                        height: 20,
                                        width: 20,
                                        tintColor: email == "" 
                                        ? COLORS.darkgray : (email != "" && emailError == "")
                                        ? COLORS.green
                                        : COLORS.pink,
                                    }}
                                />

                            </View>
                        }
                    />
                    {/* Input Password */}
                    <InputForm
                        label = "Password"
                        secureTextEntry = {!showPass}
                        autoCompleteType = "Password"
                        containerStyle = {{
                            marginTop: SIZES.radius
                        }}
                        onChange={(value) => setPassword(value)}
                        appendComponent={
                            <TouchableOpacity
                                style = {{
                                    width: 40,
                                    alignItems: 'flex-end',
                                    alignSelf: 'center'
                                }}
                                onPress={() => setShowPass(!showPass)}
                            >
                                <Image
                                    source = {showPass ? icons.visibility : icons.invisibility}
                                    style = {{
                                        height: 30,
                                        width: 30,
                                        tintColor: COLORS.darkgray
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    />

                    <View style = {{flex:1}}>
                        <TouchableOpacity
                                    style = {isEnableSignIn() ? styles.button : styles.disablebutton}
                                    disabled = {isEnableSignIn() ? false : true}
                                    onPress={login}
                                >
                                    <Text style={{ ...FONTS.h4, color: COLORS.white }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Description */}
                    <View
                        style = {{
                            width: "150%",
                            position: 'relative',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.lightGray3,
                            height: 60,
                            bottom: 0,
                            marginTop: SIZES.padding
                        }}
                    >
                        <Text>If you are not an existing user of this application,</Text>
                        <Text>please contact your administrator for a register.</Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textbox: {
        marginTop: SIZES.largeTitle,
        alignItems: 'center',
    },
    button: {
        width: "100%", 
        height: 50,
        backgroundColor: COLORS.primary,      
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        bottom: 0,
        position: 'absolute'
    },
    disablebutton: {
        width: "100%", 
        height: 50,
        backgroundColor: "#a6c8ed",      
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        bottom: 0,
        position: 'absolute'
    },
})

export default SignIn
