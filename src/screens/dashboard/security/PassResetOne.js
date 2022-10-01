
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerD';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style';
import CountryPicker from 'react-native-country-picker-modal';
import { Flags } from '../../../constants/CountryFlags';
import CustomAlert from '../../components/CustomAlertB';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const PassResetOne = ({navigation}) => {
    const [isHaveaccountsSaved, setisHaveaccountsSaved] = useState(false);
    
    const {isLoggedIn, isActive, userJwt, userData, assettype, sendamount, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const [isRequesting, setisRequesting] = useState(true);
    const [allbanks, setAllBanks] = useState([]);
    const [userbank, setBank] = useState('');


   
 
    const [email, setEmail] = useState('');
    const [accountname, setAccountName] = useState('Falola Oluwaseyi');
    const [accountnumber, setAccountNumber] = useState('');
 
     

      const [showAlert2, setShowAlert2] = useState(false);
      const [alertTitle2, setAlertTitle2] = useState('');
      const [alertMessage2, setAlertMessage2] = useState('');
      const [isAdding, setIsAdding] = useState(false);


      function handleResetPassword(){
        
        if (passwordtwo != passwordthree) {
            setAlertMessage2('New password and confirm password must match')
            setShowAlert2(true)
        }else{
          const data = {
            "OldPassword": passwordone,
            "NewPassword": passwordtwo,
            "ConfirmPassword": passwordthree,
          }
          setIsAdding(true);

          fetch(`${BaseUrl}/users/password`, {
              method: 'PUT', 
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
                  navigation.navigate('PasswordSuccess')
               }else if(responseJSON.error){
                  setAlertMessage2(responseJSON.error.message)
                 setShowAlert2(true)
              }else{
                navigation.navigate('PasswordFailure')
                   
               }
               
            }).catch((error) => {
              setIsAdding(false);
               console.log(error);  

            }) 
        }
          
      }


      const [isActiveOne, setActiveOne] = useState(false);
      const [isActiveTwo, setActiveTwo] = useState(false);
      const [isActiveThree, setActiveThree] = useState(false);
      const [isActiveFour, setActiveFour] = useState(false);


      const [passwordone, setPasswordOne] = useState('');
      const [passwordShownOne, setPasswordShownOne] = useState(true);

      function  handlePasswordToggleOne(){
        setPasswordShownOne(!passwordShownOne)
      }



      const [passwordtwo, setPasswordTwo] = useState('');
      const [passwordShownTwo, setPasswordShownTwo] = useState(true);

      function  handlePasswordToggleTwo(){
        setPasswordShownTwo(!passwordShownTwo)
      }


      const [passwordthree, setPasswordThree] = useState('');
      const [passwordShownThree, setPasswordShownThree] = useState(true);

      function  handlePasswordToggleThree(){
        setPasswordShownThree(!passwordShownThree)
      }


     



      const onChangeHandler = (name, value) => {
        if(name=="passwordone"){
          setPasswordOne(value)
        }else if (name=="passwordtwo") {
          setPasswordTwo(value);
        }else if (name=="passwordthree") {
          setPasswordThree(value)
        }else if (name=="passwordfour") {
          setPasswordFour(value)
        }
       }



     
       useEffect(() => {
        if(!showAlert2){
            return
        }
        setTimeout(() => {
          setShowAlert2(false)
        }, 5000);
      }, [showAlert2])
    

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                  backgroundColor={'transparent'}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title='Password reset' />
              
               
               <View>
                

                <View style={{width: '100%', marginTop: 30}}>

   
                <View style={styles.form_group}>
                      <Text style={styles.form_label}>Current password</Text>
                      <View style={(isActiveOne)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                          <TextInput 
                              style={styles.form_input_type_2}
                              placeholder='Enter Password'
                              secureTextEntry={passwordShownOne}
                              placeholderTextColor={Colors.placeholder}
                              value={passwordone}
                              onChangeText={(value)=>onChangeHandler('passwordone',value)}
                              onFocus={() => setActiveOne(true)}
                              onBlur={() => setActiveOne(false)}
                          />
                          <View style={styles.form_input_type_2_icon}>
                              <Icon
                                  name={(passwordShownOne)?'eye':'eye-off'}
                                  type='feather'
                                  color='#111827'
                                  onPress={() => handlePasswordToggleOne()} />
                          </View>
                      </View>
                  </View>

                  <View style={styles.form_group}>
                      <Text style={styles.form_label}>New password</Text>
                      <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                          <TextInput 
                              style={styles.form_input_type_2}
                              placeholder='Enter Password'
                              secureTextEntry={passwordShownTwo}
                              placeholderTextColor={Colors.placeholder}
                              value={passwordtwo}
                              onChangeText={(value)=>onChangeHandler('passwordtwo',value)}
                              onFocus={() => setActiveTwo(true)}
                              onBlur={() => setActiveTwo(false)}
                          />
                          <View style={styles.form_input_type_2_icon}>
                              <Icon
                                  name={(passwordShownTwo)?'eye':'eye-off'}
                                  type='feather'
                                  color='#111827'
                                  onPress={() => handlePasswordToggleTwo()} />
                          </View>
                      </View>
                  </View>



                  <View style={styles.form_group}>
                      <Text style={styles.form_label}>Confirm password</Text>
                      <View style={(isActiveThree)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                          <TextInput 
                              style={styles.form_input_type_2}
                              placeholder='Enter Password'
                              secureTextEntry={passwordShownThree}
                              placeholderTextColor={Colors.placeholder}
                              value={passwordthree}
                              onChangeText={(value)=>onChangeHandler('passwordthree',value)}
                              onFocus={() => setActiveThree(true)}
                              onBlur={() => setActiveThree(false)}
                          />
                          <View style={styles.form_input_type_2_icon}>
                              <Icon
                                  name={(passwordShownThree)?'eye':'eye-off'}
                                  type='feather'
                                  color='#111827'
                                  onPress={() => handlePasswordToggleThree()} />
                          </View>
                      </View>
                  </View>


                 




                </View>
                </View>

              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        {
                            (passwordone != '' && passwordtwo != '' && passwordthree != '' && passwordtwo == passwordthree )?
                            (!isAdding)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleResetPassword()}>
                                <Text style={styles.btn_text}>Reset password </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:5}}/>
                            </TouchableOpacity>
                             :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <Text style={styles.btn_text}>Reset password </Text>
                            </TouchableOpacity>
                        }
                        
                    </View>
            
               </View>
             

                    <CustomAlert 
                      show={showAlert2} 
                      message={alertMessage2} 
                      buttonTitle='Okay'
                      onConfirmPressed={() => {
                        setShowAlert2(false)
                        }} 
                      type='error'
                      
                    />            
     </View>
    );
};



export default PassResetOne;
