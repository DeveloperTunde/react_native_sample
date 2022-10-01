
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


const BankAdd = ({navigation}) => {
    const [isHaveaccountsSaved, setisHaveaccountsSaved] = useState(false);

    const {width, height} = Dimensions.get('window')
    
    const {isLoggedIn, isActive, userJwt, userData, assettype, sendamount, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const [isRequesting, setisRequesting] = useState(true);
    const [allbanks, setAllBanks] = useState([]);
    const [userbank, setBank] = useState('');


    const [isActiveOne, setActiveOne] = useState(false);
    const [isActiveTwo, setActiveTwo] = useState(false);
 
    const [email, setEmail] = useState('');
    const [accountname, setAccountName] = useState('Falola Oluwaseyi');
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

      const banks = allbanks.map((bank)=> (
          bank.name
      ));


      useEffect(() => {
        fetch(`${BaseUrl}/finance/banks/${userData.country}`, {
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${userJwt}`,
            },
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             console.log('banks', userData);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setAllBanks(responseJSON.data);
                setisRequesting(false)
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          })  
     },[]);

      const [showAlert2, setShowAlert2] = useState(false);
      const [alertTitle2, setAlertTitle2] = useState('');
      const [alertMessage2, setAlertMessage2] = useState('');
      const [isAdding, setIsAdding] = useState(false);


      function handleAddAccount(){
        setIsAdding(true);

        const selectedbank = allbanks.filter((bank)=> bank.name == userbank);
        const bankcode = selectedbank[0].code;
        const data = {
            "name": accountname,
            "bank": userbank,
            "accountNumber": accountnumber,
            "code": bankcode
          }

        fetch(`${BaseUrl}/finance/bank/beneficiary`, {
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
             if(responseJSON.status == true && responseJSON.statusCode == 201){
              navigation.navigate('BankSuccess', {content: 'Bank added successfully'})
             }else{
                 
             }
             
          }).catch((error) => {
            setIsAdding(false);
             console.log(error);  
            //  setAlertTitle('Registration Error2')
            //  setAlertMessage(error.message)
            //  setShowAlert(true)
            //  setIsLoading(false);
          })    
      }

      function handleAccountRoute(){
        
        
     }


      const [checking, setChecking] = useState(false);
      const [validateSuccess, setValidationSuccess] = useState(false);
      const [isAccountWrong, setIsAccountWrong] = useState(false);
     
      function validateAccount(){
       if (userbank !='') {
           const selectedbank = allbanks.filter((bank)=> bank.name == userbank);
           const bankdigit = selectedbank[0].digit;
           const bankcode = selectedbank[0].code;
          // alert(bankdigit)
        if (accountnumber.length > bankdigit) {
            setValidationSuccess(false)
        }
        if(accountnumber.length == bankdigit){
            setIsAccountWrong(false)
            setChecking(true)
      
          const data = {
            "accountNumber": accountnumber,
            "code": bankcode,
            "country": userData.country
          }
          fetch(`${BaseUrl}/finance/validate-bank`, {
              method: 'POST', 
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
             })
            .then((response) => response.json())
            .then((responseJSON) => {
               // console.log(responseJSON);
               setChecking(false);
               if(responseJSON.status == true && responseJSON.statusCode == 200){
                   setAccountName(responseJSON.data);
                   setValidationSuccess(true)
               }else{
                setIsAccountWrong(true)
               }
               
            }).catch((error) => {
              setChecking(false)
               // console.log(error);  
              
              
            })   
          }
       }
      }


     
    
    useEffect(() => {
        validateAccount();
    
    },[accountnumber]);


    useEffect(() => {
        setValidationSuccess(false);
    
    },[userbank]);
    
   
    const [countryCode, setCountryCode] = useState('234');
    const [selectedCountry, setCountry] = useState('Select country');
    const [showCountries, setShowCountries] = useState(false);
    const [flag, setFlag] = useState('');
    

    useEffect(() => {
      if(!showAlert2){
          return
      }
      setTimeout(() => {
        handleAccountRoute()
      }, 5000);
    }, [showAlert2])

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={'transparent'}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title='Banks & wallets' />
              
               
               <View>
                

                <View style={{width: '100%', marginTop: 30}}>

               




                <View style={styles.form_group}>
                <Text style={styles.form_label}>Bank Name</Text>
                <View style={(isActiveOne)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                <SelectDropdown
                data={banks}
                onSelect={(selectedItem, index) => {
                    setBank(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                renderDropdownIcon={isOpened => {
                    (isOpened)?setActiveOne(true):setActiveOne(false)
                    
                    return  <Icon name={isOpened ? 'angle-up' : 'angle-down'} type='font-awesome' color={Colors.black} size={24} style={styles.stats_week_icon}/>;
                }}
                dropdownStyle={styles.dropdown4DropdownStylenew}
                rowStyle={styles.dropdown4RowStylenew}
                rowTextStyle={styles.dropdown4RowTxtStylenew}
                buttonStyle={styles.deposittwo_main_middle_banknew}
                buttonTextStyle ={styles.deposittwo_main_middle_bank_textnew}
                dropdownIconPosition='right'
                defaultButtonText='Select a bank'
                />
                </View>
                </View>


                <View style={styles.form_group}>
                <Text style={styles.form_label}>Account Number</Text>
                <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                <TextInput 
                placeholder='e.g 432904903'
                keyboardType='number-pad'
                placeholderTextColor={Colors.placeholder}
                value={accountnumber}
                onChangeText={(value)=>onChangeHandler('accountnumber',value)}
                onFocus={() => setActiveTwo(true)}
                onBlur={() => setActiveTwo(false)}
                style={styles.form_input_type_2}
                />

                </View>
                </View>


                {
                 (checking)?
                 <ActivityIndicator style={{marginTop: 15}}/>
                 :null
               }
               
               {
                      (isAccountWrong)? 
                      <View style={styles.page_error_text_wrap}>
                          <Text style={[styles.page_error_text1, {color: Colors.red}]}>Incorrect account details provided</Text>
                          {/* <Text style={styles.page_error_text2}>Request new code</Text> */}
                      </View>
                      :
                      null
                    }
               {
                (validateSuccess)?
                    <View style={styles.form_group}>
                <Text style={styles.form_label}>Account Name</Text>
                <View style={[styles.form_input_type_2_wrap,{backgroundColor: '#F3F4F6'}]}>
                    <TextInput 
                    placeholder='Falola Oluwaseyi'
                    
                    placeholderTextColor={Colors.placeholder}
                    value={accountname}
                    
                    underlineColorAndroid='transparent'
                    editable={false}
                    selectTextOnFocus={false}
                    style={styles.form_input_type_2}
                    />

                </View>
                </View>
                : null
                }


                </View>
                </View>

              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        {
                            (userbank != '' && accountnumber != '' && validateSuccess)?
                            (!isAdding)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleAddAccount()}>
                                <Text style={styles.btn_text}>Add account </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                {/* <Text style={styles.btn_text}>Requesting</Text> */}
                                <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:0}}/>
                            </TouchableOpacity>
                             :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <Text style={styles.btn_text}>Add account </Text>
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



export default BankAdd;
