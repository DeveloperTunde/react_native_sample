
import React, { Component, useState,useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import  Modal  from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { setDepositRef } from '../../redux/actions';
import NumberFormat from 'react-number-format';
import { BaseUrl } from '../../../constants/BaseUrl';
import AwesomeAlert from 'react-native-awesome-alerts';
import Clipboard from '@react-native-community/clipboard';
import CustomAlert from '../../components/CustomAlert';

const DepositFour = (props) => {
  
    const {depositamount, userJwt} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();

    const [isFetching, setIsFetching] = useState(false);
    const [bankDetails, setBankDetail] = useState([]);
   

    console.log(userJwt)
    
    const [isError, setisError] = useState(false);
     const [errorStatus, setError] = useState('');
      useEffect(() => {
        setIsFetching(true)
        const data = {
            "reference": "aadeeb0e-0b5a-42b0-b514-7a123979e3e8",
            "currency": "NGN",
            "provider": "brace",
            "amount": depositamount*600
          }
          
        fetch(`${BaseUrl}/wallet/deposit/`, {
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
             console.log('Bank Details', responseJSON);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setBankDetail(responseJSON.data);
                setIsFetching(false)
             }else{
                if (responseJSON.error) {
                    setisError(true)
                    setError(responseJSON.error.message);

                }
             }
             
          }).catch((error) => {
             console.log(error); 
             setIsFetching(false)
          })  
     },[]);


     
     
     function handleDepositFulfil() {
         //const ref = '481fb7f8-0b2f-40ab-9769-ee6f1d2f1ffc';
        const ref = bankDetails.reference;
        fetch(`${BaseUrl}/p2p/${ref}/user-fulfilled`, {
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userJwt}`,
            },
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             console.log('user fulfil', responseJSON);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                dispatch(setDepositRef(ref));
                props.setController(13)
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          })  
        
     }

     const [showAlert, setShowAlert] = useState(false);
     const [alertTitle, setAlertTitle] = useState('');
     const [alertMessage, setAlertMessage] = useState('');
     const [alertTitleColor, setAlertTitleColor] = useState(Colors.green);
 
     function handleCopy(a){
         Clipboard.setString(a);
         setAlertTitle('Link')
         setAlertMessage('Link Copied')
         setShowAlert(true)
     }

    return (
        <View style={styles.deposittwo_container}>
          
            <View style={styles.deposittwod_top}>
                <View style={styles.modal_header}>
                    <Pressable style={styles.modal_header_left}  onPress={() => props.setController(4)}>
                        <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                    </Pressable>
                    <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                        <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                    </Pressable>
                </View>
               {
                   (isFetching)?
                   (!isError)?
                   <ActivityIndicator style={{marginTop: 30}}/>
                   :null
                   :
                   <View style={{width: '100%'}}>
                        <View style={styles.deposittwo_main_top}>
                            <View style={styles.deposittwo_main_top_c}>
                            <Image source={require('../../../assets/images/bank.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
                            </View>
                            <Text style={styles.deposittwo_main_top_a}>${depositamount} Deposit</Text>
                            <NumberFormat value={depositamount} displayType={'text'} thousandSeparator={true} prefix={'???'}
                                        renderText={(value, props) => <Text style={styles.deposittwo_main_top_b} {...props}>({value})</Text>} />
                            <Text style={styles.deposittwo_main_top_d}>Please proceed to your banking app to complete this bank transaction</Text>
                        </View>

                        <View style={styles.depositfour_main}>
                            <View style={styles.depositfour_main_box}>
                                <Text style={styles.depositfour_main_box_text1}>Account name</Text>
                                <Text style={styles.depositfour_main_box_text2}>{bankDetails.name}</Text>
                            </View>

                            <View style={styles.depositfour_main_box}>
                                <Text style={styles.depositfour_main_box_text1}>Account bank</Text>
                                <Text style={styles.depositfour_main_box_text2}>{bankDetails.bank}</Text>
                            </View>

                            <View style={styles.depositfour_main_box}>
                                <Text style={styles.depositfour_main_box_text1}>Account number</Text>
                                <Text style={styles.depositfour_main_box_text2}>{bankDetails.accountNumber}</Text>
                            </View>
                        </View>
                   </View>
               }

               {
                   (isError)?
                   <View style={{width: '100%'}}>
                        <View style={styles.deposittwo_main_top}>
                            
                            <Text style={styles.deposittwo_main_top_a}> Deposit {bankDetails.reference}</Text>
                            
                            <Text style={[styles.deposittwo_main_top_d,{textAlign: 'center'}]}>{errorStatus}</Text>
                        </View>

                        
                   </View>
                   :null
               }
            </View>



           
            {
                (!isFetching)?
                <View style={styles.deposittwod_bottom}>
                <View style={styles.btn_container}>
                    <TouchableOpacity style={styles.btn_wrapper_green} onPress={() => handleCopy(bankDetails.accountNumber)}>
                        <Text style={styles.btn_text}>Copy account number</Text>
                        <Image source={require('../../../assets/images/copy2.png')} resizeMode='contain' style={styles.btn_wrapper_green_img}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn_wrapper_white} onPress={() => handleDepositFulfil()}>
                        <Text style={styles.btn_text_white}>I???ve made the transfer</Text>
                        <Image source={require('../../../assets/images/bank2.png')} resizeMode='contain' style={styles.btn_wrapper_white_img}/>
                    </TouchableOpacity>
                </View>
                
            </View>:null
            }
         

                 <CustomAlert 
                      show={showAlert} 
                      message={alertMessage} 
                      buttonTitle='Close'
                      onConfirmPressed={() => {
                         setShowAlert(false)
                        }} 
                      type='success'
                      
                    /> 
    </View>
    );
};



export default DepositFour;
