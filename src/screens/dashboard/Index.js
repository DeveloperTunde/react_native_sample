import React, { Component, useState, useEffect } from 'react';
import { View,  RefreshControl , PermissionsAndroid, Text, StyleSheet, Dimensions, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, Platform} from 'react-native';
import styles from './styles';
import { Colors } from '../../constants/Colors';
import { Icon } from 'react-native-elements';
import Header from './components/Header';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import DepositOne from './deposit/DepositOne';
import DepositThree from './deposit/DepositThree';
import DepositSix from './deposit/DepositSix';
import DepositSeven from './deposit/DepositSeven';
import DepositWallet from './deposit/DepositWallet';

import DepositNine from './deposit/DepositNine';

import WithdrawTwo from './withdraw/WithdrawTwo';
import WithdrawThree from './withdraw/WithdrawThree';
import WithdrawFour from './withdraw/WithdrawFour';
import WithdrawAmount from './withdraw/WithdrawAmount';
import WithdrawSix from './withdraw/WithdrawSix';
import WithdrawCrypto from './withdraw/WithdrawCrypto';
import SendOne from './send/SendOne';
import SendTwo from './send/SendTwo';
import SendThree from './send/SendThree';
import SendFour from './send/SendFour';
import SendFive from './send/SendFive';
import  Modal  from 'react-native-modal';
import LinkScan from './LinkScan';
import { BaseUrl } from '../../constants/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, saveContact,setUserData, setSendAmountR, setFallbackRoute, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../redux/actions';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import Contacts from 'react-native-contacts';
import {Notifications} from 'react-native-notifications';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const DashboardIndex = ({navigation}) => {

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        handleTransactions(fetchedJwt);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const {isLoggedIn, isActive, userJwt, assettype, networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();




    useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
          const {
            title,
            notificationId,
            subtitle,
            body,
            data,
            ios,
          } = remoteMessage.notification;
          Notifications.postLocalNotification({
            title: title,
            body: body,
            extra: data,
            largeIcon: 'ic_launcher',
            smallIcon: 'ic_launcher',
          });
        });
    
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
        
        return unsubscribe;
        
      }, []);





    useEffect( async() => {
        if (Platform.OS == 'android') {
                try {
                    const andoidContactPermission = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                      {
                        title: "Contacts Permission",
                        message:
                          "This app would like to view your contacts.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                      }
                    );
                    if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
                      console.log("Contacts Permission granted");
                      
                      Contacts.getAll().then(contacts => {
                            handleSendAllContacts(contacts)
                           // console.log('All Contacts',contacts)
                        })
                    } else {
                      console.log("Contacts permission denied");
                    }
                  } catch (err) {
                    console.log(err);
             }
        }else if(Platform.OS == 'ios'){
            Contacts.getAll().then(contacts => {
                handleSendAllContacts(contacts)
               // console.log('All Contacts',contacts)
               
            })
        }
       
    }, [])
    


   function handleSendAllContacts(contacts){
        const myContacts = contacts.filter((cont)=> cont.phoneNumbers[0] != undefined).map(contact =>(
            {
             "name": contact.familyName+' '+contact.givenName,
              "phoneNumber": contact.phoneNumbers[0]?.number
            }
         ))

         const data = {
          "contacts":myContacts
         };
         //console.log('All Contacts',myContacts)
         fetch(`${BaseUrl}/contact`, {
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJwt}`,
          },
          body: JSON.stringify(data)
         })
        .then((response) => response.json())
        .then((responseJSON) => {
           console.log('Contacts Response', responseJSON)
           if(responseJSON.status == true && responseJSON.statusCode == 201){
              handleGetAllContacts();
           }else{
               
           }
           
        }).catch((error) => {
           console.log('Contact Erroe',error);  
        })  
    }



    function handleGetAllContacts(){
        console.log('feteching....', userJwt)
        fetch(`${BaseUrl}/contact`, {
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userJwt}`,
            },
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             console.log('Retrieved Contacts', responseJSON.data);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                dispatch(saveContact(responseJSON.data));
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          })  
    }




    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        
        if (enabled) {
           // console.log('Authorization status:', authStatus);
        }
    }

    useEffect(() => {
        requestUserPermission();
    })


    const {width, height} = Dimensions.get('window');


    const [userData, setUserDataIndex] = useState([]);
    useEffect(() => {
        const checkJwt = async () => {
          const value = await AsyncStorage.getItem('UserJWTAysnc')
          if (value !== undefined && value !== null && value != ''){
              await handleCheckJwt(JSON.parse(value));
             //alert(value)  
          } else {
              
          }
        }
         checkJwt()
     },[]);

     
     const [fetchedJwt, setFetchedJwt] = useState('');
     function handleCheckJwt(a){
        fetch(`${BaseUrl}/auth/me`, {
          method: 'GET', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${a}`,
          },
         })
        .then((response) => response.json())
        .then((responseJSON) => {
           //console.log('User Data 2', a);
           if(responseJSON.status == true && responseJSON.statusCode == 200){
              setUserDataIndex(responseJSON.data);
              dispatch(setUserData(responseJSON.data))
              handleTransactions(a);
              setFetchedJwt(a)
              handleFirebaseNotification(a)
           }else{
              
           }
           
        }).catch((error) => {
           console.log(error);  
        })  
      }







      async function handleFirebaseNotification (jwt){
        const token = await messaging().getToken();
        const deviceId = DeviceInfo.getUniqueId();
        //alert(thetoken)
        const data = {
            "token": token,
            "deviceId": deviceId,
            "platform": Platform.OS.toUpperCase(),
          };
       
        //console.log('notification-data', jwt)

        fetch(`${BaseUrl}/notifications`, {
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(data)
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             
           // console.log('notification-response', responseJSON); 
             if(responseJSON.status == true && responseJSON.statusCode == 201){
               console.log('firebase response', responseJSON);
             }else{
                 
             }
             
          }).catch((error) => {
             console.log(error);  
          })   
      }

      const [transactions, setTransactions] = useState([]);


     function handleTransactions(a){
        fetch(`${BaseUrl}/transactions`, {
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${a}`,
            },
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setTransactions(responseJSON.data);
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          }) 
      }


      useEffect(() => {
        const interval = setInterval(() => {

                fetch(`${BaseUrl}/auth/me`, {
                  method: 'GET', 
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userJwt}`,
                  },
                 })
                .then((response) => response.json())
                .then((responseJSON) => {
                  // console.log('User Data', responseJSON);
                   if(responseJSON.status == true && responseJSON.statusCode == 200){
                      setUserDataIndex(responseJSON.data);
                      dispatch(setUserData(responseJSON.data))
                      handleTransactions(userJwt);
                   }else{
                      
                   }
                   
                }).catch((error) => {
                   console.log(error);  
                })  

        }, 2000);
      
        return () => clearInterval(interval);
      }, []);
    

    const [isLoading, setisLoading] = useState(true);
    const [nosite, setNoSite] = useState(false);
    const [notransaction, setNoTransaction] = useState(false);
      useEffect(
        () => {
          let timer1 = setTimeout(() => setisLoading(false), 3000);
          return () => {
            clearTimeout(timer1);
          };
        },
        []
      );
      function handleStats(){
          navigation.navigate('StatsOne')
      }

    function setModalVisible(a){
        dispatch(setModalVisibleAction(a));
    }
      
    
    const [modalview, setModalView] = useState(1);
    const [depositamount, setDepositAmount] = useState(0);
    const [withdrawamount, setWithdrawAmount] = useState(0);
    const [sendamount, setSendAmount] = useState(0);
      
      function setFirstModal(){
        setModalView(1);
        setModalVisible(true);
      }
      function handleController(a){
         if(a == 1){
            setModalVisible(false);
         }else{
             const prev = a -1;
            setModalView(prev)
         }

      }


      function handleControllerRe(a){
        setModalVisible(false);
        navigation.navigate('DepositWallet', {initialAsset:a})

     }


      function handleSendControllerMode(a){
        if(a == 'Crypto Exchange'){
            setModalView(7);
        }else if(a == 'Shareable Link'){
            setModalVisible(false);
            navigation.navigate('DepositNine')
        }else if(a == 'The Peer'){
            setModalView(2);
        }else if(a == 'Bank Transfer'){
            setModalView(11);
        }

     }
     

      function handleController2(a,b){
          dispatch(setSendAmount(b))
        
        if(a == 1){
           setModalVisible(false);
        }else if(a == 3){
          navigation.navigate('WalletOne')
        }else{
            const prev = a -1;
           setModalView(prev);
           setDepositAmount(b)
        }

     }




    //Withdrawal Routers
    function setWithdrawVisible(a){
        dispatch(setWithdrawVisibleAction(a));
    }
    const [withdrawview, setWithdrawView] = useState(1);
      
      function setFirstWithdraw(){
        setWithdrawView(1);
        setWithdrawVisible(true);
      }
      function handleWithdrawController(a){
         if(a == 1){
            setWithdrawVisible(false);
         }else{
             const prev = a -1;
             setWithdrawView(prev)
         }

      }

      function handleWithdrawController2(a, b){
        if(a == 1){
           setWithdrawVisible(false);
        }else{
            const prev = a -1;
            setWithdrawView(prev);
            setWithdrawAmount(b)
        }

     }
     

     const [withdrawRoute, setWithdrawRoute] = useState('');
  


    function handleWithdrawRoute(){
        
        if(withdrawRoute == 'To Bank'){
            setWithdrawVisible(false)
            navigation.navigate('SelectAccount');
        }
        if(withdrawRoute == 'To Crypto Wallet'){
            setWithdrawView(7);
        }
        
    }



    function handleNavigateToPin(cryptoaddress, selectedNetwork) {
        setWithdrawVisible(false);
        navigation.navigate('WithdrawCryptoConfirmOne', {cryptoaddress, selectedNetwork})
    }









    //Send Routers
    function setSendVisible(a){
        dispatch(setSendVisibleAction(a));
    }

     const [sendview, setSendView] = useState(1);
      
      function setFirstSend(){
        setSendView(1);
        setSendVisible(true);
      }
      function handleSendController(a){
         if(a == 1){
            setSendVisible(false);
         }else{
             const prev = a -1;
             setSendView(prev)
         }

      }


      
        
    

      function handleSendController2(a, b){
        dispatch(setSendAmountR(b))
        if(a == 1){
           setSendVisible(false);
        }else if(a == 3){
            setSendVisible(false)
            navigation.navigate('SendBraceOne')
        }else{
            const prev = a -1;
            setSendView(prev);
            setSendAmount(b)
        }

     }


     function setLscanVisible(a){
        dispatch(setLscanVisibleAction(a));
    }
     const [lscanview, setLscanView] = useState(1);
      
      function setFirstLscan(){
        setLscanView(1);
        setLscanVisible(true);
      }
      function handleLscanController(a){
         if(a == 1){
            setLscanVisible(false);
         }else{
             const prev = a -1;
             setLscanView(prev)
         }

      }

      const [isFocus, handlesetFocusHeight] = useState(false);

      const [iswithFocus, handlesetWithFocusHeight] = useState(false);


      const NairaDeco = (amount) =>{
        return <Text > <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} 
         renderText={(value) => <Text>{value}</Text>} /></Text>
     }

     const [isMoneyVisible, setisMoneyVisible] = useState(true)
     function toggleMenu(){
         setisMoneyVisible(!isMoneyVisible)
     }


     function handleFallbackRoute(route){
        dispatch(setFallbackRoute(route))
        navigation.navigate('KycIndex')
     }
 
    return (
           
            <View style={{backgroundColor: Colors.background, }}>          
                 <CustomeStatusBar 
                        backgroundColor={(modalVisible || withdrawVisible || sendVisible)? Colors.lightgray:Colors.background}
                        barStyle={modalVisible || withdrawVisible || sendVisible? 'light-content': 'dark-content'}
                        />
                    <View style={[styles.dashboard_wrapper]}
                        // refreshControl={
                        //     <RefreshControl
                        //     refreshing={refreshing}
                        //     onRefresh={onRefresh}
                        //     />
                        // }
                    >

                   <Header  gotoProfile={()=> navigation.navigate('Profile')} title="" setFirstlscan={() => setFirstLscan()}/>
                   <ScrollView 
                     style={styles.dashboard_main_wrapper}
                     showsVerticalScrollIndicator ={false}
                     showsHorizontalScrollIndicator={false}>
                     <View style={styles.dashboard_wrapper_top}>
                       
                        <View style={styles.balance_wrapper}>
                            <Pressable style={styles.balance_top} >
                                <Text style={styles.balance_top_a}>Account balance </Text>
                                <Icon
                                    name={(isMoneyVisible)?'eye-off':'eye'}
                                    type='feather'
                                    color={Colors.neutral}
                                    size={17}
                                    onPress={() => toggleMenu()} 
                                    style={styles.balance_top_b}
                                    />
                            </Pressable>
                            <View style={styles.balance_middle}>
                                <View style={styles.balance_middle_a}>
                                   <Image source={require('../../assets/images/balance1.png')} style={styles.balance_middle_a_img} resizeMode='contain'/>
                                </View>
                                <Pressable style={styles.balance_middle_balance} >
                                {
                                  (userData.wallets)?
                                (isMoneyVisible)?
                                <NumberFormat value={parseFloat(userData.wallets.currentBalance).toFixed(1)} displayType={'text'} thousandSeparator={true} prefix={'$'}
                                     renderText={(value, props) => <Text style={styles.balance_middle_b} {...props}>{value}</Text>} />
                                :
                                <Text style={[styles.balance_middle_b, {marginTop: 5}]}>********</Text>
                                 :   
                                   <>
                                   <Text style={styles.balance_middle_b}>$0</Text>
                                   <Text style={styles.balance_middle_c}>.00</Text>
                                   </>
                                }
                                </Pressable>
                                <Pressable onPress={()=> handleStats()} style={styles.balance_middle_d_wrap}>
                                     <Image source={require('../../assets/images/balance2.png')} style={styles.balance_middle_d} resizeMode='contain'/>
                                </Pressable>
                            </View>
                            <View style={styles.balance_bottom}>
                            {
                                (userData.wallets)?
                                <NumberFormat value={parseFloat(userData.earnedToday).toFixed(1)} displayType={'text'} thousandSeparator={true} prefix={'$'}
                                     renderText={(value, props) => <Text style={styles.balance_bottom_a} {...props}>{value}</Text>} />
                                :
                                <Text style={styles.balance_bottom_a}>$0.00</Text>
                            }
                            
                                <Pressable >
                                  <Text style={styles.balance_bottom_b}>earned today </Text>
                                </Pressable>
                                
                            </View>
                        </View>


                        <View style={styles.action_wrapper}>
                            <TouchableOpacity style={styles.action_box} onPress={()=> navigation.navigate('Scan')}>
                                <View style={styles.action_box_image_wrap}>
                                   <Image source={require('../../assets/images/scan.png')} style={styles.action_box_image} resizeMode='contain'/>
                                </View>
                                <Text style={styles.action_box_text}>Scan</Text>
                            </TouchableOpacity>

                            <Pressable style={styles.action_box} onPress={()=> navigation.navigate('DepositRoute')}>
                                <View style={styles.action_box_image_wrap}>
                                   <Image source={require('../../assets/images/deposit.png')} style={styles.action_box_image} resizeMode='contain'/>
                                </View>
                                <Text style={styles.action_box_text}>Deposit</Text>
                            </Pressable>

                            <Pressable style={styles.action_box} onPress={()=> navigation.navigate('WithdrawRoute')}>
                                <View style={styles.action_box_image_wrap}>
                                   <Image source={require('../../assets/images/withdraw.png')} style={styles.action_box_image} resizeMode='contain'/>
                                </View>
                                <Text style={styles.action_box_text}>Withdraw</Text>
                            </Pressable>

                            {/* <Pressable style={styles.action_box} onPress={()=> (userData.emailVerified && userData.kycVerified)?navigation.navigate('SendAmount'):navigation.navigate('KycIndex')}> */}

                            <Pressable style={styles.action_box} onPress={()=> (userData.emailVerified )?navigation.navigate('SendAmount'):handleFallbackRoute('SendAmount')}>
                                <View style={styles.action_box_image_wrap}>
                                   <Image source={require('../../assets/images/send.png')} style={styles.action_box_image} resizeMode='contain'/>
                                </View>
                                <Text style={styles.action_box_text}>Send</Text>
                            </Pressable>
                        </View>
                    </View>   
                        <View style={styles.site_wrapper}>
                            <View style={styles.site_header}>
                                <Text style={styles.site_header_text}>Connected sites</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.neutral}
                                    size={22}
                                    style={styles.site_header_icon}
                                    />
                            </View>
                            <ScrollView 
                                style={styles.site_bottom} 
                                horizontal={true}
                                showsVerticalScrollIndicator ={false}
                                showsHorizontalScrollIndicator={false}>
                               {
                              (!nosite)?<View style={styles.site_bottom_box_cover}>
                                <Pressable style={styles.site_bottom_box} onPress={()=> navigation.navigate('Test')}>
                                    <Image source={require('../../assets/images/site1.png')} style={styles.site_bottom_box_image} resizeMode='contain'/>
                                </Pressable>

                                <View style={styles.site_bottom_box}>
                                    <Image source={require('../../assets/images/site2.png')} style={styles.site_bottom_box_image} resizeMode='contain'/>
                                </View>

                                <View style={styles.site_bottom_box}>
                                    <Image source={require('../../assets/images/site3.png')} style={styles.site_bottom_box_image} resizeMode='contain'/>
                                </View>

                                <View style={styles.site_bottom_box}>
                                    <Image source={require('../../assets/images/site4.png')} style={styles.site_bottom_box_image} resizeMode='contain'/>
                                </View>
                                <View style={styles.site_bottom_box}>
                                    <View style={styles.site_bottom_box_icon_wrap}> 
                                        <Icon
                                            name='plus'
                                            type='feather'
                                            color={Colors.neutral}
                                            size={22}
                                            style={styles.site_bottom_box_icon}
                                            />
                                    </View>
                                </View>
                                </View>
                                :
                                <View style={styles.site_bottom_box_cover}>
                                <View style={styles.site_bottom_box}>
                                    <View style={styles.site_bottom_box_icon_wrap}> 
                                        <Icon
                                            name='plus'
                                            type='feather'
                                            color={Colors.neutral}
                                            size={22}
                                            style={styles.site_bottom_box_icon}
                                            />
                                    </View>
                                </View>
                                <View style={styles.site_bottom_box2}>
                                    <Text style={styles.site_bottom_box2_txt}>No connected site</Text>
                                  </View>
                                </View>
                                }
                               
                            </ScrollView>
                        </View>


                        <View style={styles.trans_wrapper}>
                            <TouchableOpacity style={styles.trans_header} onPress={()=> handleStats()}>
                                <Text style={styles.trans_header_text}>Transactions</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.neutral}
                                    size={22}
                                    style={styles.trans_header_icon}
                                    />
                            </TouchableOpacity>

                            {
                             (transactions.length > 0)?
                            
                            <View style={[styles.trans_bottom, {paddingBottom: 100}]}>
                                
                               <View style={styles.transaction_box_wrap}>
                                    {/* <Text style={styles.transaction_box_header}>Today</Text> */}
                                    {
                                        transactions.map((transaction, id)=>{
                                            return(
                                                <View style={styles.transaction_box_box} key={id}>
                                                    <View style={styles.transaction_box_left_wrap}>
                                                        <Image source={{uri:transaction.avatar}} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                                        <View style={styles.transaction_box_left}>
                                                            <Text style={styles.transaction_box_left_a}>Tunji Adeyanju</Text>
                                                            <Text style={styles.transaction_box_left_b}>{transaction.action}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.transaction_box_right}>
                                                        {
                                                            (transaction.action == 'CREDIT')?
                                                            <Text style={styles.transaction_box_right_a}>+{NairaDeco(parseFloat(transaction.amount).toFixed(1))}</Text>
                                                            :
                                                            <Text style={styles.transaction_box_right_a}>-{NairaDeco(parseFloat(transaction.amount).toFixed(1))}</Text>
                                                        }
                                                        
                                                        <Text style={styles.transaction_box_right_b}>10:53 AM</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                    

                                    {/* <View style={styles.transaction_box_box}>
                                        <View style={styles.transaction_box_left_wrap}>
                                            <Image source={require('../../assets/images/user.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                            <View style={styles.transaction_box_left}>
                                                <Text style={styles.transaction_box_left_a}>Betdemand</Text>
                                                <Text style={styles.transaction_box_left_b}>Withdrawal</Text>
                                            </View>
                                        </View>
                                        <View style={styles.transaction_box_right}>
                                            <Text style={styles.transaction_box_right_a}>-$1,257</Text>
                                            <Text style={styles.transaction_box_right_b}>08:27 AM</Text>
                                        </View>
                                    </View> */}
                               </View>


                              
                            </View>
                            :
                            <View style={styles.trans_bottom_no}>
                                <Image source={require('../../assets/images/notrans.png')} style={styles.trans_bottom_no_image} resizeMode='contain'/>
                                <Text style={styles.trans_bottom_no_text}>No transaction at the moment</Text>
                            </View>
                            }
                        </View>



                    </ScrollView>

                    </View>
















                    <View style={styles.modal_container}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            isVisible={modalVisible}
                            deviceWidth={width}
                            style={[styles.modal, isFocus && {marginTop: 200}]}
                            onSwipeComplete={() => setModalVisible(false)}
                            swipeDirection="down"
                            hasBackdrop={true}
                            backdropOpacity={0.4}
                            backdropTransitionInTiming={1000}
                            backdropTransitionOutTiming={1000}
                            animationInTiming={1000}
                            animationOutTiming={1000}
                            backdropColor={Colors.lightgray}
                        >
                            <View style={styles.modalView}>
                                {
                                    modalview == 1? <DepositOne setControllerMode={(x) => handleSendControllerMode(x)} setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)} /> 
                                    :
                                    modalview == 2? <DepositTwo setFocusHeight={(x)=> handlesetFocusHeight(x)} depositamount={depositamount} setController={(x,y)=> handleController2(x, y)} setCloseModal={() => setModalVisible(false)}/> 
                                    : 
                                    modalview == 3? <DepositThree depositamount={depositamount}  setController={(x,y)=> handleController2(x, y)} setCloseModal={() => setModalVisible(false)}/> 
                                    : 
                                    modalview == 4? <DepositFour depositamount={depositamount}  setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                                    :
                                    modalview == 5? <DepositFive depositamount={depositamount}  setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                                    :
                                    modalview == 6? <DepositSix setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                                    :
                                    modalview == 7? <DepositSeven setController={(x)=> handleController(x)} setControllerRe={(x)=> handleControllerRe(x)} setCloseModal={() => setModalVisible(false)}/> 
                                    :
                                    modalview == 8? <DepositWallet setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                                    :
                                    modalview == 9? <DepositNine setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                                    :
                                   
                                    modalview == 11? <DepositAmount setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                                    :
                                    modalview == 12? <P2PFulfil setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                                    :null
                                }
                                
                            </View>
                        </Modal>
                        </View>



                        
                    <View style={styles.modal_container}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            isVisible={withdrawVisible}
                            deviceWidth={width}
                            style={[styles.modal, iswithFocus && {marginTop: height/5}]}
                            onSwipeComplete={() => setWithdrawVisible(false)}
                            swipeDirection="down"
                            hasBackdrop={true}
                            backdropOpacity={0.4}
                            backdropTransitionInTiming={1000}
                            backdropTransitionOutTiming={100}
                            animationInTiming={1000}
                            animationOutTiming={100}
                            backdropColor={Colors.lightgray}
                        >
                            <View style={styles.modalView}>
                                {
                                    // withdrawview == 1? <WithdrawOne setControllerMode={(x) => handleWithdrawControllerMode(x)} withdrawamount={withdrawamount} setController={(x, y)=> handleWithdrawController2(x, y)} setCloseModal={() => setWithdrawVisible(false)}/> 
                                    // :
                                    withdrawview == 2? <WithdrawTwo withdrawamount={withdrawamount} setController={(x)=> handleWithdrawController(x)} setCloseModal={() => setWithdrawVisible(false)}/> 
                                    :
                                    withdrawview == 3? <WithdrawThree withdrawamount={withdrawamount} setController={(x)=> handleWithdrawController(x)} setCloseModal={() => setWithdrawVisible(false)}/> 
                                    :
                                    withdrawview == 4? <WithdrawFour withdrawamount={withdrawamount} setController={(x)=> handleWithdrawController(x)} setCloseModal={() => setWithdrawVisible(false)}/> 
                                    :
                                    withdrawview == 5? <WithdrawAmount withdrawRoute={withdrawRoute}  withdrawamount={withdrawamount} setControllerMode={(x)=> handleWithdrawController(x)} setController={()=> handleWithdrawRoute()} setCloseModal={() => setWithdrawVisible(false)}/> 
                                    :
                                    withdrawview == 6? <WithdrawSix  withdrawamount={withdrawamount} setController={(x)=> handleWithdrawController(x)} setCloseModal={() => setWithdrawVisible(false)}/> 
                                    :
                                    withdrawview == 7? <WithdrawCrypto navigateToPin={(addr, net) => handleNavigateToPin(addr, net)} initialBalance={userData.wallets.currentBalance} setFocusHeight={(x)=> handlesetWithFocusHeight(x)}  withdrawamount={withdrawamount} setController={(x)=> handleWithdrawController(x)} setCloseModal={() => setWithdrawVisible(false)}/> 
                                    :null
                                }
                                
                            </View>
                        </Modal>
                        </View>




                        <View style={styles.modal_container}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            isVisible={sendVisible}
                            deviceWidth={width}
                            style={styles.modal}
                            onSwipeComplete={() => setSendVisible(false)}
                            swipeDirection="down"
                            hasBackdrop={true}
                            backdropOpacity={0.4}
                            backdropTransitionInTiming={1000}
                            backdropTransitionOutTiming={1000}
                            animationInTiming={1000}
                            animationOutTiming={1000}
                            backdropColor={Colors.lightgray}
                        >
                            <View style={styles.modalView}>
                                {
                                    sendview == 1? <SendOne sendamount={sendamount} setController={(x, y)=> handleSendController2(x, y)} setCloseModal={() => setSendVisible(false)}/> 
                                    :
                                    sendview == 2? <SendTwo sendamount={sendamount} setController={(x)=> handleSendController(x)} setCloseModal={() => setSendVisible(false)}/> 
                                    :
                                    sendview == 3? <SendThree sendamount={sendamount} setController={(x)=> handleSendController(x)} setCloseModal={() => setSendVisible(false)}/> 
                                    :
                                    sendview == 4? <SendFour sendamount={sendamount} setController={(x)=> handleSendController(x)} setCloseModal={() => setSendVisible(false)}/> 
                                    :
                                    sendview == 5? <SendFive sendamount={sendamount} setController={(x)=> handleSendController(x)} setCloseModal={() => setSendVisible(false)}/> 
                                    :null
                                }
                                
                            </View>
                        </Modal>
                        </View>




                        <View style={styles.modal_container}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            isVisible={lscanVisible}
                            deviceWidth={width}
                            style={styles.modal}
                            onSwipeComplete={() => setLscanVisible(false)}
                            swipeDirection="down"
                            hasBackdrop={true}
                            backdropOpacity={0.4}
                            backdropTransitionInTiming={1000}
                            backdropTransitionOutTiming={1000}
                            animationInTiming={1000}
                            animationOutTiming={1000}
                            backdropColor={Colors.lightgray}
                        >
                            <View style={styles.modalView}>
                                {
                                    lscanview == 1? <LinkScan setController={(x)=> handleLscanController(x)} setCloseModal={() => setLscanVisible(false)}/> 
                                    :null
                                }
                                
                            </View>
                        </Modal>
                        </View>

        {/* <CustomAlert 
            show={showAlert} 
            message={alertMessage} 
            buttonTitle='Close'
            onConfirmPressed={() => {
                setShowAlert(false)
            }} 
            type='error'
            
        />  */}
            </View>
       
    );

    
};


export default DashboardIndex;
