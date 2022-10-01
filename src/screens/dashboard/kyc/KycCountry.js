
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, NativeModules, NativeEventEmitter,TouchableOpacity, TextInput} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInner';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { countryListAllIsoData } from './components/SelectCountry';
import { useSelector, useDispatch } from 'react-redux'
import {
    MetaMapRNSdk,
  } from 'react-native-metamap-sdk';
  import { BaseUrl } from '../../../constants/BaseUrl';

const KycCountry = ({navigation}) => {
    
    const {isLoggedIn, isActive, userJwt, userData, withdrawalamount} = useSelector(state => state.userReducer);

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

      const countries = countryListAllIsoData.map((country)=> (
          country.name
      ));
      const [usercountry, setCountry] = useState('');




    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />


                <View style={styles.deposittwo_main_top_main}>    
                    <Text style={styles.page_title}>Select your country</Text>
                    {/* <Text style={styles.page_subtitle4}>Enter account details that is owned by you.</Text> */}
                </View>

                <View style={{width: '100%'}}>

                <View style={styles.form_group}>
                <Text style={styles.form_label}>Country</Text>
                <View style={(isActiveOne)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                <SelectDropdown
                data={countries}
                onSelect={(selectedItem, index) => {
                    setCountry(selectedItem)
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
                defaultButtonText='Select a country'
                />
                </View>
                </View>



                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        {
                            (usercountry != '')?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleMetaMapClickButton()}>
                                <Text style={styles.btn_text}>Continue </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <Text style={styles.btn_text}>Continue </Text>
                            </TouchableOpacity>
                        }
                        
                    </View>
            
               </View>
                              
     </View>
    );
};



export default KycCountry;
