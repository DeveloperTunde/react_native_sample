import React, { Component, useState,useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import { Icon, Switch } from 'react-native-elements';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import { BaseUrl } from '../../constants/BaseUrl';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt} from '../redux/actions';
import CountryPicker from 'react-native-country-picker-modal';
import { Flags } from '../../constants/CountryFlags';
import CustomAlert from '../components/CustomAlert';


const SignInPhone = ({navigation}) => {

    const {isLoggedIn,userJwt,  isActive } = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();


    const [facechecked, setFaceChecked] = useState(false);
    const [pinchecked, setPinChecked] = useState(false);

    const [checked, setChecked] = useState(false);
    function handleSetCheck(){
        setChecked(!checked);
    }
    const [passwordShown, setPasswordShown] = useState(true);

    function  handlePasswordToggle(){
      setPasswordShown(!passwordShown)
    }

    const [isActiveOne, setActiveOne] = useState(false);
    const [isActiveTwo, setActiveTwo] = useState(false);

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

    const [isLoading, setIsLoading] = useState(false);

    const [countryCode, setCountryCode] = useState('234');

    function handleLogin(){
        setIsLoading(true);
        const data = { 
            "phoneNumber": '+'+countryCode+phonenumber,
            "password": password,
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
             setIsLoading(false);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                 const user = responseJSON.data.user;
                    if (user.phoneVerified == false) {
                        handleOTPResend();
                    }else if (user.braceTag == false) {
                        saveUserAuthTemp(responseJSON.data.token);
                    }else if (user.pin == false) {
                        saveUserAuthTempTwo(responseJSON.data.token);
                    }else{
                      saveUserAuth(responseJSON.data.token);
                    }
             }else{
              setAlertTitle('Account Error')
              setAlertMessage(responseJSON.error.message)
              setShowAlert(true)
             }
             
          }).catch((error) => {
             setIsLoading(false);
             console.log(error);
             
          }) 
    }


    async function saveUserAuthTemp(a) {
        try {
            await AsyncStorage.setItem('UserJWTAysnc', JSON.stringify(a));
            dispatch(setUserJwt(a));
            navigation.navigate('BraceTagIndex');
        } catch (error) {
            //console.log(error);
        }
      }


      async function saveUserAuthTempTwo(a) {
        try {
            await AsyncStorage.setItem('UserJWTAysnc', JSON.stringify(a));
            dispatch(setUserJwt(a));
            navigation.navigate('SecureAccount');
        } catch (error) {
            //console.log(error);
        }
      }


    async function saveUserAuth(a) {
        try {
            await AsyncStorage.setItem('UserJWTAysnc', JSON.stringify(a));
            dispatch(setUserJwt(a));
            dispatch(setIsLoggedIn(true))
            dispatch(setIsActive(true))
        } catch (error) {
            //console.log(error);
        }
      }


      function handleOTPResend(){
        const data = { 
            "mode": "SMS",
            "action": "REGISTRATION",
            "phoneNumber": '+'+countryCode+phonenumber,
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
                navigation.navigate('RegisterPhoneTwo', {userdata:{phonenumber: '+'+countryCode+phonenumber, password: password} })
             }else{
                 setAlertTitle('OTP Error')
                 setAlertMessage(responseJSON.error.message)
                 setShowAlert(true)
                 
             }
             
          }).catch((error) => {
             console.log(error);  
            
          })    
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
    return (
       
        <View style={styles.page_container}>
                  
        <CustomeStatusBar 
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />
        <View style={styles.page_wrapper}>
                    <ScrollView style={styles.page_wrapper_top}>
                    {/* <AuthHeader goback={()=> navigation.goBack()} /> */}
                    
                    <Text style={styles.page_title}>Welcome back</Text>

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
                         {/* <Pressable onPress={()=> navigation.navigate('SecureTag')}>
                           <Text style={styles.use_email}>Use Email Address Instead</Text>
                        </Pressable>  */}
                        <View style={styles.form_group}>
                            <Text style={styles.form_label}>Enter your password</Text>
                            <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                                <TextInput 
                                    style={styles.form_input_type_2}
                                    placeholder='Enter Password'
                                    secureTextEntry={passwordShown}
                                    placeholderTextColor={Colors.placeholder}
                                    value={password}
                                    onChangeText={(value)=>onChangeHandler('password',value)}
                                    onFocus={() => setActiveTwo(true)}
                                    onBlur={() => setActiveTwo(false)}
                                />
                                <View style={styles.form_input_type_2_icon}>
                                    <Icon
                                        name={(passwordShown)?'eye':'eye-off'}
                                        type='feather'
                                        color='#111827'
                                        onPress={() => handlePasswordToggle()} />
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordPhone')}>
                               <Text style={styles.forgot_pass_link}>Forgot password?</Text>
                            </TouchableOpacity>
                            
                        </View>

                        
                        <View style={[styles.signin_container, {marginTop: 20}]}>
                            <Text style={styles.signin_title}>Other sign-in options</Text>
                            <View style={styles.signin_wrapper}>
                                <Switch
                                    value={facechecked}
                                    onValueChange={(value) => setFaceChecked(value)}
                                    color={Colors.green}
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: -10 }}
                                    />
           
                                 <Text style={styles.signin_label}>Enable Face ID</Text>
                            </View>

                            <View style={styles.signin_wrapper}>
                                <Switch
                                    value={pinchecked}
                                    onValueChange={(value) => setPinChecked(value)}
                                    color={Colors.green}
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: -10 }}
                                    />
           
                                 <Text style={styles.signin_label}>Create a PIN</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.page_wrapper_bottom}>
                    <View style={styles.page_wrapper_bottom_signin}>
                        <View style={styles.btn_container}>
                            {(phonenumber != '' && password !='')?
                            (!isLoading)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleLogin()}>
                                 <Text style={styles.btn_text}>Sign In</Text>
                             </TouchableOpacity>
                             :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                 {/* <Text style={styles.btn_text}>Verifying</Text> */}
                                 <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:0}} />
                             </TouchableOpacity>
                             :
                              <TouchableOpacity style={styles.btn_wrapper2} >
                                  <Text style={styles.btn_text}>Sign In</Text>
                              </TouchableOpacity>
                            }
                            
                        </View>
                        <View style={styles.link_wrapper}>
                            {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordPhone')}>
                                <Text style={styles.link_wrapper_text3}>Forgot Password?</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity onPress={() => navigation.navigate('RegisterPhoneOne')}>
                                <Text style={styles.link_wrapper_text_new}>Create an account</Text>
                            </TouchableOpacity>
                        </View>
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

            </View>
    );
};


export default SignInPhone;
