import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';

const RegisterEmailOne = ({navigation}) => {
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
    return (
        
        <View style={styles.page_container}>
               
        <CustomeStatusBar 
            backgroundColor={Colors.background}
            barStyle={'dark-content'}
          />
         <View style={styles.page_wrapper}>
                
                    <View style={styles.page_wrapper_top}>
                    <AuthHeader goback={()=> navigation.goBack()}/>
                    <Text style={styles.page_title}>Create an account</Text>
                        
                        <View style={styles.form_group}>
                            <Text style={styles.form_label}>Enter your email address</Text>
                            <TextInput 
                                placeholder='Email address'
                                placeholderTextColor={Colors.placeholder}
                                value={phonenumber}
                                onChangeText={(value)=>onChangeHandler('phonenumber',value)}
                                onFocus={() => setActiveOne(true)}
                                onBlur={() => setActiveOne(false)}
                                style={(isActiveOne)?styles.form_input_focus_1:styles.form_input_type_1}
                            />
                        </View>
                        <Pressable onPress={()=> navigation.navigate('RegisterPhoneOne')}>
                           <Text style={styles.use_email}>Use Phone Number Instead</Text>
                        </Pressable>
                        <View style={styles.form_group}>
                            <Text style={styles.form_label}>Select a password</Text>
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
                        </View>
                        <View style={styles.attest_wrapper}>
                            <Pressable style={styles.attest_img_wrap} onPress={() => handleSetCheck()}>
                            {
                                (!checked)?<Image source={require('../../assets/images/empty_check.png')} resizeMode='contain' style={styles.attest_img}/>:
                                <Image source={require('../../assets/images/mark_check.png')} resizeMode='contain' style={styles.attest_img}/>
                            }
                            </Pressable>
                            <View style={styles.attest_text_wrap}>
                                <Text style={styles.attest_text} >I certify that I am atleast 18-years old and I agree with the
                                    
                                </Text>
                                <Text style={{marginTop: 5}}>
                                    <Pressable style={{marginRight: 5}}><Text style={styles.attest_text1}>Terms of Use</Text></Pressable>
                                    <Pressable style={{marginLeft: 5}}><Text style={styles.attest_text2}> and</Text></Pressable>
                                    <Pressable style={{marginLeft: 5}}><Text style={styles.attest_text1}> Privacy Policy</Text></Pressable>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.page_wrapper_bottom}>
                        <View style={styles.btn_container}>
                            {(phonenumber != '' && password !='' && checked)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> navigation.navigate('RegisterEmailTwo')}>
                                 <Text style={styles.btn_text}>Get Started</Text>
                             </TouchableOpacity>:
                              <TouchableOpacity style={styles.btn_wrapper2} >
                                  <Text style={styles.btn_text}>Get Started</Text>
                              </TouchableOpacity>
                            }
                            
                        </View>
                        
                    </View>
                </View>

            </View>
       
    );
};


export default RegisterEmailOne;
