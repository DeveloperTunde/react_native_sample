import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { useSelector } from 'react-redux'

const Header = (props) => {
    const {userData} = useSelector(state => state.userReducer);
    return (
        <View style={styles.header_wrapper_stats}>
            <Text style={styles.header_left_text}>{props.title}</Text>
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
