
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Modal, Pressable, TouchableOpacity, TextInput, ScrollView, ActivityIndicator} from 'react-native';
import styles from '../styles';
import style from '../style';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInner';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { useSelector, useDispatch } from 'react-redux'
import NumberFormat from 'react-number-format';
import { BaseUrl } from '../../../constants/BaseUrl';


const ConfirmWithdrawal = ({route, navigation}) => {
    const {isLoggedIn, isActive, userData,userJwt, withdrawalamount} = useSelector(state => state.userReducer);
    const {account} = route.params;
   
    const {width, height} = Dimensions.get('window');
    const [modalVisible, setModalVisible] = useState(false);

    const C = (props) => <Text style={{fontWeight: '900'}}>{props.children}</Text>
    const B = (props) => <Text style={{fontWeight: '900'}}> <NumberFormat value={amountIndollar} displayType={'text'} thousandSeparator={true} prefix={'₦'} 
    renderText={(value, props) => <Text {...props}>{value}</Text>} /></Text>
    
    function handleRouting(){
        setModalVisible(false)
        navigation.navigate('WithdrawPIN', {account, withdrawalamount, country:userData.country})
    }
    const [nairaAmount, setNairaAmount] = useState(0);
    const [transferFee, setTransferFee] = useState(0);
    const [isCoverting, setIsCoverting] = useState(true);
    const [isFetching, setIsFetching] = useState(true);



    // useEffect(() => {
       
    //     fetch(`${BaseUrl}/finance/banks/${userData.country}`, {
    //         method: 'GET', 
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //           //'Authorization': `Bearer ${userJwt}`,
    //         },
    //        })
    //       .then((response) => response.json())
    //       .then((responseJSON) => {
    //          //console.log('banks', userData);
    //          if(responseJSON.status == true && responseJSON.statusCode == 200){
    //             setNairaAmount(responseJSON.data);
    //             setIsCoverting(false)
    //          }else{
                
    //          }
             
    //       }).catch((error) => {
    //          console.log(error); 
    //          setIsCoverting(false)
    //       })  
    //  },[]);



     const [amountIndollar, setamountIndollar] = useState('');
  useEffect(() => {
    const data = {
      "amount": withdrawalamount,
      "country": userData.country,
    };
    fetch(`${BaseUrl}/finance/usd-convert`, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
     })
    .then((response) => response.json())
    .then((responseJSON) => {
     console.log('Dollar naira', responseJSON);
       if(responseJSON.status == true && responseJSON.statusCode == 200){
        setIsCoverting(false)
        setamountIndollar(responseJSON.data);
       }else{
          
       }
       
    }).catch((error) => {
        setIsCoverting(false)
       console.log(error);  
    }) 
  }, [])




     useEffect(() => {
        setIsFetching(true)
        const data = {
            "country": userData.country
          }
          
        fetch(`${BaseUrl}/finance/fees/`, {
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
             console.log('fees', responseJSON);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setTransferFee(responseJSON.data.withdrawal.bank);
                setIsFetching(false)
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error); 
             setIsFetching(false)
          })  
     },[]);



    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />
                {
                (isCoverting || isFetching)?
               <ScrollView style={{width: '100%', flexGrow: 1,}}>
                   <View style={[styles.deposittwo_main_top, {height}]}>
                        <ActivityIndicator />
                   </View>
                </ScrollView>
                
                :
                <ScrollView style={{width: '100%', flexGrow: 1,}}>
                   <View style={[styles.deposittwo_main_top, {height}]}>
                        <View style={styles.deposittwo_main_top_c_b}>
                           <Image source={require('../../../assets/images/bank2.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
                        </View>
                        
                        <NumberFormat value={amountIndollar} displayType={'text'} thousandSeparator={true} prefix={'₦'} suffix=' withdrawal'
                                         renderText={(value, props) => <Text style={style.deposittwo_main_top_d_c} {...props}>{value}</Text>} />

                        <View style={style.detail_wrapper}>
                            <Text style={style.detail_wrapper_heading}>You are sending :</Text>
                            <View style={style.detail_container}>
                                <View style={style.detail_list}>
                                    <Text style={style.detail_list_left}>Amount sent</Text>
                                    
                                    <NumberFormat value={amountIndollar} displayType={'text'} thousandSeparator={true} prefix={'₦'}
                                         renderText={(value, props) => <Text style={style.detail_list_right} {...props}>{value}</Text>} />
                                </View>

                                <View style={style.detail_list_mid}>
                                    <Text style={style.detail_list_left}>USD value</Text>
                                    <Text style={style.detail_list_right}>${withdrawalamount} </Text>
                                </View>

                                <View style={style.detail_list}>
                                    <Text style={style.detail_list_left}>Processing fee</Text>
                                    <Text style={style.detail_list_right}>-₦{transferFee}</Text>
                                </View>
                            </View>
                        </View>



                        <View style={style.detail_wrapper2}>
                            <View style={style.detail_heading_wrap}>
                              <Text style={style.detail_wrapper_heading_b}>To :</Text>
                              <View style={style.detail_heading_icon}>
                                <Icon
                                    name='arrow-down'
                                    type='feather'
                                    color={Colors.white}
                                    size={17}
                                    />
                              </View>
                            </View>
                            <View style={style.detail_container}>
                                <View style={style.detail_list}>
                                    <Text style={style.detail_list_left}>Account name</Text>
                                    <Text style={style.detail_list_right}>{account.name}</Text>
                                </View>

                                <View style={style.detail_list_mid}>
                                    <Text style={style.detail_list_left}>Account number</Text>
                                    <Text style={style.detail_list_right}>{account.accountNumber} </Text>
                                </View>

                                <View style={style.detail_list}>
                                    <Text style={style.detail_list_left}>Bank name</Text>
                                    <Text style={style.detail_list_right}>{account.bank}</Text>
                                </View>
                            </View>
                        </View>


                        

                        <Text style={style.deposittwo_main_bottom}>You will get the money in your bank account within 5-10 minutes</Text>
                    </View>
                    
                </ScrollView>
}
              </View>
              {
                  (!isCoverting)?
                  <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                      
                            <TouchableOpacity style={styles.btn_wrapper} onPress={() => setModalVisible(true)}>
                                <Text style={styles.btn_text}>Confirm </Text>
                            </TouchableOpacity>
                    </View>
            
                  </View>
                  :null
              }
                



                 <View style={style.confirm_modal}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={[style.confirm_modal, { backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                        <View style={style.modalView}>
                            
                        <View style={style.modal_header}>
                            <Pressable style={style.modal_header_left}  onPress={() => props.setController(1)}>
                                
                            </Pressable>
                            <Text style={style.modal_header_middle}>Confirm</Text>
                            <Pressable style={style.modal_header_right} onPress={() => setModalVisible(false)}>
                                <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={style.modal_header_right_img}/>
                            </Pressable>
                        </View>

                        <Text style={style.withdraw_text}>You’re about to send <B></B> to {account.name} BANK . <C>{account.accountNumber}</C> </Text>

                        <View style={[styles.deposittwo_bottom_main]}>
                                <View style={styles.btn_container}>
                                
                                        <TouchableOpacity style={styles.btn_wrapper} onPress={() => handleRouting()}>
                                            <Text style={styles.btn_text}>Withdraw </Text>
                                        </TouchableOpacity>
                                </View>
                        
                        </View>
                        </View>
                        </View>
                    </Modal>
                
                    </View>




     </View>
    );
};



export default ConfirmWithdrawal;
