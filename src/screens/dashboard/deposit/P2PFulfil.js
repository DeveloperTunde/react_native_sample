
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles';
import style from '../style';
import { Colors } from '../../../constants/Colors';
import  Modal  from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { BaseUrl } from '../../../constants/BaseUrl';
import NumberFormat from 'react-number-format';
import Header from '../components/HeaderInner';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';

const P2PFulfil = ({navigation}) => {

    const {depositamount, userData,depositref, userJwt} = useSelector(state => state.userReducer);

    const [isFetching, setIsFetching] = useState(true);

    console.log('user jwt', userJwt);
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`${BaseUrl}/p2p/${depositref}/status`, {
                method: 'GET', 
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userJwt}`,
                },
                
               })
              .then((response) => response.json())
              .then((responseJSON) => {
               //  console.log('Fulfilment statuses', responseJSON);
                 if(responseJSON.status == true && responseJSON.statusCode == 200){
                     if (responseJSON.data['COMPLETED'] == true) {
                        navigation.navigate('DepositSuccess')
                     }

                 }else{
                    
                 }
                 
              }).catch((error) => {
                 console.log(error); 
                 
              })  
          }, 1000);
        
          return () => clearInterval(interval);

     }, []);

     const {width, height} = Dimensions.get('window');


 const [amountIndollar, setamountIndollar] = useState('');
 const [isConverting, setisConverting] = useState(false);
  useEffect(() => {
    setisConverting(true)
    const data = {
      "amount": depositamount,
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
        setisConverting(false)
        setamountIndollar(responseJSON.data);
       }else{
          
       }
       
    }).catch((error) => {
        setisConverting(false)
       console.log(error);  
    }) 
  }, [])


  const NairaDeco = (amount) =>{
    return <Text > <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} 
     renderText={(value) => <Text>{value}</Text>} /></Text>
 }

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
            <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />
                
                {
                    (!isConverting)?
                   <View style={{width: '100%'}}>
                        <View style={styles.deposittwo_main_top}>
                            <Text style={[styles.deposittwo_main_top_a,{marginTop:height/12, maxWidth: '80%', textAlign: 'center'}]}>Confirming your transaction</Text>
                            
                        </View>

                        <View style={styles.deposittwo_main_middle}>
                            <View style={[styles.deposittwo_main_top_c2, {backgroundColor: Colors.background, marginTop: 10}]}>
                            <ActivityIndicator size={'large'} color={'#22C55E'} />
                            </View>
                            
                            <Text style={[styles.deposittwo_main_top_b2,{marginTop: -10}]}>Confirming deposit</Text>
                        
                        </View>
                   </View> :<ActivityIndicator/>
                }

              </View>
                {
                    (!isConverting)?
                    <View style={[styles.deposittwo_bottom_main]}>
                <View style={style.detail_wrapper2}>
                
                <View style={style.detail_container_p2pfulfil}>
                    <Text style={style.detail_header_p2pfulfil}>Transaction Details</Text>
                    <View style={style.detail_list_p2pfulfil}>
                        <Text style={style.detail_list_left_p2pfulfil}>Amount sent</Text>
                        {/* <Text style={style.detail_list_right_p2pfulfil}>₦120,300</Text> */}
                        <NumberFormat value={amountIndollar} displayType={'text'} thousandSeparator={true} prefix={'₦'}
                                        renderText={(value, props) => <Text style={style.detail_list_right_p2pfulfil} {...props}>({value})</Text>} />
                    </View>

                    <View style={style.detail_list_mid_p2pfulfil}>
                        <Text style={style.detail_list_left_p2pfulfil}>Amount you’ll get</Text>
                        <Text style={style.detail_list_right_p2pfulfil}>{NairaDeco(depositamount)}  </Text>
                    </View>

                    
                </View>
            </View>
            
               </View>:null
                }
                              
     </View>
    );
};



export default P2PFulfil;
