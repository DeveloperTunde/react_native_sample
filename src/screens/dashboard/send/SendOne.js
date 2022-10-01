
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TextInput,TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, useDispatch } from 'react-redux'
import CustomAlert from '../../components/CustomAlert';


const SendOne = (props) => {
   
    const {isLoggedIn, isActive,sendamount, userJwt, userData, withdrawalamount} = useSelector(state => state.userReducer);

    const [amount, setAmount] = useState(sendamount > 0? sendamount: 0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitleColor, setAlertTitleColor] = useState('#FF6D6D');

      function handleAlert(){
        setAlertTitle('Account Error')
        setAlertMessage('This is a testing alert')
        setShowAlert(true)
      }

      function handleRedirect(){
         if(Number(amount) <= userData.wallets.currentBalance){
          props.setController(3, amount);
         }else{
          setShowAlert(true)
         }
         
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


     useEffect(() => {
        if(!showAlert){
            return
        }
        setTimeout(() => {
            setShowAlert(false)
        }, 5000);
      }, [showAlert])

    return (
    <View style={styles.deposittwo_container}>
        <View style={styles.deposittwo_top}>
        <View style={styles.modal_header}>
            <Pressable style={styles.modal_header_left}  onPress={() => props.setController(1)}>
                <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
            </Pressable>
            
            <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
            </Pressable>
        </View>
        <View style={styles.deposittwo_main_top}>
            <Text style={styles.deposittwo_main_top_a}>Send money</Text>
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
                        onChangeText={(value)=>onChangeHandler('amount',value)}
                        
                    /> */}
                    <Text style={styles.deposittwo_main_middle_a_i}>
                       {amount}
                    </Text>
                </View>
           
                
        </View>
        </View>
        <View style={[styles.deposittwo_bottom]}>

              <View style={styles.keyboard_wrap}>
                    <VirtualKeyboard color={Colors.neutral}
                    pressMode='string'
                    onPress={(val) => handleSetAmount(val)}
                    cellStyle={styles.keyboard_key}
                    textStyle={styles.keyboard_key_text}
                    rowStyle={styles.keyboard_row} />
			   </View>
            <View style={styles.btn_container}>
               
                {(amount >= 10)?
                <TouchableOpacity style={styles.btn_wrapper} onPress={() => handleRedirect()}>
                        <Text style={styles.btn_text}>Send ${amount}</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.btn_wrapper2} >
                        <Text style={styles.btn_text}>Send ${amount}</Text>
                </TouchableOpacity>
                }

            </View>
            
        </View>

        
        <CustomAlert 
            show={showAlert} 
            message={'You do not have sufficient balance for this transaction'} 
            buttonTitle='Close'
            onConfirmPressed={() => {
                setShowAlert(false)
            }} 
            type='error'
            
        /> 

</View>
    );
};



export default SendOne;
