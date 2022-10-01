
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';



const WithdrawFour = (props) => {
    

    return (
        <View style={styles.deposittwo_container}>
        <View style={styles.deposittwo_top}>
        <View style={styles.modal_header}>
            <Pressable  onPress={() => props.setController(4)}>
                <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
            </Pressable>
            <Text style={styles.modal_header_middle}>Completed</Text>
            <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
            </Pressable>
        </View>

        <View style={styles.deposittwo_main_top2}>
            <View style={styles.deposittwo_main_top_c2}>
               <Image source={require('../../../assets/images/checkwhite.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
            </View>
            
            <Text style={styles.deposittwo_main_top_b3}>Withdrawal request has been sent and is processing</Text>
           
        </View>

     
        </View>
        <View style={[styles.deposittwo_bottom]}>
            <View style={styles.btn_container}>
                <TouchableOpacity style={styles.btn_wrapper_small_white} onPress={() => props.setCloseModal()}>
                    <Text style={styles.btn_text_white}>Continue</Text>
                </TouchableOpacity>
            </View>
            
        </View>
        
</View>
    );
};



export default WithdrawFour;
