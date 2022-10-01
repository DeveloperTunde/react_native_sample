
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, TextInput , Pressable, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import { BaseUrl } from '../../../constants/BaseUrl';


const WithdrawSix = (props) => {

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

      const banks = ["Card deposit", "Bank transfer"];
      const [userbank, setBank] = useState('');

    
    

    return (
    <View style={styles.deposittwo_container}>
        <View style={styles.deposittwo_top}>
        <View style={styles.modal_header}>
            <Pressable style={styles.modal_header_left}  onPress={() => props.setController(6)}>
                <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
            </Pressable>
            
            <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
            </Pressable>
        </View>
        <View style={styles.deposittwo_main_top_b}>    
           <Text style={styles.page_title}>Enter Account Details</Text>
           <Text style={styles.page_subtitle4}>Enter account details that is owned by you.</Text>
        </View>

        <View style={{width: '100%'}}>
     
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
                    defaultButtonText="Card deposit"
                />
            </View>
        </View>


        <View style={styles.form_group}>
            <Text style={styles.form_label}>Account Number</Text>
            <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                <TextInput 
                    placeholder='e.g 432904903'
                    
                    placeholderTextColor={Colors.placeholder}
                    value={accountnumber}
                    onChangeText={(value)=>onChangeHandler('accountnumber',value)}
                    onFocus={() => setActiveTwo(true)}
                    onBlur={() => setActiveTwo(false)}
                    style={styles.form_input_type_2}
                />
                
            </View>
        </View>


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
            

        </View>
        </View>
        <View style={[styles.deposittwo_bottom]}>
            <View style={styles.btn_container}>
                {
                    (userbank != '' && accountnumber != '')?
                    <TouchableOpacity style={styles.btn_wrapper} onPress={() => props.setController()}>
                        <Text style={styles.btn_text}>Add account </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.btn_wrapper2} onPress={() => props.setController()}>
                        <Text style={styles.btn_text}>Add account </Text>
                     </TouchableOpacity>
                }
                
            </View>
            
        </View>
        
</View>
    );
};



export default WithdrawSix;
