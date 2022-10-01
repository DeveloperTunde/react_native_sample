
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import  Modal  from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { setDepositAmount} from '../redux/actions';
import VirtualKeyboard from 'react-native-virtual-keyboard';

import {
    ThePeerSend,
    ThePeerDirectCharge,
    ThePeerCheckout,
  } from 'thepeer-react-native';

const DepositTwo = (props) => {

    const {isLoggedIn} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();

    const {width, height} = Dimensions.get('window');
    const banks = ["Bank transfer", "Card deposit"];
    const [userweek, setBank] = useState('');

    const [amount, setAmount] = useState(props.depositamount > 0? props.depositamount: 0);
 
     const onChangeHandler = (name, value) => {
       if(name=="amount"){
        setAmount(value)
       }
      }


    

      const [openCheckoutSDK, setOpenCheckoutSDK] = useState(false);
      const CheckoutApp = (props) => {
        
        return (
          <View>
            
            <ThePeerCheckout
              publicKey= 'pspk_test_iyjvkzghbx8a2qzvskkcf5lozwcjrczdf6gzjf1cgu0qj'
              //amount= {props.amount*600*100}
              amount= {2*600*100}
              email='developertunde@gmail.com'
              currency= 'NGN'
              openCheckoutSDK = {openCheckoutSDK}
              onSuccess= {(response) => handlePeerResponse(response)}
              onError = {(response) => {}}
              onClose= {() => handleAllModalClose()}
            />
            
            <TouchableOpacity style={styles.btn_wrapper} onPress={() => setOpenCheckoutSDK(true)}>
               <Text style={styles.btn_text}>Deposit ${amount}</Text>
            </TouchableOpacity>
          </View>
        );
      };

    //   function handleDepositRoute(){
    //     dispatch(setDepositAmount(amount))
        
    //   }

    function handlePeerResponse(response){
        if (response.transaction.status == "success") {
        const reference = response.transaction.reference;
        const currency = response.transaction.currency;
        const amount = response.transaction.amount;

        const data = {
            "reference": reference,
            "currency": currency,
            "provider": "the-peer",
            "amount": amount,
          }
        fetch(`${BaseUrl}/wallet/deposit`, {
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${userJwt}`,
            },
            body: JSON.stringify(data),
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             console.log('verification', responseJSON);
             if(responseJSON.status == true && responseJSON.statusCode == 201){
               
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error); 
             setIsFetching(false)
          })  

        }

    }

    function handleAllModalClose(){
        setOpenCheckoutSDK(false)
        props.setCloseModal()
    }

    function handleSetAmount(a){
        if (amount.length > 0) {
           if (a.charAt(0) === '0') {
               setAmount(a.substring(1))

               if (a.charAt(1) === '0') {
                   setAmount(a.substring(2))
               }
            }else{
               setAmount(a)
            }
        }else{
           setAmount(a)
        }  
    
    }
      const [isFocus, setFocusHeight] = useState(false);
    return (
        <View style={styles.deposittwo_container}>
            <View style={styles.deposittwo_top}>
            <View style={styles.modal_header}>
                <Pressable style={styles.modal_header_left}  onPress={() => props.setController(2, 60)}>
                    <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                </Pressable>
                <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                    <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                </Pressable>
            </View>
            <View style={styles.deposittwo_main_top}>
                <Text style={styles.deposittwo_main_top_a}>Deposit amount</Text>
                <Text style={styles.deposittwo_main_top_b}>($10 minimum)</Text>
            </View>

            <View style={styles.deposittwo_main_middle}>
                <View style={styles.deposittwo_main_input}>
                    <Text style={styles.deposittwo_main_middle_a}>$</Text>
                    {/* <TextInput 
                        style={styles.deposittwo_main_middle_a_i}
                        placeholder='0'
                        placeholderTextColor="#385160"
                        keyboardType='number-pad'
                        value={amount}
                        onFocus={() => props.setFocusHeight(true)}
                        onBlur={() => props.setFocusHeight(false)}
                        onChangeText={(value)=>onChangeHandler('amount',value)}
                        
                    /> */}
                     <Text style={[styles.deposittwo_main_middle_a_i]}>
                       {amount}
                    </Text>
                </View>
                {/* <View style={styles.deposittwo_main_middle_bank_wrap}>
                <Image source={require('../../../assets/images/bank2.png')} style={styles.deposittwo_main_middle_bank_i} resizeMode='contain'/>
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
                        return  <Icon name={isOpened ? 'caret-up' : 'caret-down'} type='font-awesome' color={Colors.black} size={14} style={styles.stats_week_icon}/>;
                    }}
                    dropdownStyle={styles.dropdown4DropdownStyle2}
                    rowStyle={styles.dropdown4RowStyle2}
                    rowTextStyle={styles.dropdown4RowTxtStyle2}
                    buttonStyle={styles.deposittwo_main_middle_bank}
                    buttonTextStyle ={styles.deposittwo_main_middle_bank_text}
                    dropdownIconPosition='right'
                    defaultButtonText="Bank transfer"
                />
                </View> */}
            </View>
            </View>
            <View style={[styles.deposittwo_bottom]}>
            <View style={styles.keyboard_wrap}>
				
				<VirtualKeyboard color={Colors.neutral}
                 pressMode='string'
                 onPress={(val) => handleSetAmount(val)}
                 cellStyle={styles.keyboard_key}
                 rowStyle={styles.keyboard_row} />
			</View>
                <View style={styles.btn_container}>
                    {
                        (amount >= 10)? 
                        // <TouchableOpacity style={styles.btn_wrapper} onPress={() => handleDepositRoute()}>
                            <CheckoutApp amount={amount}/>
                        // </TouchableOpacity>:
                        :
                        <TouchableOpacity style={styles.btn_wrapper2} >
                            <Text style={styles.btn_text}>Deposit ${amount}</Text>
                        </TouchableOpacity>
                    }
                </View>
                
            </View>
            
    </View>
    );
};



export default DepositTwo;
