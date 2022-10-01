
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerB';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { useSelector, useDispatch } from 'react-redux'
import NumberFormat from 'react-number-format';

const WithdrawSuccess = ({navigation}) => {

    const {isLoggedIn, isActive, userJwt, withdrawalamount} = useSelector(state => state.userReducer);
    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={false} title="Completed" />
                <View style={{width: '100%'}}>
                <View style={styles.deposittwo_main_top2}>
                    <View style={styles.deposittwo_main_top_c2}>
                    <Image source={require('../../../assets/images/checkwhite.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
                    </View>
                    
                    
                    <NumberFormat value={withdrawalamount*600} displayType={'text'} thousandSeparator={true} prefix={'₦'} suffix=' withdrawal processed successfully!'
                                         renderText={(value, props) => <Text style={styles.deposittwo_main_top_b3} {...props}>{value}</Text>} />
                </View>

                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                <View style={styles.btn_container}>
                    <TouchableOpacity style={styles.btn_wrapper_small_white} onPress={() => navigation.navigate('DashboardIndex')}>
                        <Text style={styles.btn_text_white}>Continue </Text>
                    </TouchableOpacity>
                </View>
            
               </View>
                              
     </View>
    );
};



export default WithdrawSuccess;
