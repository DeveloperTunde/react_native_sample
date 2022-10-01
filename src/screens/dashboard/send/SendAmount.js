import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TextInput,TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, useDispatch } from 'react-redux'
import CustomAlert from '../../components/CustomAlertB';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import Header from '../components/HeaderInner';
import { setIsLoggedIn, saveContact,setUserData, setSendAmountR} from '../../redux/actions';
import NumberFormat from 'react-number-format';
import style from '../style';

const SendAmount = ({navigation}) => {
    const dispatch     = useDispatch();
    const {isLoggedIn, isActive,sendamount, userJwt, userData, withdrawalamount} = useSelector(state => state.userReducer);

    const [amount, setAmount] = useState(0);
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
         // props.setController(3, amount);
            dispatch(setSendAmountR(amount))
            navigation.navigate('SendBraceOne')
         }else{
          setShowAlert(true)
         }
         
     }

     function handleSetAmount(a){  
          const Num = a.replace(/^0+/, '')
            setAmount(Num)
     }

     const NairaDeco = (amount) =>{
        return  <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} 
         renderText={(value) => <Text>{value}</Text>} />
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
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={'transparent'}
                   barStyle={'dark-content'}
                   
                 />
         <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />
                <View style={{width: '100%'}}>
               
                

              </View>
              <View style={styles.deposittwo_main_top}>
                <Text style={styles.deposittwo_main_top_a}>Send money</Text>
                <Text style={styles.deposittwo_main_top_b}>($10 minimum)</Text>
            </View>

            <View style={styles.deposittwo_main_middle}>
              <View style={styles.deposittwo_main_input}>
                    <Text styles={style.deposittwo_main_middle_a}></Text>
                    {/* <TextInput 
                        style={styles.deposittwo_main_middle_a_i}
                        placeholder='0'
                        placeholderTextColor="#385160"
                        keyboardType='number-pad'
                        value={amount}
                        onChangeText={(value)=>onChangeHandler('amount',value)}
                        
                    /> */}
                    <Text style={[styles.deposittwo_main_middle_a_i,  (amount > 10)&&{color: Colors.green}]}>
                    {(amount.length < 1)? NairaDeco(0):NairaDeco(amount)}
                    </Text>
                    
                </View>
                <Pressable style={style.max_amount} onPress={()=> handleSetAmount(userData.wallets.currentBalance)}>
                      <Text style={style.max_amount_text}>Max</Text>
               </Pressable>
                
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
                
                {(amount >= 10)?
                <TouchableOpacity style={styles.btn_wrapper} onPress={() => handleRedirect()}>
                        <Text style={styles.btn_text}>Send {NairaDeco(amount)}</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.btn_wrapper2} >
                        <Text style={styles.btn_text}>Send {NairaDeco(amount)}</Text>
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



export default SendAmount;
