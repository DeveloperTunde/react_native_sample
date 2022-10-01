
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import  Modal  from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/HeaderInner';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import NumberFormat from 'react-number-format';

const DepositFive = ({navigation}) => {
    const {depositamount, userJwt} = useSelector(state => state.userReducer);

    const NairaDeco = (amount) =>{
        return <Text > <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} 
         renderText={(value) => <Text>{value}</Text>} /></Text>
     }
    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={false} title="" />
               
               


               <View style={styles.deposittwo_main_top2}>
                <View style={styles.deposittwo_main_top_c2}>
                   <Image source={require('../../../assets/images/checkwhite.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
                </View>
                    <Text style={styles.deposittwo_main_top_a}>{NairaDeco(depositamount)} Deposit</Text>
                    <Text style={styles.deposittwo_main_top_b2}>Account funded successfully</Text>
                
                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                <View style={styles.btn_container}>
                    <TouchableOpacity style={styles.btn_wrapper_small_white} onPress={() => navigation.navigate('DashboardIndex')}>
                        <Text style={styles.btn_text_white}>Return</Text>
                    </TouchableOpacity>
                </View>
            
               </View>
                              
     </View>
    );
};



export default DepositFive;
