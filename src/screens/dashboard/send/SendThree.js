
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';


const SendThree = (props) => {
  
    return (
        <View style={styles.send_container}>
        <View style={styles.send_top}>
                <View style={styles.modal_header}>
                    <Pressable style={styles.modal_header_left}  onPress={() => props.setController(3)}>
                        <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                    </Pressable>
                    <Text style={styles.modal_header_middle}>Confirmation </Text>
                    <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                        <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                    </Pressable>
                 </View>
                 <View style={styles.page_wrapper_top}>
                   <View style={styles.send_confirm_text}>
                      <Text style={styles.send_confirm_text_txt}>${props.sendamount}</Text>
                   </View>
                    <View style={styles.send_confirm_account}>
                        <Text style={styles.send_confirm_account1}>Send to:</Text>
                        <Text style={styles.send_confirm_account2}>0xE33C356c296879de5e4D609Ejo8jE</Text>
                    </View>

                 </View>
                 </View>

                   <View style={[styles.send_bottom]}>
                   <Text style={styles.send_confirm_note}>Please check the amount and destination address before sending. All lost funds cannot be recovered.</Text>
                   <View style={styles.btn_container}>
                       <TouchableOpacity style={styles.btn_wrapper} onPress={() => props.setController(5)}>
                           <Text style={styles.btn_text}>Confirm transaction</Text>
                       </TouchableOpacity>
                   </View>
                   
               </View>
             
            </View>
    );
};



export default SendThree;
