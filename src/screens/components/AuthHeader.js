import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import styles from '../styles';


const AuthHeader = (props) => {
    return (
        <View style={styles.auth_header_container}>
            <TouchableOpacity style={styles.auth_header_left} onPress={props.goback}>
                <Image source={require('../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.auth_header_left_img}/>
            </TouchableOpacity>
        </View>
    );
};


export default AuthHeader;
