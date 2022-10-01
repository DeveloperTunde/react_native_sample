import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import { Colors } from '../constants/Colors';
import AuthHeader from './components/AuthHeader';
import { Icon } from 'react-native-elements';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { CustomeStatusBar } from '../constants/CustomeStatusBar';
import { BaseUrl } from '../constants/BaseUrl';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt} from './redux/actions';
import VirtualKeyboard from 'react-native-virtual-keyboard';



const CELL_COUNT = 4;
const CODE = 1234;

const UnlockScreen = ({navigation}) => {


 const {isLoggedIn, isActive , userJwt, userData} = useSelector(state => state.userReducer);
 const dispatch     = useDispatch();

  const [isCodeWrong, setIsCodeWrong] = useState(false);
  // const [value, setValue] = useState('');
  // const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  // const [props, getCellOnLayoutHandler] = useClearByFocusCell({
  //   value,
  //   setValue,
  // });


  const [pin, setPin] = useState('');
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
         console.log(responseJSON);
         setChecking(false)
         if(responseJSON.status == true && responseJSON.statusCode == 200){
            dispatch(setIsLoggedIn(true))
            dispatch(setIsActive(true))
         }else{
           setIsCodeWrong(true);
         }
         
      }).catch((error) => {
         console.log(error);  
         setChecking(false)
      })   
    }
  }




 async function handleLogout(){
  try {
    await AsyncStorage.removeItem('UserJWTAysnc');
    dispatch(setUserJwt(''));
    dispatch(setIsLoggedIn(false))
    dispatch(setIsActive(false))
} catch (error) {
    //console.log(error);
}
  
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
    return (
       
      <View style={styles.page_container}>
               
      <CustomeStatusBar 
          backgroundColor={Colors.background}
          barStyle={'dark-content'}
        />
       <View style={styles.page_wrapper}>
                    <View style={styles.page_wrapper_top}>
                    {/* <AuthHeader goback={()=> navigation.goBack()}/> */}
                    <Image source={{uri: userData.avatar}} style={styles.header_icon} resizeMode='contain'/>
                    <Text style={styles.page_title2}>Welcome back {(userData.firstname != null)? userData.firstname: 'User'}! Enter your 4-Digit PIN </Text>
                    <View style={styles.page_error_text_wrap}>
                    <Text style={styles.page_error_text11}>Not your account? </Text>
                          <Pressable onPress={()=> handleLogout()}>
                              <Text style={styles.page_error_text112}>Log out</Text>
                          </Pressable>
                      </View>
                    
                    {/* <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        autoFocus={true}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell, isCodeWrong && styles.codeError]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : isFocused  )}
                        </Text>
                        )}
                    /> */}

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
                          <Text style={styles.page_error_text1}>Incorrect PIN entered! </Text>
                          {/* <Pressable onPress={()=> handleOTPResend()}>
                              <Text style={styles.page_error_text2}>Request new code</Text>
                          </Pressable> */}
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
                        {/* {(isFocused == input.index  ? <Cursor /> : pin[input.index]  )} */}
                    </View>
                </View>
                    
               
            </View>
       
    );
};


export default UnlockScreen;
