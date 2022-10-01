import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import { Icon, Switch } from 'react-native-elements';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import AwesomeAlert from 'react-native-awesome-alerts';
import { BaseUrl } from '../../constants/BaseUrl';
import CountryPicker from 'react-native-country-picker-modal';
import { Flags } from '../../constants/CountryFlags';
import CustomAlert from '../components/CustomAlert';

const ForgotPasswordPhoneTwo = ({navigation}) => {
   

    const [checked, setChecked] = useState(false);
    function handleSetCheck(){
        setChecked(!checked);
    }

    const [isActiveOne, setActiveOne] = useState(false);
    
    const [email, setEmail] = useState('');
    const [phonenumber, setPhone] = useState('');
    const [password, setPassword] = useState('');
 
     const onChangeHandler = (name, value) => {
       if(name=="password"){
         setPassword(value)
       }else if (name=="email") {
         setEmail(value);
       }else if (name=="phonenumber") {
         setPhone(value)
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
      const [countryCode, setCountryCode] = useState('234');

      function handleRequest(){
        setIsLoading(true)
        const data = { 
            "phoneNumber": '+'+countryCode+phonenumber,
        };
        fetch(`${BaseUrl}/auth/forgot-password`, {
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
           })
          .then((response) => response.json())
          .then((responseJSON) => {
            setIsLoading(false);
            // console.log(responseJSON);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
              setAlertTitle2('Password Reset Code Sent')
              setAlertMessage2('A password reset code has been sent to your mobile phone')
              setAlertTitleColor2(Colors.green)
              setShowAlert2(true)
               
             }else{
              setAlertTitle('Reset Password Error')
              setAlertMessage(responseJSON.error.message)
              setShowAlert(true)
             }
             
          }).catch((error) => {
             console.log(error); 
             setIsLoading(false); 
          }) 
    }

    function handleRoute(){
      setShowAlert2(false)
      navigation.navigate('ForgotPasswordPhoneTwo', {phonenumber:'+'+countryCode+phonenumber})
     
      
    }

    const [showCountries, setShowCountries] = useState(false);
      const [flag, setFlag] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeBAMAAACs80HuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABVQTFRFNqEAOaIDKpsAvN+p/////P77u9+patqPNQAAAAFiS0dEBI9o2VEAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAdSURBVCjPY2AAAUZlVxcgCEkSYECAUcFRQRoJAgDKtUNjjeTzkwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMy0xMC0wN1QxMzoxNTowMCswMjowMHb0YAsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTMtMTAtMDdUMTM6MTU6MDArMDI6MDAHqdi3AAAAAElFTkSuQmCC');


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
                    <Text style={styles.page_title}>Forgot Password</Text>


                    <View style={styles.form_group}>
                            <Text style={styles.form_label}>Enter your phone number</Text>
                           

                         <View style={(isActiveOne)?styles.input_group_focus:styles.input_group}>
                            <CountryPicker
                                
                                withFlag={true}
                                withFilter={true}
                                withCallingCode={true}
                                withEmoji={true}
                                withAlphaFilter={true}
                                // when picker button press you will get the country object with dial code
                                onSelect={(item) => {
                                setCountryCode(item.callingCode);
                                setShowCountries(false);
                                setFlag(Flags[item.cca2])
                                console.log('fllllg', item.callingCode)
                                }}
                                onOpen={() => {
                                    setActiveOne(true)
                                }}
                                visible={showCountries}
                                
                                CallingCode={countryCode}
                                placeholder={
                                    <View style={styles.input_group_country} >
                                     <Image source={{uri:flag}} resizeMode='contain' style={styles.input_group_country_imge}/>
                                     <Text style={styles.input_group_country_text}>{countryCode}</Text>
                                     <Icon name={'caret-down'} type='font-awesome' color={Colors.black} size={14} style={styles.input_group_country_icon}/>
                                     
                                </View>
                                }
                                containerButtonStyle={styles.input_group_country_wrap}
                            />
                               
                              <TextInput 
                                placeholder='Phone number'
                                keyboardType='phone-pad'
                                placeholderTextColor={Colors.placeholder}
                                value={phonenumber}
                                onChangeText={(value)=>onChangeHandler('phonenumber',value)}
                                onFocus={() => setActiveOne(true)}
                                onBlur={() => setActiveOne(false)}
                                style={styles.form_input_type_1_group}
                            />
                            </View>
                        </View>




                        <Pressable onPress={()=> navigation.navigate('ForgotPasswordEmail')}>
                           <Text style={styles.use_email}>Use Email Address Instead</Text>
                        </Pressable>
                        
                        
                        
                       
                    </View>
                    <View style={styles.page_wrapper_bottom}>
                        <View style={styles.btn_container}>
                            {(phonenumber != '')?
                            (!isLoading)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleRequest()}>
                                {/* handleRoute handleRequest */}
                                 <Text style={styles.btn_text}>Reset Password</Text>
                             </TouchableOpacity>
                             :
                             <TouchableOpacity style={styles.btn_wrapper2} >
                                 {/* <Text style={styles.btn_text}>Requesting</Text> */}
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
