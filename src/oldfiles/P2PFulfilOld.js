
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../screens/dashboard/styles';
import style from '../screens/dashboard/style';
import { Colors } from '../constants/Colors';
import  Modal  from 'react-native-modal';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { BaseUrl } from '../constants/BaseUrl';
import NumberFormat from 'react-number-format';

const P2PFulfil = (props) => {
    const {depositamount, depositref, userJwt} = useSelector(state => state.userReducer);

    const [isFetching, setIsFetching] = useState(true);

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
                        props.setController(6)
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

    return (
        <View style={styles.deposittwo_container}>
            <View style={styles.deposittwo_top}>
            <View style={styles.modal_header}>
                <Pressable style={styles.modal_header_left}  onPress={() => props.setController(5)}>
                    <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                </Pressable>
                {/* <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                    <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                </Pressable> */}
            </View>

            <View style={styles.deposittwo_main_top}>
                <Text style={[styles.deposittwo_main_top_a,{marginTop:height/12, maxWidth: '80%', textAlign: 'center'}]}>Confirming your transaction</Text>
                
            </View>

            <View style={styles.deposittwo_main_middle}>
                <View style={[styles.deposittwo_main_top_c2, {backgroundColor: Colors.background, marginTop: 10}]}>
                   <ActivityIndicator size={'large'} color={'#22C55E'} />
                </View>
                
                <Text style={[styles.deposittwo_main_top_b2,{marginTop: -10}]}>Confirming deposit</Text>
               
            </View>

         
            </View>
            <View style={[styles.deposittwo_bottom]}>
            <View style={style.detail_wrapper2}>
                
                <View style={style.detail_container_p2pfulfil}>
                    <Text style={style.detail_header_p2pfulfil}>Transaction Details</Text>
                    <View style={style.detail_list_p2pfulfil}>
                        <Text style={style.detail_list_left_p2pfulfil}>Amount sent</Text>
                        {/* <Text style={style.detail_list_right_p2pfulfil}>₦120,300</Text> */}
                        <NumberFormat value={depositamount*600} displayType={'text'} thousandSeparator={true} prefix={'₦'}
                                        renderText={(value, props) => <Text style={styles.detail_list_right_p2pfulfil} {...props}>({value})</Text>} />
                    </View>

                    <View style={style.detail_list_mid_p2pfulfil}>
                        <Text style={style.detail_list_left_p2pfulfil}>Amount you’ll get</Text>
                        <Text style={style.detail_list_right_p2pfulfil}>${depositamount}  </Text>
                    </View>

                    
                </View>
            </View>
                
            </View>
            
    </View>
    );
};



export default P2PFulfil;
