
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, Modal,TouchableOpacity, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import styles from '../styles';
import style from '../style';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerC';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType,  setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';
import { Flags } from '../../../constants/CountryFlags';
import CustomAlert from '../../components/CustomAlertB';


const SendWalletTwo = ({route, navigation}) => {

    const {wallet} = route.params;
    
    const {isLoggedIn, isActive, userJwt, sendamount,userData, assettype, networktype, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const [isRequesting, setisRequesting] = useState(false);
    const [addedaccounts, setAddedAccounts] = useState([]);

    const {width, height} = Dimensions.get('window');

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    
    function  handleCloseModal() {
        setActiveTwo(false)
        setModalVisible(false)
    }
    const onChangeHandler = (name, value) => {
        if(name=="walletAddress"){
            setWalletAddress(value)
        }else if (name=="email") {
          setEmail(value);
        }else if (name=="phonenumber") {
          setPhone(value)
        }
       }



       function handleSaveWallet() {
         setisRequesting(true)

        const data = {
            "name": wallet.network,
            "address": wallet.address,
            "symbol": wallet.asset,
          }

        fetch(`${BaseUrl}/finance/crypto/beneficiary/external`, {
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJwt}`,
          },
          body: JSON.stringify(data),
         })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log('saved Wallet', responseJSON);
          setisRequesting(false);
          setModalVisible(false)
         
           if(responseJSON.status == true && responseJSON.statusCode == 201){
            setShowAlert(true)
            setAlertMessage('Wallet added success')
            
           }else{
           
           }
           
        }).catch((error) => {
            setisRequesting(false);
           console.log(error);  
        }) 
      }


    const [modalVisible, setModalVisible] = useState(false);
    const [isActiveTwo, setActiveTwo] = useState(false);
    const [walletAddress, setWalletAddress] = useState(wallet.address);

    function handleWalletRoute(){
        const newwallet = {...wallet, address:walletAddress }
        navigation.navigate('SendWalletPIN', {wallet:newwallet})
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
                         <View style={style.save_bene_wrap}>
                            <Text style={style.wallet_two_box_textc}>To:</Text>
                            <Pressable style={style.save_bene_right} onPress={() => setModalVisible(true)}>
                               <Image source={require('../../../assets/images/plus.png')} style={style.save_bene_img} resizeMode='contain'/>
                                <Text style={style.wallet_two_box_textd}>Save wallet details</Text>
                            </Pressable>
                         </View>
                         <View style={style.transaction_box_box_border}>
                              <View style={styles.transaction_box_left_wrap}>
                                  <Image source={require('../../../assets/images/stablecoin1.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                  <View style={styles.transaction_box_left}>
                                      <Text style={style.transaction_box_left_a}>{wallet.symbol}</Text>
                                      <Text style={style.transaction_box_left_b}>{wallet.address}</Text>
                                  </View>
                              </View>
                              <View style={style.transaction_box_right}>
                              <Image source={{uri: Flags[userData.country]}} style={style.transaction_box_flag} resizeMode='contain'/>
                              </View>
                        </View>
                     </View>


                 </View>



                 <View style={style.confirm_modal}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        
                        setModalVisible(!modalVisible);
                        }}
                        
                    >
                        <View style={[style.confirm_modal, { backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                        <View style={style.modalView}>
                            
                        <View style={style.modal_header}>
                            <Pressable style={style.modal_header_left}  onPress={() => props.setController(1)}>
                                
                            </Pressable>
                            <Text style={style.modal_header_middle}>Save wallet details</Text>
                            <Pressable style={style.modal_header_right} onPress={() => handleCloseModal()}>
                                <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={style.modal_header_right_img}/>
                            </Pressable>
                        </View>

                        <View style={[styles.form_group,{paddingHorizontal: 15, marginBottom: 20}]}>
                          <Text style={styles.form_label}>Wallet label</Text>
                        <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                            <TextInput 
                            placeholder='e.g 432904903'
                            keyboardType='number-pad'
                            placeholderTextColor={Colors.placeholder}
                            value={walletAddress}
                            onChangeText={(value)=>onChangeHandler('walletAddress',value)}
                            onFocus={() => setActiveTwo(true)}
                            onBlur={() => setActiveTwo(false)}
                            style={styles.form_input_type_2}
                            />

                        </View>
                        </View>

                        <View style={[styles.deposittwo_bottom_main ]}>
                                <View style={[styles.btn_container]}>
                                    {
                                        (!isRequesting)?
                                        <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleSaveWallet()}>
                                            <Text style={styles.btn_text}>Save details </Text>
                                       </TouchableOpacity>
                                       :
                                       <TouchableOpacity style={styles.btn_wrapper} >
                                          <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:0}} />
                                      </TouchableOpacity>
                                    }
                                </View>
                        
                        </View>
                        </View>
                        </View>
                    </Modal>
                
                    </View>

                 <View style={[styles.deposittwo_bottom_main]}>
                     <Pressable style={style.wallet_two_bottom_wrap} >
                        <Text style={style.wallet_two_bottom_text}>Transaction fee:</Text>
                        <Text style={style.wallet_two_bottom_text_b}> $1.92</Text>
                     </Pressable>
                    <View style={styles.btn_container}>
                        <TouchableOpacity style={styles.btn_wrapper} onPress={()=> navigation.navigate('SendWalletPIN',{wallet})}>
                            <Text style={styles.btn_text}>Proceed </Text>
                        </TouchableOpacity>
                    </View>


            
                  </View>
        
             

                  <CustomAlert 
                      show={showAlert} 
                      message={alertMessage} 
                      buttonTitle='Continue'
                      onConfirmPressed={() => {
                         setShowAlert(false)
                        }} 
                      type='success'
                      
                    />  
                

            </View>



    );
};



export default SendWalletTwo;
