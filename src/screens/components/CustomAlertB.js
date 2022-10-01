import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';

const {width, height} = Dimensions.get('window');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const CustomAlert = (props) => {
    return (
        (props.show)?
        <View style={[styles.alert_container, (props.type == 'error')? {backgroundColor:Colors.red}:{backgroundColor:Colors.green}]}>
            <Text style={styles.alert_text }>{props.message}</Text>
            <View style={[styles.button_wrapper, (props.type == 'error')? {backgroundColor:Colors.darkred}:{backgroundColor:Colors.darkgreen}]}>
                <TouchableOpacity onPress={()=> props.onConfirmPressed()}>
                    <Text style={styles.button_btn}>{props.buttonTitle}</Text>
                </TouchableOpacity>
            </View>
        </View>
        :null
    );
};


const styles = StyleSheet.create({
    alert_container: {
       width: '100%',
       top: Platform.OS == 'ios'? 0: 0,
       position: 'absolute',
       minHeight: 100,
       backgroundColor: Colors.red,
       zIndex: 100,
       paddingTop: Platform.OS =='ios'?STATUSBAR_HEIGHT+70: STATUSBAR_HEIGHT+20,
       alignItems: 'center',
    },
    alert_text:{
        color: Colors.white,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        maxWidth: '80%',
    },
    button_wrapper:{
        width: '90%',
        paddingVertical: 10,
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 15,
    },
    button_btn:{
        color: Colors.white,
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500',
        fontFamily: 'Faktum-Regular',
    }
});


export default CustomAlert;
