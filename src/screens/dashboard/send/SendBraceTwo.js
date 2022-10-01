
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import styles from '../styles';
import style from '../style';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerC';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';

const SendWalletTwo = ({route, navigation}) => {
    
    const {isLoggedIn, isActive, userJwt, sendamount, assettype, networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const [isRequesting, setisRequesting] = useState(true);
    const [addedaccounts, setAddedAccounts] = useState([]);

    const {width, height} = Dimensions.get('window');

    const {contact, flag} = route.params;

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
                 <View style={[styles.deposittwo_top_main, {paddingHorizontal:0}]}>
                     <View style={{width: '100%', paddingHorizontal: 15}}>
                        <Header  navigation={navigation} isBackArrow={true} title={`Send $${sendamount}`} />
                     </View>

                     <View style={style.wallet_two_top}>
                         <Text style={style.wallet_two_top_text}>You are sending</Text>
                     </View>

                     <View style={style.wallet_two_box}>
                         <Text style={style.wallet_two_box_texta}>Amount:</Text>
                         <Text style={style.wallet_two_box_textb}>${sendamount}</Text>
                     </View>


                     <View style={style.wallet_two_box_2}>
                         <Text style={style.wallet_two_box_textc}>To:</Text>
                         <View style={style.transaction_box_box_border}>
                              <View style={styles.transaction_box_left_wrap}>
                                  <Image source={require('../../../assets/images/user2.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                  <View style={styles.transaction_box_left}>
                                      <Text style={style.transaction_box_left_a}>{contact.name}</Text>
                                      <Text style={style.transaction_box_left_b}>{contact.username}</Text>
                                  </View>
                              </View>
                              <View style={style.transaction_box_right}>
                              <Image source={{uri: flag}} style={style.transaction_box_flag} resizeMode='contain'/>
                              </View>
                        </View>
                     </View>


                 </View>

                 <View style={[styles.deposittwo_bottom_main]}>
                     <View style={style.wallet_two_bottom_wrap}>
                        <Text style={style.wallet_two_bottom_text}>Transaction fee:</Text>
                        <Text style={style.wallet_two_bottom_text_b}> FREE</Text>
                     </View>
                    <View style={styles.btn_container}>
                        <TouchableOpacity style={styles.btn_wrapper} onPress={() => navigation.navigate('SendBracePIN',{contact})}>
                            <Text style={styles.btn_text}>Proceed </Text>
                        </TouchableOpacity>
                    </View>
            
                  </View>
        
             
            </View>
    );
};



export default SendWalletTwo;
