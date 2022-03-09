import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { SIZES, COLORS, FONTS } from '../../constants'

const InputForm = ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependConponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    errorMsg = ""
}) => {
    return (
        <View style = {{ ...containerStyle }}>
            {/* Sub Text */}
            <View
                style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style = {{ color: COLORS.darkgray, ...FONTS.body4 }}
                >
                    {label}
                </Text>
                <Text
                    style = {{ color: COLORS.pink, ...FONTS.body4 }}
                >
                    {errorMsg}
                </Text>
            </View>

            {/* Input Box */}
            <View
                style = {{
                    flexDirection: 'row',
                    height: 55,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >

                {prependConponent}

                <TextInput
                    style = {{
                        flex: 1,
                        ...inputStyle
                    }}
                    placeholder = {placeholder}
                    placeholderTextColor = {COLORS.lightGray}
                    secureTextEntry = {secureTextEntry}
                    keyboardType = {keyboardType}
                    autoCompleteType = {autoCompleteType}
                    autoCapitalize = {autoCapitalize}
                    onChangeText={(text) => onChange(text)}
                />

                {appendComponent}

            </View>
        </View>
    )
}

export default InputForm
