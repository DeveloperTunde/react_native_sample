
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerD';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style';


const BankIndex = ({navigation}) => {

    
    const {isLoggedIn, isActive, userJwt, userData, assettype, networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);

      const [showAlert2, setShowAlert2] = useState(false);
      const [alertTitle2, setAlertTitle2] = useState('');
      const [alertMessage2, setAlertMessage2] = useState('');
      const [isAdding, setIsAdding] = useState(false);

      const [isActiveOne, setActiveOne] = useState(false);
      const [isActiveTwo, setActiveTwo] = useState(false);
      const [isActiveThree, setActiveThree] = useState(false);
      const [isActiveFour, setActiveFour] = useState(false);
 
    const [email, setEmail] = useState('');
    const [braceid, setBraceId] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
 


    


    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="Banks & wallets" />
              
               
               <View>
         
                <View style={{width: '100%'}}>

                <View style={styles.dashboard_more}>
                        <View style={styles.dashboard_more_box2}>
                           
                            <Pressable style={styles.dashboard_more_box_bottom} onPress={() => navigation.navigate('BankSelect',{selectedIndex: 0})}>
                                <View style={style.bank_directory}>
                                    <View style={style.bank_dir_image_wrap}>
                                        <Image source={require('../../../assets/images/bank2.png')} style={style.bank_dir_image} resizeMode='contain'/>
                                    </View>
                                   <Text style={style.dashboard_more_box_bottom_text}>Banks</Text>
                                </View>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </Pressable>
                            <Pressable style={styles.dashboard_more_box_bottom} onPress={() => navigation.navigate('BankSelect', {selectedIndex: 1})}>
                              <View style={style.bank_directory}>
                                    <View style={style.bank_dir_image_wrap}>
                                        <Image source={require('../../../assets/images/walletblack.png')} style={style.bank_dir_image} resizeMode='contain'/>
                                    </View>
                                   <Text style={style.dashboard_more_box_bottom_text}>Wallets</Text>
                                </View>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </Pressable>
                           
                        </View>
                    </View>

                </View>
                </View>

              </View>
               
                         
     </View>
    );
};



export default BankIndex;
