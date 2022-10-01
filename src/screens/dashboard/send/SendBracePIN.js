
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInner';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import { useSelector, useDispatch } from 'react-redux'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { BaseUrl } from '../../../constants/BaseUrl';

const SendPIN = ({route, navigation}) => {

    const {contact} = route.params;
    const account = {}
    const country ='NG'

    const {isLoggedIn, isActive, sendamount,userJwt, withdrawalamount} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();

    const [pin, setPin] = useState('');
    const [isCodeWrong, setIsCodeWrong] = useState(false);
    const [checking, setChecking] = useState(false);
    const [checkAction, setCheckingAction] = useState('');
   
    function IsCodeWrong(){
      if(pin.length == 4){
        setCheckingAction('Checking')
        setChecking(true)
  
      const data = { 
         "pin": pin
      };
      fetch(`${BaseUrl}/pin/validate`, {
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
           //console.log(responseJSON);
           setChecking(false);
           if(responseJSON.status == true && responseJSON.statusCode == 200){
               handleSuccessfullSend()
            // navigation.navigate('SendSuccess')
            
           }else{
             setIsCodeWrong(true);
           }
           
        }).catch((error) => {
          setChecking(false)
           // console.log(error);  
           setIsCodeWrong(true);
          
        })   
      }
    }
  
  useEffect(() => {
    IsCodeWrong();
  
  },[pin]);
  
  useEffect(() => {
    if(isCodeWrong){
     setIsCodeWrong(false);
    }
  }, [pin]);
  
  
  const InputData = [
    { name: 'First', index:'0' },
    { name: 'Second', index:'1' },
    { name: 'Third', index:'2' },
    { name: 'Four', index:'3' },  
  ];
  
  
  
  useEffect(() => {
    if (pin.length == 0) {
      setIsFocused(pin.length)
    }else{
      setIsFocused(pin.length)
    }
  
  }, [pin])
  
  
  const [isFocused, setIsFocused] = useState(0)


 function handleSuccessfullSend() {
  const data = {
    "amount": sendamount,
    "recipient": contact.username,
    "pin": pin
  }
 fetch(`${BaseUrl}/wallet/brace-transfer`, {
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
      console.log('withdraw status',responseJSON);
    
      if(responseJSON.status == true && responseJSON.statusCode == 200){
         navigation.navigate('SendSuccess', {content:` sent to ${recipient.name} Successfully!`})
      }else{
       // setIsCodeWrong(true);
       navigation.navigate('SendFailure',{content:`Transaction failed!`})
      }
      
   }).catch((error) => {
     
      // console.log(error);  
      //setIsCodeWrong(true);
     
   })   
 }
  


    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />
                <View style={{width: '100%'}}>
                <Text style={styles.page_title}>Enter your transaction PIN </Text>
                    <Text style={styles.page_subtitle}>To complete this transaction, please enter your transaction PIN</Text>
                    <View style={styles.code_input_wrapper}>
                        {
                            InputData.map((input)=>{
                              return(
                                    <View style={styles.codeFieldRoot}>
                                      <Text
                                          key={input.index}
                                          style={[styles.cell, isFocused == input.index  && styles.focusCell, isCodeWrong && styles.codeError]}
                                        >
                                          {(isFocused == input.index  ? <Cursor /> : pin.length-1 >= input.index?'*' :null )}
                                      </Text>
                                  </View>
                              )
                            })
                          }
                   </View>
                   {
                      (checking)? 
                      <View style={styles.page_error_text_wrap}>
                          {/* <Text style={styles.page_error_text1}>{checkAction}...</Text> */}
                          <ActivityIndicator color={Colors.button}/>
                      </View>
                      :null
                      
                    }
                    {
                      (isCodeWrong)? 
                      <View style={styles.page_error_text_wrap}>
                          <Text style={styles.page_error_text1}>Incorrect code entered </Text>
                          {/* <Text style={styles.page_error_text2}>Request new code</Text> */}
                      </View>
                      :
                      <Text></Text>
                    }

                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                {
                        (!checking)?
                        <View style={styles.keyboard_wrap}>
                    
                        <VirtualKeyboard color={Colors.neutral}
                                pressMode='string'
                                onPress={(val) => setPin(val)}
                                cellStyle={styles.keyboard_key}
                                textStyle={styles.keyboard_key_text}
                                rowStyle={styles.keyboard_row2} />
                      </View>: null
                      }
            
               </View>
                              
     </View>
    );
};



export default SendPIN;
