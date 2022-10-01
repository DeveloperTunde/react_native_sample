

import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { BaseUrl } from '../../../constants/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import Clipboard from '@react-native-community/clipboard';
import Share from 'react-native-share';
import CustomAlert from '../../components/CustomAlertB';
import Header from '../components/HeaderInner';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { useSelector, useDispatch } from 'react-redux'

const DepositNine = ({navigation}) => {

    const { userData} = useSelector(state => state.userReducer);

    const banks = ["This Week", "Last Week", "Last Month"];
    const [userweek, setBank] = useState('');


    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitleColor, setAlertTitleColor] = useState(Colors.green);


    function handleCopy(a){
        Clipboard.setString(a);
        setAlertTitle('Link')
        setAlertMessage('Link Copied')
        setShowAlert(true)
    }

    const [paymentlink, setPaymentLink] = useState([]);
    const [isRequesting, setIsRequesting] = useState(false);
    useEffect(() => {
        setIsRequesting(true);
        const checkJwt = async () => {
          const value = await AsyncStorage.getItem('UserJWTAysnc')
          if (value !== undefined && value !== null && value != ''){
                handleCheckJwt(JSON.parse(value));
             //alert(value)  
          } else {
              
          }
        }
         checkJwt()
     },[]);

     function handleCheckJwt(a){
        fetch(`${BaseUrl}/payment-link`, {
          method: 'GET', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${a}`,
          },
         })
        .then((response) => response.json())
        .then((responseJSON) => {
           console.log('payment-link', responseJSON.data);
           setIsRequesting(false);
           if(responseJSON.status == true && responseJSON.statusCode == 200){
            setPaymentLink(responseJSON.data);
           }else{
              
           }
           
        }).catch((error) => {
           console.log(error);  
        })  
      }


      function handleShare(){
        const options = {
            message: paymentlink.link,
            title: 'Hey, here is my shareable link',
        }
        Share.open(options)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
    }



    useEffect(() => {
        if(!showAlert){
            return
        }
        setTimeout(() => {
            setShowAlert(false)
        }, 5000);
      }, [showAlert])



    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={'transparent'}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />
               <View style={styles.crypto_wrap}>
                    <View style={styles.deposit_sharable_wrap}>
                        <Text style={styles.dashboard_profile_middle_txt_a}>Shareable payment link</Text>
                        <Image source={require('../../../assets/images/user2.png')} style={styles.dashboard_profile_middle_img} resizeMode='contain'/>
                        
                            <Text style={styles.dashboard_profile_middle_txt_b}>@{userData.braceTag}</Text>
                        
                        
                    </View>
                    
                    <Text style={styles.crypto_share_warning}>Share your brace account payment link with family and friends</Text>
                    
                    {/* <View style={[styles.sharable_link_container]}>
                        <View style={styles.sharable_link_wrap}>
                            <Image source={require('../../assets/images/link2.png')} style={styles.sharable_link_l} resizeMode='contain'/>
                            <View style={styles.sharable_link_middle}>
                                <Text style={styles.sharable_link_middle_text}>https://brace.fi/$falolaseyi</Text>
                            </View>
                            <Pressable onPress={() => handleCopy(`https://brace.fi/$falolaseyi`)}>
                                <Image source={require('../../../assets/images/copy2.png')} style={styles.sharable_link_r} resizeMode='contain'/>
                            </Pressable>
                        
                        </View>
                        
                    </View> */}
                      
                    <LinearGradient
                        colors={['#16BFFD', '#16BFFD', '#16BFFD', '#16BFFD', '#CB3066', '#CB3066']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                    >
                       
                        <TouchableOpacity style={styles.buttonContainer22}>
                            <Image source={require('../../../assets/images/link2.png')} style={styles.sharable_link_l} resizeMode='contain'/>
                            <View style={styles.sharable_link_middle}>
                               
                                 <Text style={styles.sharable_link_middle_text}>{userData.braceTagLink}</Text>
                            </View>
                            <Pressable onPress={() => handleCopy(userData.braceTagLink)}>
                                <Image source={require('../../../assets/images/copy2.png')} style={styles.sharable_link_r} resizeMode='contain'/>
                            </Pressable>
                        </TouchableOpacity>
                        
                    </LinearGradient>
                  
                    
                    <Text style={styles.crypto_share_warning}>Bank transfer, card and crypto payment supported</Text>
                    <Pressable style={styles.crypto_share_wrap} onPress={() => handleShare()}>
                        <Image source={require('../../../assets/images/share.png')} resizeMode='contain' style={styles.crypto_share_wrap_img}/>
                        <Text style={styles.crypto_share_text}>Share</Text>
                    </Pressable>
                </View>
              </View>
                {/* <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        <TouchableOpacity style={styles.btn_wrapper2} >
                            <Text style={styles.btn_text}>Add account </Text>
                        </TouchableOpacity>
                    </View>
            
               </View> */}

                <CustomAlert 
                      show={showAlert} 
                      message={alertMessage} 
                      buttonTitle='Close'
                      onConfirmPressed={() => {
                         setShowAlert(false)
                        }} 
                      type='success'
                      
                    />             
     </View>
    );
};



export default DepositNine;
