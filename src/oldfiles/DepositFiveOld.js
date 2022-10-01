
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native';
import styles from '../screens/dashboard/styles';
import { Colors } from '../constants/Colors';
import  Modal  from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'

const DepositFive = (props) => {
    const {depositamount, userJwt} = useSelector(state => state.userReducer);
    return (
        <View style={styles.deposittwo_container}>
            <View style={styles.deposittwo_top}>
            <View style={styles.modal_header}>
                <Pressable  onPress={() => props.setController(2)}>
                    {/* <Image source={require('../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/> */}
                </Pressable>
                <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                    <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                </Pressable>
            </View>

            <View style={styles.deposittwo_main_top2}>
                <View style={styles.deposittwo_main_top_c2}>
                   <Image source={require('../../../assets/images/checkwhite.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
                </View>
                <Text style={styles.deposittwo_main_top_a}>${depositamount} Deposit</Text>
                <Text style={styles.deposittwo_main_top_b2}>Account funded successfully</Text>
               
            </View>

         
            </View>
            <View style={[styles.deposittwo_bottom]}>
                <View style={styles.btn_container}>
                    <TouchableOpacity style={styles.btn_wrapper_small_white} onPress={() => props.setCloseModal()}>
                        <Text style={styles.btn_text_white}>Return</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
    </View>
    );
};



export default DepositFive;
