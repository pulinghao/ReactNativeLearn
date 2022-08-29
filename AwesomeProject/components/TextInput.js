import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

const Input = () => (
    <View style={styles.inputContainer}>
        <TextInput style={styles.input} 
        placeholder='What needs to be done' 
        placeholderTextColor='#CACACA'
        selectionColor='#666666'>

        </TextInput>
    </View>
)

const styles = StyleSheet.create({
    inputContainer:{
        marginLeft : 20,
        marginRight: 20,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: 3,
        shadowOffset: {width: 2, height:2}
    },

    input:{
        height: 60,
        backgroundColor: '#ffffff',
        paddingLeft:10,
        paddingRight:10
    }
})

export default Input