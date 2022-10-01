import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import  Modal  from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { setDepositAmount } from '../../redux/actions';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import Header from '../components/HeaderInner';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import NumberFormat from 'react-number-format';

const DepositAmount = ({navigation}) => {


    const {isLoggedIn, depositamount} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();

    const {width, height} = Dimensions.get('window');
    const banks = ["Bank transfer", "Card deposit"];
    const [userweek, setBank] = useState('');

    const [amount, setAmount] = useState(0);
 


      function handleDepositRoute(){
        dispatch(setDepositAmount(amount))
        navigation.navigate('DepositFour')
      }


      function handleSetAmount(a){
        // if (amount.length > 0) {
        //    if (a.charAt(0) === '0') {
        //        setAmount(a.substring(1))

        //        if (a.charAt(1) === '0') {
        //            setAmount(a.substring(2))
        //        }
        //     }else{
        //        setAmount(a)
        //     }
        // }else{
        //    setAmount(a)
        // } 
        
        const Num = a.replace(/^0+/, '')
        setAmount(Num)
    
    }

  

      const [isFocus, setFocusHeight] = useState(false);
      const NairaDeco = (amount) =>{
        return  <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} 
         renderText={(value) => <Text>{value}</Text>} />
     }
    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />
               
               <View style={styles.deposittwo_main_top}>
                <Text style={styles.deposittwo_main_top_a}>Deposit amount a</Text>
                <Text style={styles.deposittwo_main_top_b}>($10 minimum)</Text>
            </View>

            <View style={styles.deposittwo_main_middle}>
                <View style={styles.deposittwo_main_input}>
                    <Text style={styles.deposittwo_main_middle_a}></Text>
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
                     <Text style={[styles.deposittwo_main_middle_a_i, (amount > 10)&&{color: Colors.green}]}>
                       {(amount.length < 1)? NairaDeco(0):NairaDeco(amount)}
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
                <View style={[styles.deposittwo_bottom_main]}>
                <View style={styles.keyboard_wrap}>
				
				<VirtualKeyboard color={Colors.neutral}
                 pressMode='string'
                 onPress={(val) => handleSetAmount(val)}
                 cellStyle={styles.keyboard_key}
                 textStyle={styles.keyboard_key_text}
                 rowStyle={styles.keyboard_row} />
			</View>
                <View style={styles.btn_container}>
                    {
                        (amount >= 10)? 
                         <TouchableOpacity style={styles.btn_wrapper} onPress={() => handleDepositRoute()}>
                            <Text style={styles.btn_text}>Deposit {NairaDeco(amount)}</Text>
                         </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.btn_wrapper2} >
                            <Text style={styles.btn_text}>Deposit {NairaDeco(amount)}</Text>
                        </TouchableOpacity>
                    }
                </View>
               </View>
                              
     </View>
    );
};



export default DepositAmount;
