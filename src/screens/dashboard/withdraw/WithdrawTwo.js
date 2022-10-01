
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';

import { Icon } from 'react-native-elements';

const WithdrawTwo = (props) => {
    const [isHaveaccountsSaved, setisHaveaccountsSaved] = useState(false);

    return (
            <>
                <View style={styles.modal_header}>
                    <Pressable style={styles.modal_header_left}  onPress={() => props.setController(2)}>
                        <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                    </Pressable>
                    <Text style={styles.modal_header_middle}>Select bank account</Text>
                    <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                        <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                    </Pressable>
                 </View>

                {
                    (isHaveaccountsSaved)?
                   <View style={{width: '100%'}}>
                   <View style={styles.send_contact_title}>
                         <Text style={styles.send_contact_title_text}>Select account</Text>
                    </View>
                    <View style={styles.depositeone_wrapper}>
                        <Pressable style={styles.withdrawtwo_box} onPress={() => props.setController(4)}>
                            <View style={styles.withdrawtwo_left}>
                               <Image source={require('../../../assets/images/accesslogo1.png')} style={styles.withdrawtwo_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.withdrawtwo_right}>
                                <Text style={styles.withdrawtwo_right_a}>Falola Oluwaseyi</Text>
                                <Text style={styles.withdrawtwo_right_b}>United Bank for Africa - 2072411113</Text>
                            </View>
                        </Pressable>

                        <Pressable style={styles.withdrawtwo_box} onPress={() => props.setController(4)}>
                            <View style={styles.withdrawtwo_left}>
                               <Image source={require('../../../assets/images/accesslogo2.png')} style={styles.withdrawtwo_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.withdrawtwo_right}>
                                <Text style={styles.withdrawtwo_right_a}>Falola Oluwaseyi</Text>
                                <Text style={styles.withdrawtwo_right_b}>Sterling Bank - 30966932155</Text>
                            </View>
                        </Pressable>
        
                      
                    </View>
                   </View>
                    :
                   <View style={{width: '100%', marginTop: 30}}>
                    <View style={styles.deposittwo_main_top}>
                        <View style={styles.deposittwo_main_top_c_b}>
                           <Image source={require('../../../assets/images/bank2.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
                        </View>
                      
                        <Text style={styles.deposittwo_main_top_d_b}>Please proceed to your banking app to complete this bank transaction</Text>
                    </View>

                    
                        <View style={styles.btn_container}>
                            <TouchableOpacity style={styles.btn_wrapper} onPress={() => props.setController(7)}>
                               <Text style={styles.btn_text}>Add account</Text>
                            </TouchableOpacity>
                        </View>
          
                  </View>
                }      
            </>
    );
};



export default WithdrawTwo;
