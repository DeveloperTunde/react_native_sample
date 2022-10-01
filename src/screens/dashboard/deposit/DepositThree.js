
import React, { Component, useEffect, useState } from 'react';
import { View, Text, Dimensions, Image,TextInput, Pressable, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import  Modal  from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';

const DepositThree = (props) => {
    const {width, height} = Dimensions.get('window');
    const banks = ["Card deposit", "Bank transfer"];
    const [userweek, setBank] = useState('');

    const [amount, setAmount] = useState(props.depositamount > 0? props.depositamount: 0);
 
    const onChangeHandler = (name, value) => {
      if(name=="amount"){
       setAmount(value)
      }
     }
    return (
        <View style={styles.deposittwo_container}>
            <View style={styles.deposittwo_top}>
            <View style={styles.modal_header}>
                <Pressable style={styles.modal_header_left}  onPress={() => props.setController(2)}>
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
                    <TextInput 
                        style={styles.deposittwo_main_middle_a_i}
                        placeholder='0'
                        placeholderTextColor="#385160"
                        keyboardType='number-pad'
                        value={amount}
                        onChangeText={(value)=>onChangeHandler('amount',value)}
                        
                    />
                </View>
                <View style={styles.deposittwo_main_middle_bank_wrap}>
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
                    defaultButtonText="Card deposit"
                />
                </View>
            </View>
            </View>
            <View style={[styles.deposittwo_bottom]}>
                <View style={styles.btn_container}>
                    {
                        (amount >= 10)? 
                        <TouchableOpacity style={styles.btn_wrapper} onPress={() => props.setController(5,amount)}>
                            <Text style={styles.btn_text}>Deposit ${amount}</Text>
                        </TouchableOpacity>:
                        <TouchableOpacity style={styles.btn_wrapper2} >
                            <Text style={styles.btn_text}>Deposit ${amount}</Text>
                        </TouchableOpacity>
                    }
                </View>
                
            </View>
            
    </View>
    );
};



export default DepositThree;
