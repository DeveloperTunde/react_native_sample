import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';


const Header = (props) => {

function toggleMenu(){

}
    return (
        <View style={styles.header_wrapper_inner}>
            <View style={styles.header_wrapper_left2}>
                {
                    (props.isBackArrow) && 
                    <Pressable style={styles.modal_header_left} onPress={()=>props.navigation.goBack()}>
                        <Image source={require('../../../assets/images/leftarrow.png')} style={styles.modal_header_left_img} resizeMode='contain'/>
                    </Pressable>
                }
            </View>
            <View style={styles.header_wrapper_right}>
                <Text style={styles.modal_header_middle}>{props.title}</Text>
            </View>
        </View>
    );
};


export default Header;
