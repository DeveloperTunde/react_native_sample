

import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import Header from '../components/HeaderInner';

const AddAccount = ({navigation}) => {



    const {isLoggedIn, isActive, userData,userJwt, withdrawalamount} = useSelector(state => state.userReducer);

    const [cryptoaddress, setCryptoAddress] = useState('');
    const [contactview, showContact] = useState(false);
    const [addressview, showAddress] = useState(false);

    const onChangeHandler = (cryptoaddress, value) => {
      if(cryptoaddress=="cryptoaddress"){
        showContact(true);
        showAddress(false);
        setCryptoAddress(value)
      }
     }

     function setAddress(a){
        showContact(false);
        showAddress(true);
        setName(a)
     }
 

     const [transferFee, setAddressVerify] = useState(0);
     const [isFetching, setIsFetching] = useState(false);
     const [checkAction, setcheckAction] = useState('');
     const [iswrong, setiswrong] = useState(false);
     const [isprocessing, setProcessing] = useState(false);
     const [selectedNetwork, setSelectedNetwork] = useState('TRON');
 
     function handleVerifyAddress(){
        setIsFetching(true)
        setcheckAction('Verifying Address...')
        
        const data = {
            "address":cryptoaddress,
            "network": selectedNetwork
          }
          
        fetch(`${BaseUrl}/finance/validate-crypto-address`, {
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${userJwt}`,
            },
            body: JSON.stringify(data),
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             console.log('verification', responseJSON);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                if (responseJSON.data.isValid == true) {
                    setIsFetching(false)
                    setProcessing(true)
                    
                    
                }
                else{
                    setcheckAction('You have entered wrong crypto address')
                    setiswrong(true);
                    checkTransferFees() //go up

                   // setProcessing(true)
                    
                    //navigation.navigate('WithdrawCryptoPIN', {cryptoaddress, selectedNetwork})
                 }
               
             }else{
                setiswrong(true);
                setcheckAction('You have entered wrong crypto address 2')
                setIsFetching(false)
                
             }
             
          }).catch((error) => {
             console.log(error); 
             setIsFetching(false)
          })  
     }

     useEffect(() => {
      setiswrong(false)
     }, [cryptoaddress])
     


     function handleWithConfirm(){
       // props.navigateToPin(cryptoaddress, selectedNetwork)
        navigation.navigate('WithdrawCryptoConfirmOne', {cryptoaddress, selectedNetwork})
     }

     const [fees, setFees] = useState('')


   function checkTransferFees(){

      const data={
        "country": userData.country
      }
  
        fetch(`${BaseUrl}/finance/fees`, {
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
             console.log('User Data', responseJSON);
            if(responseJSON.status == true && responseJSON.statusCode == 200){
               setFees(responseJSON.data.withdrawal.crypto)
               setIsFetching(false)
               setProcessing(true)
            }else{
                
            }
            
        }).catch((error) => {
            console.log(error);  
        })  

 
      }




    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="Enter crypto address" />
   
                
                 <View style={{width: '100%', marginTop: 30}}>
                    <View style={[styles.send_input_wrap]} >
                       <View style={styles.send_input_left}>
                        <Text style={styles.send_input_label}>To:</Text>
                            <TextInput 
                                style={styles.send_input}
                                placeholder='ENS or wallet address'
                                placeholderTextColor="#9CA3AF"
                                value={cryptoaddress}
                                
                                onChangeText={(value)=>onChangeHandler('cryptoaddress',value)}
                            />
                       </View>
                        {
                            !addressview? 
                            <Pressable onPress={()=> handleVerifyAddress()}>
                                <Image source={require('../../../assets/images/scan2.png')} resizeMode='contain' style={styles.send_input_img}/>
                            </Pressable>
                            :
                            <Image source={require('../../../assets/images/addaddress.png')} resizeMode='contain' style={styles.send_input_img}/>
                        }


                    </View>
                    {
                      (isFetching)? 
                      
                      <View style={[styles.page_error_text_wrap,{width:'100%'}]}>
                      <Text style={styles.page_error_text1}>Checking...</Text>
                     
                     </View>
                      :null
                      
                    }

                 {/* {
                      (isprocessing)? 
                      
                      <View style={[styles.page_error_text_wrap,{width:'100%'}]}>
                      <Text style={styles.page_error_text1}>Processing...</Text>
                     
                     </View>
                      :null
                      
                    } */}

                    {
                        (iswrong)?
                        <View style={[styles.page_error_text_wrap,{width:'100%'}]}>
                            <Text style={[styles.page_error_text1, {color: 'red'}]}>You have entered wrong crypto address</Text>
                           
                        </View>:null
                    }
             

               
            </View>



             </View>


             {
                   isprocessing?
                   <View style={[styles.deposittwo_bottom_main]}>
                   <View style={[styles.send_estimate_wrap, {paddingHorizontal:15}]}>
                       <View style={styles.send_estimate_left}>
                           <Text style={styles.send_estimate_left_a}>${fees} ~ 30 sec</Text>
                           <Text style={styles.send_estimate_left_b}>Estimated fee</Text>
                       </View>
                       <View style={styles.send_estimate_left}>
                           <Text style={styles.send_estimate_left_a} >${userData.wallets.currentBalance}</Text>
                           <Text style={styles.send_estimate_left_b}>Balance</Text>
                       </View>
                   </View>
                   <View style={styles.btn_container}>
                       <TouchableOpacity style={styles.btn_wrapper} onPress={() => handleWithConfirm()}>
                           <Text style={styles.btn_text}>Send ${withdrawalamount}</Text>
                       </TouchableOpacity>
                   </View>
                   
               </View>
               :null
               }
                              
     </View>
    );
};



export default AddAccount;
