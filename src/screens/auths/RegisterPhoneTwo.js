import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import { Icon } from 'react-native-elements';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import { BaseUrl } from '../../constants/BaseUrl';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt} from '../redux/actions';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import CustomAlert from '../components/CustomAlert';



const CELL_COUNT = 4;
const CODE = 1234;

const RegisterPhoneTwo = ({route, navigation}) => {

 const {userdata} = route.params;
 const {isLoggedIn, isActive } = useSelector(state => state.userReducer);
 const dispatch     = useDispatch();

  const [pin, setPin] = useState('');
  const [isCodeWrong, setIsCodeWrong] = useState(false);


  const [checking, setChecking] = useState(false);
  const [checkAction, setCheckingAction] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitleColor, setAlertTitleColor] = useState('#FF6D6D');
 

  function IsCodeWrong(){
    if(pin.length == 4){
      setCheckingAction('Checking')
      setChecking(true)
    const data = { 
        "code": pin , 
        "action": "REGISTRATION",
        "phoneNumber": userdata.phonenumber,
        "mode": "SMS",
    };
    fetch(`${BaseUrl}/otp/confirm-code`, {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
       })
      .then((response) => response.json())
      .then((responseJSON) => {
         //console.log(responseJSON);
         setChecking(false)
         if(responseJSON.status == true && responseJSON.statusCode == 200){
           handleLogin();
           
         }else{
           setIsCodeWrong(true);
         }
         
      }).catch((error) => {
         console.log(error);  
         setChecking(false)
      })   
    }
  }


  function handleLogin(){
    setCheckingAction('Verifying')
    setChecking(true)
    const data = { 
      "phoneNumber": userdata.phonenumber,
      "password": userdata.password,
      "countryCode": "NG",
  };
  fetch(`${BaseUrl}/auth/login`, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
     })
    .then((response) => response.json())
    .then((responseJSON) => {
       //console.log(responseJSON);

       setChecking(false)
       if(responseJSON.status == true && responseJSON.statusCode == 200){
        saveUserAuth(responseJSON.data.token)
       
       }else{
        setAlertTitle('Account Error')
        setAlertMessage(responseJSON.error.message)
        setShowAlert(true)
       }
       
    }).catch((error) => {
       console.log(error);  
       setChecking(false)
    }) 
   
  }


async function saveUserAuth(a) {
  try {
      await AsyncStorage.setItem('UserJWTAysnc', JSON.stringify(a));
      dispatch(setUserJwt(a));
      navigation.navigate('BraceTagIndex');
  } catch (error) {
      //console.log(error);
  }
}

  function handleOTPResend(){
    const data = { 
        "mode": "SMS",
        "action": "REGISTRATION",
        "phoneNumber": userdata.phonenumber, 
    };

    fetch(`${BaseUrl}/otp/resend-code`, {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
       })
      .then((response) => response.json())
      .then((responseJSON) => {
         //console.log(responseJSON); 
         if(responseJSON.status == true && responseJSON.statusCode == 200){
            setAlertTitle('OTP Resent!')
            setAlertMessage(responseJSON.message)
            setAlertTitleColor(Colors.green);
            setShowAlert(true)
         }else{
             setAlertTitle('OTP Error')
             setAlertMessage(responseJSON.error.message)
             setShowAlert(true)
         }
         
      }).catch((error) => {
         console.log(error);  
        
      })    
  }




    useEffect(() => {
      IsCodeWrong();
    }, [pin]);

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
   
   
  
    function handlesetPin(a){
      setPin(a);
      
    }
  
    useEffect(() => {
      if (pin.length == 0) {
        setIsFocused(pin.length)
      }else{
        setIsFocused(pin.length)
      }
  
    }, [pin])
    
  
    const [isFocused, setIsFocused] = useState(0)


    const [showAlert2, setShowAlert2] = useState(false);
    const [alertTitle2, setAlertTitle2] = useState('');
    const [alertMessage2, setAlertMessage2] = useState('');
    const [alertTitleColor2, setAlertTitleColor2] = useState('#FF6D6D');

    // useEffect(() => {
    //   setAlertTitle2('Registration Success')
    //   setAlertMessage2('An OTP has been sent to your phone number. Use the OTP to activate your phone number')
    //   setAlertTitleColor2(Colors.green)
    //   setShowAlert2(true)
    
    // }, [])


    useEffect(() => {
      if(!showAlert){
          return
      }
      setTimeout(() => {
          setShowAlert(false)
      }, 5000);
    }, [showAlert])


  useEffect(() => {
    if(!showAlert2){
        return
    }
    setTimeout(() => {
      setShowAlert2(false)
    }, 5000);
  }, [showAlert2])


    
    
    return (
       
      <View style={styles.page_container}>
               
      <CustomeStatusBar 
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
       <View style={styles.page_wrapper}>
                    <View style={styles.page_wrapper_top}>
                    <AuthHeader goback={()=> navigation.goBack()}/>
                    <Text style={styles.page_title}>Confirm your phone number </Text>
                    <Text style={styles.page_subtitle}>Please enter the 4-digit code sent to your phone number</Text>
                    

                    <View style={styles.code_input_wrapper}>
                        {
                            InputData.map((input)=>{
                              return(
                                    <View style={styles.codeFieldRoot}>
                                      <Text
                                          key={input.index}
                                          style={[styles.cell, isFocused == input.index  && styles.focusCell, isCodeWrong && styles.codeError]}
                                        >
                                          {(isFocused == input.index  ? <Cursor style={{display:'none'}} /> : pin.length-1 >= input.index?'*' :null )}
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
                          <Text style={styles.page_error_text1}>Incorrect code entered, </Text>
                          <Pressable onPress={()=> handleOTPResend()}>
                              <Text style={styles.page_error_text2}>Request new code</Text>
                          </Pressable>
                      </View>
                      :
                      <Text></Text>
                    }

                    


                    </View>
                    <View style={styles.page_wrapper_bottom2}>
                      {
                          (!isCodeWrong)?
                          <View style={[styles.page_error_text_wrap, {justifyContent:'center'}]}>
                             <Pressable >
                                <Text style={styles.page_error_text1}>Didn’t receive the code? </Text>
                             </Pressable>
                             <Pressable onPress={() => handleOTPResend()}>
                                <Text style={styles.page_error_text2}> Request again</Text>
                             </Pressable>
                             
                          </View>:
                          <Text></Text>
                      }

                      {
                         (!checking)?
                       <View style={styles.keyboard_wrap}>
                          <VirtualKeyboard 
                                  color={Colors.neutral}
                                  pressMode='string'
                                  onPress={(val) => handlesetPin(val)}
                                  cellStyle={styles.keyboard_key}
                                  textStyle={styles.keyboard_key_text}
                                  rowStyle={styles.keyboard_row} />
                        </View>:null

                        }
                    </View>
                </View>
                    
               
                  
                  <CustomAlert 
                      show={showAlert} 
                      message={alertMessage} 
                      buttonTitle='Close'
                      onConfirmPressed={() => {
                         setShowAlert(false)
                        }} 
                      type='error'
                      
                    /> 


              <CustomAlert 
                      show={showAlert2} 
                      message={alertMessage2} 
                      buttonTitle='Okay'
                      onConfirmPressed={() => {
                        setShowAlert2(false)
                        }} 
                      type='successs'
                      
                    /> 
            </View>
       
    );
};


export default RegisterPhoneTwo;
