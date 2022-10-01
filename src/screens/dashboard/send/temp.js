import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import { BaseUrl } from '../../../constants/BaseUrl';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector, useDispatch } from 'react-redux'
import { setWithdrawalAmount } from '../../redux/actions';
import CustomAlert from '../../components/CustomAlert';

const SendAmount = ({route, navigation}) => {
    const {withdrawRoute} = route.params;
    const { isLoggedIn, isActive, userJwt, userData, withdrawalamount } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();;

    const [amount, setAmount] = useState(withdrawalamount > 0 ? withdrawalamount : 0);


    const [gateways, setGateWays] = useState([]);
    useEffect(() => {
        fetch(`${BaseUrl}/gateway/withdrawal`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log('gateway', responseJSON.data);
                if (responseJSON.status == true && responseJSON.statusCode == 200) {
                    setGateWays(responseJSON.data);
                } else {

                }

            }).catch((error) => {
                console.log(error);
            })
    }, []);


    const [wrongamount, setShowAlert] = useState(false);

    function handleRedirect() {
        if (Number(amount) <= userData.wallets.currentBalance) {
            dispatch(setWithdrawalAmount(amount));


            if(withdrawRoute == 'To Bank'){
                setWithdrawVisible(false)
                navigation.navigate('SelectAccount');
            }
            if(withdrawRoute == 'To Crypto Wallet'){
                setWithdrawView(7);
            }
        } else {
            setShowAlert(true)
        }

    }


    function handleSetAmount(a) {
        if (amount.length > 0) {
            if (a.charAt(0) === '0') {
                setAmount(a.substring(1))

                if (a.charAt(1) === '0') {
                    setAmount(a.substring(2))
                }
            } else {
                setAmount(a)
            }
        } else {
            setAmount(a)
        }

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
                    <Text style={styles.deposittwo_main_top_a}>Withdraw money </Text>
                    <Text style={styles.deposittwo_main_top_b}>($10 minimum)</Text>
                </View>

                <View style={styles.deposittwo_main_middle}>
                    <Pressable style={styles.deposittwo_main_input} >
                        <Text style={[styles.deposittwo_main_middle_a]}>$</Text>
                        {/* <TextInput 
                        style={styles.deposittwo_main_middle_a_i}
                        placeholder='0'
                        placeholderTextColor="#385160"
                        keyboardType='number-pad'
                        value={amount}
                        onChangeText={(value)=>onChangeHandler('amount',value)}
                        
                    /> */}
                        <Text style={[styles.deposittwo_main_middle_a_i]}>
                            {amount}
                        </Text>
                    </Pressable>


                </View>
         
                              
          </View>

          <View style={[styles.deposittwo_bottom_main]}>
          <View style={styles.keyboard_wrap}>

            <VirtualKeyboard color={Colors.neutral}
                pressMode='string'
                onPress={(val) => handleSetAmount(val)}
                cellStyle={styles.keyboard_key}
                rowStyle={styles.keyboard_row} />
            </View>

            <View style={styles.btn_container}>
            {(amount >= 10) ?
                <TouchableOpacity style={styles.btn_wrapper} onPress={() => handleRedirect()}>
                    <Text style={styles.btn_text}>Withdraw ${amount}</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.btn_wrapper2} >
                    <Text style={styles.btn_text}>Withdraw ${amount}</Text>
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
