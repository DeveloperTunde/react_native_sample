
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInner';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style';


const SetPinOne = ({navigation}) => {

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="Setup pin & face ID" />
              
               
               <View>
         
                <View style={{width: '100%'}}>

                <View style={styles.dashboard_more}>
                        <View style={styles.dashboard_more_box2}>
                           
                            <Pressable style={style.secure_box} onPress={() => navigation.navigate('SetPINTwo')}>
                                <View style={style.secure_box_left}>
                                    <Text style={style.secure_box_left_1}>PIN</Text>
                                    <Text style={style.secure_box_left_2}>Create a PIN to login to Brace</Text>
                                </View>
                                <Image source={require('../../../assets/images/pin.png')} style={style.secure_box_img} resizeMode='contain'/>
                            </Pressable>

                            {/* <Pressable style={style.secure_box} >
                                <View style={style.secure_box_left}>
                                    <Text style={style.secure_box_left_1}>FACE ID</Text>
                                    <Text style={style.secure_box_left_2}>Unlock with facial recognition</Text>
                                </View>
                                <Image source={require('../../../assets/images/faceid.png')} style={style.secure_box_img} resizeMode='contain'/>
                            </Pressable> */}
                           
                        </View>
                    </View>

                </View>
                </View>

              </View>
               
                         
     </View>
    );
};



export default SetPinOne;
