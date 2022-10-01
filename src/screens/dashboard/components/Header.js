import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { useSelector } from 'react-redux'

const Header = (props) => {

    const {userData} = useSelector(state => state.userReducer);
    return (
        <View style={styles.header_wrapper}>
           <Pressable onPress={()=> props.gotoProfile()}>
              <Image source={{uri: userData.avatar}} style={styles.header_icon} resizeMode='contain'/>
           </Pressable>
           <Text style={styles.header_middle}>{props.title}</Text>
            <View style={styles.header_menu_wrap}>
                <Icon
                    name='qr-code'
                    type='materialicons'
                    color={Colors.neutral}
                    size={20}
                    onPress={() => props.setFirstlscan()} 
                    style={styles.header_menu}
                    />
            </View>
        </View>
    );
};


export default Header;
