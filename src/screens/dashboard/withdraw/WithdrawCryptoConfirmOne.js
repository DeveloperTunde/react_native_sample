
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInner';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { useSelector, useDispatch } from 'react-redux'

const WithdrawCryptoConfirmOne = ({route, navigation}) => {
    const {isLoggedIn, isActive, userJwt, withdrawalamount, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const {cryptoaddress,selectedNetwork} = route.params;

    function handleGotoPin(){
        navigation.navigate('WithdrawCryptoPIN', {cryptoaddress, selectedNetwork})
    }
    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isMargin={true} isBackArrow={true} title="Confirmation" />
                <View style={{width: '100%'}}>
                   <View style={styles.send_confirm_text}>
                      <Text style={styles.send_confirm_text_txt}>${withdrawalamount}</Text>
                   </View>
                    <View style={styles.send_confirm_account}>
                        <Text style={styles.send_confirm_account1}>Send to:</Text>
                        <Text style={styles.send_confirm_account2}>{cryptoaddress}</Text>
                    </View>

                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                   <Text style={styles.send_confirm_note}>Please check the amount and destination address before sending. All lost funds cannot be recovered.</Text>
                    <View style={styles.btn_container}>
                        <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleGotoPin()}>
                            <Text style={styles.btn_text}>Confirm transaction </Text>
                        </TouchableOpacity>
                    </View>
            
               </View>
                              
     </View>
    );
};



export default WithdrawCryptoConfirmOne;
