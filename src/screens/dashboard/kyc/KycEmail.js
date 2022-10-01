
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator,  NativeModules,NativeEventEmitter,} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInner';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { useSelector, useDispatch } from 'react-redux'
import { BaseUrl } from '../../../constants/BaseUrl';
import CustomAlert from '../../components/CustomAlertB';
// import {
//   MetaMapRNSdk,
// } from 'react-native-metamap-sdk';

const KycEmail = ({route, navigation}) => {

  const {isLoggedIn, isActive, userJwt, userData, assettype, networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
 
    const {forced} = route.params;

    const [isActiveOne, setActiveOne] = useState(false);
    const [isActiveTwo, setActiveTwo] = useState(false);
 
    const [email, setEmail] = useState('');
    const [accountnumber, setAccountNumber] = useState('');
 
     const onChangeHandler = (name, value) => {
       if(name=="accountnumber"){
         setAccountNumber(value)
       }else if (name=="email") {
         setEmail(value);
       }else if (name=="phonenumber") {
         setPhone(value)
       }
      }



  const [showAlert2, setShowAlert2] = useState(false);
  const [alertTitle2, setAlertTitle2] = useState('');
  const [alertMessage2, setAlertMessage2] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  function handleEmailVerification(){
    setIsAdding(true);
    const data = {
      "email": email,
    }

  fetch(`${BaseUrl}/users/email`, {
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
      setIsAdding(false);
      console.log(responseJSON); 
       if(responseJSON.status == true && responseJSON.statusCode == 200){
           navigation.navigate('KycPIN',{email})
       }else if(responseJSON.error.error == 'Conflict'){
        navigation.navigate('KycPIN',{email})
       }
       
    }).catch((error) => {
      setIsAdding(false);
       console.log(error);  
     
    })  
    
  }


    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={!forced} title="" />


                <View style={styles.deposittwo_main_top_main}>    
                    <Text style={styles.page_title}>Email verification</Text>
                    <Text style={styles.page_subtitle2}>Input the email address to be registered.</Text>
                </View>

                <View style={{width: '100%'}}>

                <View style={styles.form_group}>
                <Text style={styles.form_label}>Enter your email address</Text>
                  <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                    <TextInput 
                        placeholder='Email address'
                      
                        placeholderTextColor={Colors.placeholder}
                        value={email}
                        onChangeText={(value)=>onChangeHandler('email',value)}
                        onFocus={() => setActiveTwo(true)}
                        onBlur={() => setActiveTwo(false)}
                        style={styles.form_input_type_2}
                        />

                   </View>
                </View>



                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        {
                            ( email != '')?
                            (!isAdding)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleEmailVerification()}>
                                <Text style={styles.btn_text}>Submit </Text>
                            </TouchableOpacity>
                             :
                             <TouchableOpacity style={styles.btn_wrapper2} >
                                
                                 <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:5}}/>
                             </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <Text style={styles.btn_text}>Submit </Text>
                            </TouchableOpacity>
                        }
                        
                    </View>
            
               </View>

              <CustomAlert 
                      show={showAlert2} 
                      message={alertMessage2} 
                      buttonTitle='Continue'
                      onConfirmPressed={() => {
                        handleAccountRoute()
                        }} 
                      type='successs'
                      
                    />           
     </View>
    );
};



export default KycEmail;
