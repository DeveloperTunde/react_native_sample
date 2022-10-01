import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';
import { Icon, Switch } from 'react-native-elements';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';

const ForgotPasswordEmail = ({navigation}) => {
   

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
    return (
       
      <View style={styles.page_container}>
               
            <CustomeStatusBar 
                backgroundColor={Colors.background}
                barStyle={'dark-content'}
              />
            <View style={styles.page_wrapper}>
                    <View style={styles.page_wrapper_top}>
                    <AuthHeader goback={()=> navigation.goBack()}/>
                    <Text style={styles.page_title}>Forgot Password</Text>

                    <View style={styles.form_group}>
                            <Text style={styles.form_label}>Enter your email address</Text>
                            <TextInput 
                                placeholder='Email address'
                                value={phonenumber}
                                placeholderTextColor={Colors.placeholder}
                                onChangeText={(value)=>onChangeHandler('phonenumber',value)}
                                onFocus={() => setActiveOne(true)}
                                onBlur={() => setActiveOne(false)}
                                style={(isActiveOne)?styles.form_input_focus_1:styles.form_input_type_1}
                            />
                        </View>
                        <Pressable onPress={()=> navigation.navigate('ForgotPasswordPhone')}>
                           <Text style={styles.use_email}>Use Phone Number Instead</Text>
                        </Pressable>
                        
                        
                       
                    </View>
                    <View style={styles.page_wrapper_bottom}>
                        <View style={styles.btn_container}>
                            {(phonenumber != '')?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> navigation.navigate('RegisterPhoneTwo')}>
                                 <Text style={styles.btn_text}>Reset Password</Text>
                             </TouchableOpacity>:
                              <TouchableOpacity style={styles.btn_wrapper2} >
                                  <Text style={styles.btn_text}>Reset Password</Text>
                              </TouchableOpacity>
                            }
                            
                        </View>
                        
                    </View>
                </View>

            </View>
        
    );
};


export default ForgotPasswordEmail;
