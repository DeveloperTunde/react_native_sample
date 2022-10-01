import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt} from '../redux/actions';
import { BaseUrl } from '../../constants/BaseUrl';
import CustomAlert from '../components/CustomAlert';

const BraceTagIndex = ({navigation}) => {
    const {isLoggedIn, isActive, userJwt} = useSelector(state => state.userReducer);

    const [isLoading, setisLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);

    function handleSetCheck(a){
        setChecked(a);
    }

    function handleSetCheck2(a){
        setChecked2(a);
    }

    const [isActiveTwo, setActiveTwo] = useState(false);

    const [bracetag, setBraceTag] = useState('');
 
     const onChangeHandler = (name, value) => {
       if(name=="bracetag"){
         setBraceTag(value);
         if(value.length > 3 && value.length < 13){
            handleSetCheck(true)
         }else{
            handleSetCheck(false)
         }

        let re = /^\w+$/;
        if(!re.test(value)){
            handleSetCheck2(false)
        }else{
            handleSetCheck2(true)
        }
        
       }
      }
    
      useEffect(
        () => {
          let timer1 = setTimeout(() => setisLoading(false), 2000);
          return () => {
            clearTimeout(timer1);
          };
        },
        []
      );
    

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitleColor, setAlertTitleColor] = useState('#FF6D6D');

    const [isLoadingbtn, setIsLoadingBtn] = useState(false);

    function handleGenerateTag(){
        setIsLoadingBtn(true);
        const data = { 
            "paymentId": bracetag,
            "mode": "INAPP"
        };
        fetch(`${BaseUrl}/payment-link`, {
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
             //console.log(responseJSON);
             setIsLoadingBtn(false);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                navigation.navigate('VerifiedTag', {bracetagid:bracetag})
             }else{
               
                setAlertTitle('ID Generation Error')
                setAlertMessage(responseJSON.error.message)
                setShowAlert(true)
             }
             
          }).catch((error) => {
             console.log(error);  
             setIsLoadingBtn(false);
          })  
        
    }

    useEffect(() => {
        if(!showAlert){
            return
        }
        setTimeout(() => {
            setShowAlert(false)
        }, 5000);
      }, [showAlert])
    return (
            <ScrollView style={styles.page_container}>
                
                
                {
                    (isLoading)?
                    <View>
                        <CustomeStatusBar 
                            backgroundColor={'transparent'}
                            barStyle={'dark-content'}
                            />
                        <View style={styles.loader_wrapper}>
                        
                        <Image source={require('../../assets/images/braceloader.gif')} style={styles.loader_wrapper_logo} resizeMode='contain'/>
                    </View>
                    </View>
                    :
                    <View>
                   <CustomeStatusBar 
                        backgroundColor={'transparent'}
                        barStyle={'dark-content'}
                        />
                    <View style={styles.page_wrapper}>
                    
                    <View style={styles.page_wrapper_top}>
                    <View style={styles.logo_wrapper}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode='contain'/>
                    </View>
                    <Text style={styles.page_title}>Create a Brace payment ID</Text>
                    <Text style={styles.page_subtitle2}>This is your unique identifier on our ecosystem, you can receive payments with your Brace ID.</Text>
                    
                        <View style={[styles.form_group, {marginTop: 40}]}>
                            <Text style={styles.form_label}>Enter your desired ID  </Text>
                            <View style={(isActiveTwo)?styles.form_input_focus_2_wrap2:styles.form_input_type_2_wrap2}>
                            <View style={styles.form_input_type_2_icon}>
                                 {/* <Icon
                                    name='at-sign'
                                    type='feather'
                                    color='#111827'
                                    size={20}
                                    onPress={() => handlePasswordToggle()} /> */}
                                <Text style={styles.icon_andat}>@</Text>
                            </View>
                                <TextInput 
                                    style={styles.form_input_type_33}
                                    placeholder=''
                                    caretHidden={false}
                                    value={bracetag}
                                    onChangeText={(value)=>onChangeHandler('bracetag',value)}
                                    onFocus={() => setActiveTwo(true)}
                                    onBlur={() => setActiveTwo(false)}
                                />
                                 
                            </View>
                        </View>
                        <View style={styles.attest_wrapper}>
                            <Pressable style={styles.attest_img_wrap} >
                            {/* {
                                (!checked)?<Image source={require('../../assets/images/uncheck.png')} resizeMode='contain' style={styles.attest_img}/>:
                                <Image source={require('../../assets/images/checked.png')} resizeMode='contain' style={styles.attest_img}/>
                            } */}
                                 <Icon
                                    name={(checked)?'checkcircle':'radio-button-off'}
                                    type={(checked)?'antdesign':'ionicons'}
                                    color= {(checked)?Colors.green:Colors.gray}
                                    size={18} />
                            </Pressable>
                            <View style={styles.attest_text_wrap}>
                                <Text style={[styles.attest_text, {marginTop:1}]} >4-12 characters  </Text>   
                            </View>
                        </View>

                        <View style={[styles.attest_wrapper, {marginTop: 10}]}>
                            <Pressable style={styles.attest_img_wrap} onPress={() => handleSetCheck2()}>
                            <Icon
                                    name={(checked2)?'checkcircle':'radio-button-off'}
                                    type={(checked2)?'antdesign':'ionicons'}
                                    color= {(checked2)?Colors.green:Colors.gray}
                                    size={18} />
                            </Pressable>
                            <View style={styles.attest_text_wrap}>
                                <Text style={[styles.attest_text, {marginTop: 1}]} >Letters, numbers and underscores only  </Text>   
                            </View>
                        </View>

                        
                    </View>
                    <View style={styles.page_wrapper_bottom}>
                        <View style={styles.btn_container}>
                            {(bracetag != '' && checked  && checked2)?
                            (!isLoadingbtn)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={() => handleGenerateTag()}>
                                 <Text style={styles.btn_text}>Claim Brace ID</Text>
                             </TouchableOpacity>
                             :
                             <TouchableOpacity style={styles.btn_wrapper2} >
                                 {/* <Text style={styles.btn_text}>Requesting</Text> */}
                                 <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:0}} />
                             </TouchableOpacity>
                             :
                              <TouchableOpacity style={styles.btn_wrapper2} >
                                  <Text style={styles.btn_text}>Claim Brace ID</Text>
                              </TouchableOpacity>
                            }
                            
                        </View>
                        
                    </View>
                </View>
                </View>
                }
              <CustomAlert 
                    show={showAlert} 
                    message={alertMessage} 
                    buttonTitle='Close'
                    onConfirmPressed={() => {
                        setShowAlert(false)
                    }} 
                    type='error'
                    
                /> 
            </ScrollView>
    );
};


export default BraceTagIndex;
