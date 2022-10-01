import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import { Icon, Switch } from 'react-native-elements';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import AwesomeAlert from 'react-native-awesome-alerts';
import { BaseUrl } from '../../constants/BaseUrl';
import CustomAlert from '../components/CustomAlert';

const ForgotPasswordPhoneTwo = ({route, navigation}) => {
const {phonenumber} = route.params;

    const [checked, setChecked] = useState(false);
    function handleSetCheck(){
        setChecked(!checked);
    }

    const [isActiveOne, setActiveOne] = useState(false);
    const [isActiveTwo, setActiveTwo] = useState(false);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOTP] = useState('');
 
     const onChangeHandler = (name, value) => {
       if(name=="otp"){
         setOTP(value)
       }else if (name=="email") {
         setEmail(value);
       }else if (name=="password") {
         setPassword(value)
       }
      }


      const [showAlert, setShowAlert] = useState(false);
      const [alertTitle, setAlertTitle] = useState('');
      const [alertMessage, setAlertMessage] = useState('');
      const [alertTitleColor, setAlertTitleColor] = useState('#FF6D6D');


      const [showAlert2, setShowAlert2] = useState(false);
      const [alertTitle2, setAlertTitle2] = useState('');
      const [alertMessage2, setAlertMessage2] = useState('');
      const [alertTitleColor2, setAlertTitleColor2] = useState('#FF6D6D');

      const [isLoading, setIsLoading] = useState(false);

      function handleRequest(){
        setIsLoading(true)
        const data = { 
            "phoneNumber": phonenumber,
            "password": password,
            "code": otp
        };
        fetch(`${BaseUrl}/auth/reset-password`, {
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             console.log(responseJSON);
             setIsLoading(false)
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setAlertTitle2('Password Reset Success')
                setAlertMessage2(responseJSON.message)
                setAlertTitleColor2(Colors.green)
                setShowAlert2(true)
             }else{
              setAlertTitle('Reset Password Error')
              setAlertMessage(responseJSON.error.message)
              setShowAlert(true)
             }

          }).catch((error) => {
             setIsLoading(false)
             console.log(error);  
          }) 
    }

    function handleRoute(){
        navigation.navigate('SignInPhone');
    }

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
      handleRoute()
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
                    <Text style={styles.page_title}>Reset Password</Text>

                        <View style={styles.form_group}>
                            <Text style={styles.form_label}>Enter new password</Text>
                            <TextInput
                                placeholder='New Password'
                                placeholderTextColor={Colors.placeholder}
                                value={password}
                                onChangeText={(value)=>onChangeHandler('password',value)}
                                onFocus={() => setActiveOne(true)}
                                onBlur={() => setActiveOne(false)}
                                style={(isActiveOne)?styles.form_input_focus_1:styles.form_input_type_1}
                            />
                        </View>

                        <View style={styles.form_group}>
                            <Text style={styles.form_label}>Enter OTP  </Text>
                            <TextInput
                                placeholder='OTP'
                                keyboardType='number-pad'
                                placeholderTextColor={Colors.placeholder}
                                value={otp}
                                onChangeText={(value)=>onChangeHandler('otp',value)}
                                onFocus={() => setActiveTwo(true)}
                                onBlur={() => setActiveTwo(false)}
                                style={(isActiveTwo)?styles.form_input_focus_1:styles.form_input_type_1}
                            />
                        </View>
                        {/* <Pressable onPress={()=> navigation.navigate('ForgotPasswordEmail')}>
                           <Text style={styles.use_email}>Use Email Address Instead</Text>
                        </Pressable> */}
                        
                        
                       
                    </View>
                    <View style={styles.page_wrapper_bottom}>
                        <View style={styles.btn_container}>
                            {(password != '' && otp !='')?
                            (!isLoading)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleRequest()}>
                                 <Text style={styles.btn_text}>Reset Password</Text>
                             </TouchableOpacity>
                             :
                             <TouchableOpacity style={styles.btn_wrapper2} >
                                  {/* <Text style={styles.btn_text}>Verifying</Text> */}
                                  <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:0}} />
                              </TouchableOpacity>
                             :
                              <TouchableOpacity style={styles.btn_wrapper2} >
                                  <Text style={styles.btn_text}>Reset Password</Text>
                              </TouchableOpacity>
                            }
                            
                        </View>
                        
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
                      buttonTitle='Continue'
                      onConfirmPressed={() => {
                        handleRoute()
                        }} 
                      type='successs'
                      
                    /> 
            </View>
      
    );
};


export default ForgotPasswordPhoneTwo;
