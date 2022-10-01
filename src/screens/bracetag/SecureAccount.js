import React, { Component, useState, useEffect } from 'react';
import { View, Text, Alert,Dimensions, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, ActivityIndicator} from 'react-native';
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



const {width, height} = Dimensions.get('window');

const CELL_COUNT = 4;

const SecureAccount = ({navigation}) => {

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



    const [checking, setChecking] = useState(false);


     
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
               
    
                    </View>
                    



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
                                        style={[styles.cell2, isFocused == input.index  && styles.focusCell, isCodeWrong && styles.codeError]}
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
       
    );
};


export default SecureAccount;
