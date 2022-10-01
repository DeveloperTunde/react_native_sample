
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';


const SendTwo = (props) => {
    const [name, setName] = useState('');
    const [contactview, showContact] = useState(false);
    const [addressview, showAddress] = useState(false);

    const onChangeHandler = (name, value) => {
      if(name=="name"){
        showContact(true);
        showAddress(false);
        setName(value)
      }
     }

     function setAddress(a){
        showContact(false);
        showAddress(true);
        setName(a)
     }
    return (
        <View style={styles.send_container}>
        <View style={styles.send_top}>
                <View style={styles.modal_header}>
                    <Pressable style={styles.modal_header_left}  onPress={() => props.setController(2)}>
                        <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                    </Pressable>
                    <Text style={styles.modal_header_middle}>Send ${props.sendamount} </Text>
                    <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                        <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                    </Pressable>
                 </View>
                 <View style={styles.page_wrapper_top}>
                    <View style={styles.send_input_wrap}>
                       <View style={styles.send_input_left}>
                        <Text style={styles.send_input_label}>To:</Text>
                            <TextInput 
                                style={styles.send_input}
                                placeholder='Name, ENS or wallet address'
                                placeholderTextColor="#9CA3AF"
                                value={name}
                                onChangeText={(value)=>onChangeHandler('name',value)}
                            />
                       </View>
                        {
                            !addressview? <Image source={require('../../../assets/images/scan2.png')} resizeMode='contain' style={styles.send_input_img}/>
                            :
                            <Image source={require('../../../assets/images/addaddress.png')} resizeMode='contain' style={styles.send_input_img}/>
                        }
                    </View>

                    {
                      (contactview)?
                    <View style={styles.send_contact_wrap}>
                        <View style={styles.send_contact_title}>
                            <Text style={styles.send_contact_title_text}>Contacts</Text>
                        </View>
                          <View style={{marginTop: 15}}>
                            <TouchableOpacity style={styles.withdrawtwo_box} onPress={() => setAddress('0xE33C356c296879de5e4D6...')}>
                                <View style={styles.withdrawtwo_left}>
                                <Image source={require('../../../assets/images/user3.png')} style={styles.withdrawtwo_left_img2} resizeMode='contain'/>
                                </View>
                                <View style={styles.withdrawtwo_right}>
                                    <Text style={styles.withdrawtwo_right_a}>Olanrewaju Omowumi</Text>
                                    <Text style={styles.withdrawtwo_right_b}>$olawumi</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.withdrawtwo_box} onPress={() => setAddress('0xC48eC356c296879de5e4D77...')}>
                                <View style={styles.withdrawtwo_left}>
                                <Image source={require('../../../assets/images/user3.png')} style={styles.withdrawtwo_left_img2} resizeMode='contain'/>
                                </View>
                                <View style={styles.withdrawtwo_right}>
                                    <Text style={styles.withdrawtwo_right_a}>Olanrewaju Omowumi</Text>
                                    <Text style={styles.withdrawtwo_right_b}>$olawumi</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                      
                    </View>
                    :
                        null
                        }
                 </View>
                 </View>

               {
                   addressview?
                   <View style={[styles.send_bottom]}>
                   <View style={styles.send_estimate_wrap}>
                       <View style={styles.send_estimate_left}>
                           <Text style={styles.send_estimate_left_a}>$0.24 ~ 30 sec</Text>
                           <Text style={styles.send_estimate_left_b}>Estimated fee</Text>
                       </View>
                       <View style={styles.send_estimate_left}>
                           <Text style={styles.send_estimate_left_a} >$4,627.15</Text>
                           <Text style={styles.send_estimate_left_b}>Balance</Text>
                       </View>
                   </View>
                   <View style={styles.btn_container}>
                       <TouchableOpacity style={styles.btn_wrapper} onPress={() => props.setController(4)}>
                           <Text style={styles.btn_text}>Send ${props.sendamount}</Text>
                       </TouchableOpacity>
                   </View>
                   
               </View>
               :null
               }
            </View>
    );
};



export default SendTwo;
