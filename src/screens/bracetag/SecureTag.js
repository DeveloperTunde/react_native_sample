import React, { Component, useState, useEffect } from 'react';
import { View, Text, Alert,Dimensions, SafeAreaView, StatusBar,ActivityIndicator,  ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import Modal from "react-native-modal";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt} from '../redux/actions';
import { BaseUrl } from '../../constants/BaseUrl';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import ReactNativeBiometrics from 'react-native-biometrics'
import DeviceInfo from 'react-native-device-info';
import CustomAlert from '../components/CustomAlert';



const {width, height} = Dimensions.get('window');

const CELL_COUNT = 4;

const SecureTag = ({navigation}) => {

    const {isLoggedIn, isActive, userJwt} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [isCodeWrong, setIsCodeWrong] = useState(false);
    const [value, setValue] = useState('');

   
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    const [pin, setPin] = useState('');
    
    const [response, setResponse] = useState(false);
    const [responseColor, setResponseColor] = useState('#FF6D6D');
    const [showresponse, setShowResponse] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const [checking, setChecking] = useState(false);

   async function handleFaceCheck(){
  
          const rnBiometrics = new ReactNativeBiometrics()
          rnBiometrics.createKeys()
          .then( async (resultObject) => {
              const { publicKey } = resultObject
              
             await sendPublicKeyToServer(publicKey)
          })
      
  }
  
    
  function sendPublicKeyToServer(publicKey){

      const deviceId = DeviceInfo.getUniqueId();
      const data = {
          "key": publicKey,
          "deviceId": deviceId,
        };
     

      fetch(`${BaseUrl}/users/enroll`, {
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
           console.log('Enroll Response', responseJSON )
            if(responseJSON.status == true && responseJSON.statusCode == 201){
                setAlertMessage(responseJSON.message)
                setShowAlert(true)

                setTimeout(() => {
                  dispatch(setIsLoggedIn(true))
                  dispatch(setIsActive(true))
                }, 5000);
            }else{
               
            }
           
        }).catch((error) => {
           console.log(error);  
        })   

  }


  function handleSecureRoute(){
    dispatch(setIsLoggedIn(true))
    dispatch(setIsActive(true))
  }
     
    function IsCodeWrong(){
        if(pin.length == 4){
            setChecking(true)
            setResponse('Please wait...')
            setShowResponse(true)
            const data = { 
                "pin": pin
            };
            fetch(`${BaseUrl}/pin/create`, {
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
                 console.log(responseJSON);
                 if(responseJSON.status == true && responseJSON.statusCode == 201){
                    setResponse(responseJSON.message)
                    setResponseColor(Colors.green)
                    setModalVisible(false)
                    setTimeout(() => {
                        dispatch(setIsLoggedIn(true))
                        dispatch(setIsActive(true))
                    }, 2000);
                    
                 }else{
                    setResponse(responseJSON.error.message)

                 }
                 
              }).catch((error) => {
                 console.log(error);  
              })  

            
            
        }
    }

   

    function handlePinSuccess(){
        setShowAlert2(false)
        setModalVisible(false)
        dispatch(setIsLoggedIn(true))
    }
    
    useEffect(() => {
       IsCodeWrong();
    
    },[pin]);



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

   
    return (

            <View style={styles.page_container}>
                {/* <MyStatusBar 
                  translucent
                   backgroundColor={modalVisible? Colors.black:Colors.background}
                   barStyle={modalVisible? 'light-content': 'default'}
                 /> */}
                
               
                <CustomeStatusBar 
                   backgroundColor={modalVisible? Colors.black:Colors.background}
                   barStyle={modalVisible? 'light-content': 'dark-content'}
                 />
                <View style={styles.page_wrapper}>
                
                    <View style={styles.page_wrapper_top}>
                    <AuthHeader goback={()=> navigation.goBack()}/>
                    <Text style={styles.page_title}>Secure your account </Text>
                    <Text style={styles.page_subtitle}>How would you love to login to Brace in the future?</Text>

                    <View style={styles.secure_wrapper}>
                        <Pressable style={styles.secure_box} onPress={() => setModalVisible(true)}>
                            <View style={styles.secure_box_left}>
                                <Text style={styles.secure_box_left_1}>PIN</Text>
                                <Text style={styles.secure_box_left_2}>Create a PIN to login to Brace</Text>
                            </View>
                            <Image source={require('../../assets/images/pin.png')} style={styles.secure_box_img} resizeMode='contain'/>
                        </Pressable>

                        {/* <Pressable style={styles.secure_box}>
                            <View style={styles.secure_box_left}>
                                <Text style={styles.secure_box_left_1}>EMAIL & PHONE</Text>
                                <Text style={styles.secure_box_left_2}>Require your email & password each time</Text>
                            </View>
                            <Image source={require('../../assets/images/keypad.png')} style={styles.secure_box_img} resizeMode='contain'/>
                        </Pressable>

                       */}
                        <Pressable style={styles.secure_box} onPress={()=> handleFaceCheck()}>
                            <View style={styles.secure_box_left}>
                                <Text style={styles.secure_box_left_1}>FACE ID</Text>
                                <Text style={styles.secure_box_left_2}>Unlock with facial recognition</Text>
                            </View>
                            <Image source={require('../../assets/images/faceid.png')} style={styles.secure_box_img} resizeMode='contain'/>
                        </Pressable> 
                    </View>
                    
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    isVisible={modalVisible}
                    deviceWidth={width}
                    style={styles.modal}
                    onSwipeComplete={() => setModalVisible(false)}
                    swipeDirection="down"
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalView_back_wrapper} >
                            <Pressable style={styles.modalView_back_btn} onPress={() => setModalVisible(!modalVisible)}>

                            </Pressable>
                        </View>
                    <View style={styles.modal_page_wrapper}>
                    <View style={styles.modal_page_wrapper_top}>
                    <Text style={styles.page_title}>Select a 4-digit PIN to secure your account </Text>
                    <Text style={styles.page_subtitle}>Please enter the 4-digit PIN of your choice</Text>
                   
                    <View style={styles.code_input_wrapper}>
                   {
                      InputData.map((input)=>{
                        return(
                              <View style={styles.codeFieldRoot}>
                                <Text
                                    key={input.index}
                                    style={[styles.cell, isFocused == input.index  && styles.focusCell, isCodeWrong && styles.codeError]}
                                  >
                                    {(isFocused == input.index  ? <Cursor /> : pin.length-1 >= input.index? pin[input.index] :null )}
                                </Text>
                            </View>
                        )
                      })
                    }
                   </View>


                     {
                      (showresponse && pin.length == 4)? 
                      <View style={styles.page_error_text_wrap}>
                          {/* <Text style={[styles.page_error_text1, {color:responseColor}]}>{response}</Text> */}
                          <ActivityIndicator color={Colors.button}/>
                      </View>
                      :null
                      
                    }
                    


                    </View>


                    <View style={styles.page_wrapper_bottom_key}>
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
                    </View>
                </Modal>
                
                
                <CustomAlert 
                      show={showAlert} 
                      message={alertMessage} 
                      buttonTitle='Close'
                      onConfirmPressed={() => {
                         handleSecureRoute()
                        }} 
                      type='error'
                      
                    /> 
            </View>
       
    );
};


export default SecureTag;
