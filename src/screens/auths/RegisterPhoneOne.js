import React, { Component, useState , useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import { BaseUrl } from '../../constants/BaseUrl';
import AwesomeAlert from 'react-native-awesome-alerts';
import CountryPicker from 'react-native-country-picker-modal';
import { Flags } from '../../constants/CountryFlags';
import CustomAlert from '../components/CustomAlert';


const RegisterPhoneOne = ({navigation}) => {
    const {width, height} = Dimensions.get('window');

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


    const [showAlert2, setShowAlert2] = useState(false);
    const [alertTitle2, setAlertTitle2] = useState('');
    const [alertMessage2, setAlertMessage2] = useState('');
    const [alertTitleColor2, setAlertTitleColor2] = useState('#FF6D6D');

    const [isLoading, setIsLoading] = useState(false);

    const [countryCode, setCountryCode] = useState('234');

    function handleRegister(){
        setIsLoading(true);
        const data = { 
            "phoneNumber": '+'+countryCode+phonenumber, 
            "password": password , 
            "countryCode": 'NG'  
        };

        fetch(`${BaseUrl}/auth/register`, {
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
            console.log(responseJSON); 
             if(responseJSON.status == true && responseJSON.statusCode == 201){
                navigation.navigate('RegisterPhoneTwo', {userdata:{phonenumber: '+'+countryCode+phonenumber, password: password} })
             }else{
                 setAlertTitle('Registration Error')
                 setAlertMessage(responseJSON.error.message)
                 setShowAlert(true)
             }
             
          }).catch((error) => {
             console.log(error);  
            //  setAlertTitle('Registration Error2')
            //  setAlertMessage(error.message)
            //  setShowAlert(true)
            //  setIsLoading(false);
          })    
      }


      function handlePhoneRoute(){
        setShowAlert2(false)
        
        //navigation.navigate('SecureTag')
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
                    {/* <AuthHeader goback={()=> navigation.goBack()}/> */}
                    <Text style={styles.page_title}>Create an account</Text>

                        <View style={styles.form_group}>
                              <Text style={styles.form_label}>Enter your phone number</Text>  
                          
                            {/* <TextInput 
                                placeholder='Phone number'
                                keyboardType='number-pad'
                                placeholderTextColor={Colors.placeholder}
                                value={phonenumber}
                                onChangeText={(value)=>onChangeHandler('phonenumber',value)}
                                onFocus={() => setActiveOne(true)}
                                onBlur={() => setActiveOne(false)}
                                style={(isActiveOne)?styles.form_input_focus_1:styles.form_input_type_1}
                            /> */}
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
                                //console.log('fllllg', Flags[item.cca2])
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
                        {/* <Pressable onPress={()=> navigation.navigate('RegisterEmailOne')}>
                           <Text style={styles.use_email}>Use Email Address Instead</Text>
                        </Pressable> */}
                        <View style={styles.form_group}>
                            <Text style={styles.form_label}>Select a password</Text>
                            <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                                <TextInput 
                                    placeholder='Enter Password'
                                    secureTextEntry={passwordShown}
                                    placeholderTextColor={Colors.placeholder}
                                    value={password}
                                    onChangeText={(value)=>onChangeHandler('password',value)}
                                    onFocus={() => setActiveTwo(true)}
                                    onBlur={() => setActiveTwo(false)}
                                    style={styles.form_input_type_2}
                                />
                                 <View style={styles.form_input_type_2_icon}>
                                    <Icon
                                        name={(passwordShown)?'eye':'eye-off'}
                                        type='feather'
                                        color='#111827'
                                        onPress={() => handlePasswordToggle()} />
                                 </View>
                            </View>
                        </View>
                        <View style={styles.attest_wrapper}>
                            <Pressable style={styles.attest_img_wrap} onPress={() => handleSetCheck()}>
                            {
                                (!checked)?<Image source={require('../../assets/images/empty_check.png')} resizeMode='contain' style={styles.attest_img}/>:
                                <Image source={require('../../assets/images/mark_check.png')} resizeMode='contain' style={styles.attest_img}/>
                            }
                            </Pressable>
                            {
                                (width < 370)?
                                <View style={styles.attest_text_wrap}>
                                <Text style={styles.attest_text} >I certify that I am atleast 18-years old and I agree 
                                    
                                </Text>
                                
                                <Text style={{marginTop: 5}}>
                                <Pressable style={{marginRight: 5}}><Text style={styles.attest_text2}>with the</Text></Pressable>
                                    <Pressable style={{marginRight: 5}}><Text style={styles.attest_text1}> Terms of Use </Text></Pressable>
                                    <Pressable style={{marginLeft: 5}}><Text style={styles.attest_text2}> and</Text></Pressable>
                                    <Pressable style={{marginLeft: 5}} ><Text style={styles.attest_text1}> Privacy Policy</Text></Pressable>
                                    {/* <Pressable style={{marginLeft: 5}} onPress={() => navigation.navigate('RegisterPhoneTwo', {phonenumber: phonenumber})}><Text style={styles.attest_text1}> Privacy Policy</Text></Pressable> */}
                                </Text>
                            </View>:
                            <View style={styles.attest_text_wrap}>
                            <Text style={styles.attest_text} >I certify that I am atleast 18-years old and I agree with the
                                
                            </Text>
                            
                            <Text style={{marginTop: 5}}>
                                <Pressable style={{marginRight: 5}}><Text style={styles.attest_text1}>Terms of Use</Text></Pressable>
                                <Pressable style={{marginLeft: 5}}><Text style={styles.attest_text2}> and</Text></Pressable>
                                <Pressable style={{marginLeft: 5}} ><Text style={styles.attest_text1}> Privacy Policy</Text></Pressable>
                                {/* <Pressable style={{marginLeft: 5}} onPress={() => navigation.navigate('RegisterPhoneTwo', {userdata:{phonenumber: phonenumber, password: password} })}><Text style={styles.attest_text1}> Privacy Policy</Text></Pressable> */}
                            </Text>
                        </View>
                            }
                        </View>
                    </View>
                    <View style={styles.page_wrapper_bottom}>
                      <View style={styles.btn_container}>
                        <View style={styles.btn_container}>
                            {(phonenumber != '' && password !='' && checked)?
                            (!isLoading)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleRegister()}>
                                {/* handlePhoneRoute handleRegister*/}
                                 <Text style={styles.btn_text}>Get Started</Text>
                             </TouchableOpacity>
                             :
                             <TouchableOpacity style={styles.btn_wrapper2}  >
                                 {/* <Text style={styles.btn_text}>Requesting</Text> */}
                                 <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:0}}/>
                             </TouchableOpacity>
                             :
                              <TouchableOpacity style={styles.btn_wrapper2} >
                                  <Text style={styles.btn_text}>Get Started</Text>
                              </TouchableOpacity>
                            }
                            
                        </View>
                        <View style={styles.link_wrapper}>
                            <Text style={styles.link_wrapper_text101}>Already joined? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignInPhone')}>
                                <Text style={styles.link_wrapper_text2}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </View>


                {/* <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    //title={alertTitle}
                    message={alertMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Okay"
                    confirmButtonColor={Colors.red}
                    onCancelPressed={() => {
                        setShowAlert(false)
                    }}
                    onConfirmPressed={() => {
                        setShowAlert(false)
                    }}
                    messageStyle={styles.alert_message}
                    overlayStyle={styles.alert_overlay}
                    contentContainerStyle={styles.alert_content_container}
                    confirmButtonStyle={styles.alert_button}
                    confirmButtonTextStyle={styles.alert_button_text}
                    /> */}

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
                        handlePhoneRoute()
                        }} 
                      type='successs'
                      
                    /> 

                {/* <AwesomeAlert
                    show={showAlert2}
                    showProgress={false}
                    //title={alertTitle2}
                    message={alertMessage2}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Continue"
                    confirmButtonColor={Colors.green}
                    onCancelPressed={() => {
                        setShowAlert(false)
                    }}
                    onConfirmPressed={() => {
                        handlePhoneRoute()
                    }}
                    messageStyle={styles.alert_message}
                    overlayStyle={styles.alert_overlay}
                    contentContainerStyle={styles.alert_content_container}
                    confirmButtonStyle={styles.alert_button}
                    confirmButtonTextStyle={styles.alert_button_text}

                    />      */}

            </View>
       
    );
};


export default RegisterPhoneOne;
