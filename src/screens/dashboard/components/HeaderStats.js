import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';


const Header = (props) => {

function toggleMenu(){

}
    return (
        <View style={[styles.header_wrapper, {backgroundColor: '#f2f2f2'}]}>
            <Pressable onPress={props.goback}>
               <Image source={require('../../../assets/images/leftarrow.png')} style={styles.header_icon_back} resizeMode='contain'/>
            </Pressable>
            <Icon
                raised
                name='qr-code'
                type='materialicons'
                color={Colors.neutral}
                size={20}
                onPress={() => props.setFirstlscan()} 
                style={styles.header_menu}
                />
        </View>
    );
};


export default Header;
