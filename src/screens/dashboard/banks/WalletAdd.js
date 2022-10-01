
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
import CustomAlert from '../../components/CustomAlert';


const WalletAdd = ({navigation}) => {
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
    const [walletaddress, setWalletAddress] = useState('');
 
     const onChangeHandler = (name, value) => {
       if(name=="walletaddress"){
         setWalletAddress(value)
       }
      }

      const banks = allbanks.map((bank)=> (
          bank.name
      ));


      const [networks, setNetworks] = useState([]);
      const [usernetwork, setSelectedNetwork] = useState('');
      useEffect(() => {
          fetch(`${BaseUrl}/user-addresses/assets`, {
              method: 'GET', 
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userJwt}`,
              },
             })
            .then((response) => response.json())
            .then((responseJSON) => {
             /// console.log('network', responseJSON.data);
               if(responseJSON.status == true && responseJSON.statusCode == 200){
                  setNetworks(responseJSON.data);
               }else{
                  
               }
               
            }).catch((error) => {
               console.log(error);  
            })  
       },[]);
    
       const allnetworks = networks.map((net)=> (
        net.symbol
    ));


      const [showAlert2, setShowAlert2] = useState(false);
      const [alertTitle2, setAlertTitle2] = useState('');
      const [alertMessage2, setAlertMessage2] = useState('');
      const [isAdding, setIsAdding] = useState(false);


 

      function handleAccountRoute(){
        
     }


      const [checking, setChecking] = useState(false);
      const [validateSuccess, setValidationSuccess] = useState(false);
      const [isAccountWrong, setIsAccountWrong] = useState(false);
     
    const [countryCode, setCountryCode] = useState('234');
    const [selectedCountry, setCountry] = useState('Select country');
    const [showCountries, setShowCountries] = useState(false);
    const [flag, setFlag] = useState('');


    function handleAddWallet(){
      setIsAdding(true);


      const data = {
        "name": "Test Test",
        "address": walletaddress,
        "symbol": usernetwork
      }

      fetch(`${BaseUrl}/finance/crypto/beneficiary`, {
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
            navigation.navigate('BankSuccess',{content: 'Wallet added successfully'})
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
                <Text style={styles.form_label}>Select Coin</Text>
                <View style={(isActiveOne)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                <SelectDropdown
                data={allnetworks}
                onSelect={(selectedItem, index) => {
                  setSelectedNetwork(selectedItem)
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
                defaultButtonText='Select a coin'
                />
                </View>
                </View>


                <View style={styles.form_group}>
                <Text style={styles.form_label}>Wallet address</Text>
                <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                <TextInput 
                placeholder='e.g 0464744748957494gfr7rfhtyyu7585889'
                keyboardType='number-pad'
                placeholderTextColor={Colors.placeholder}
                value={walletaddress}
                onChangeText={(value)=>onChangeHandler('walletaddress',value)}
                onFocus={() => setActiveTwo(true)}
                onBlur={() => setActiveTwo(false)}
                style={styles.form_input_type_2}
                />

                </View>
                </View>


         


                </View>
                </View>

              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        {
                            (usernetwork != '' && walletaddress != '' )?
                            (!isAdding)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleAddWallet()}>
                                <Text style={styles.btn_text}>Add wallet </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                {/* <Text style={styles.btn_text}>Requesting</Text> */}
                                <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:0}}/>
                            </TouchableOpacity>
                             :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <Text style={styles.btn_text}>Add wallet </Text>
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



export default WalletAdd;
