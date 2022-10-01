import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;
const CODE = 1234;
const RegisterEmailTwo = ({navigation}) => {
  const [isCodeWrong, setIsCodeWrong] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

 function IsCodeWrong(){
     if(value.length == 4){
        if(value != CODE){
          setIsCodeWrong(true);
        }else{
            navigation.navigate('BraceTagIndex')
        }
     }
 }

 useEffect(() => {
    IsCodeWrong();

 });

 useEffect(() => {
   if(isCodeWrong){
    setIsCodeWrong(false);
   }
}, [value]);
    return (
        
      <View style={styles.page_container}>
               
        <CustomeStatusBar 
            backgroundColor={Colors.background}
            barStyle={'dark-content'}
          />
        <View style={styles.page_wrapper}>
                    <View style={styles.page_wrapper_top}>
                    <AuthHeader goback={()=> navigation.goBack()}/>
                    <Text style={styles.page_title}>Confirm your email address </Text>
                    <Text style={styles.page_subtitle}>Please enter the 4-digit code sent to your email address</Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        autoFocus={true}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell, isCodeWrong && styles.codeError]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                        )}
                    />
                    {
                      (isCodeWrong)? 
                      <View style={styles.page_error_text_wrap}>
                          <Text style={styles.page_error_text1}>Incorrect code entered, </Text>
                          <Text style={styles.page_error_text2}>Request new code</Text>
                      </View>
                      :
                      <Text></Text>
                    }
                    </View>
                     
                    <View style={styles.page_wrapper_bottom}>
                      {
                          (!isCodeWrong)?
                          <View style={[styles.page_error_text_wrap, {justifyContent:'center'}]}>
                             <Text style={styles.page_error_text1}>Didn’t receive the code? </Text>
                             <Text style={styles.page_error_text2}> Request again</Text>
                          </View>:
                          <Text></Text>
                      }
                    </View>
                </View>

            </View>
       
    );
};


export default RegisterEmailTwo;
