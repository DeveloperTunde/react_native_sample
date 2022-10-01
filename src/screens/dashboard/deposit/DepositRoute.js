import React, { Component, useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from '../styles';
import style from '../style';
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';
import { BaseUrl } from '../../../constants/BaseUrl';
import Header from '../components/HeaderInner';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';

const DepositRoute = ({navigation}) => {

    const [gateways, setGateWays] = useState([]);
    useEffect(() => {
        fetch(`${BaseUrl}/gateway/deposit`, {
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             //console.log('gateway', responseJSON.data);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setGateWays(responseJSON.data);
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          })  
     },[]);



     function handleSendControllerMode(a){
        if(a == 'Crypto Exchange'){
            navigation.navigate('DepositCoin')
        }else if(a == 'Shareable Link'){
            navigation.navigate('DepositNine')
        }else if(a == 'The Peer'){
            navigation.navigate('DepositTwo')
        }else if(a == 'Bank Transfer'){
            navigation.navigate('DepositAmount')
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
                <View style={{width: '100%', marginTop: 20}}>

                <Text style={styles.depositeone_title}>How do you want to fund your account?</Text>
                    <View style={styles.depositeone_wrapper}>
                        {
                        (gateways.length < 1)?
                         <ActivityIndicator />
                        :
                         gateways.filter((gate) => gate.active == true).map((gateway, id) => {
                             
                           
                             return(
                                 
                                // (gateway.name == 'The Peer')?
                                // <Pressable style={styles.depositeone_box}>
                                //     <View style={styles.depositeone_box_left}>
                                //     <Image source={require('../../../assets/images/coin.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                                //     </View>
                                //     <View style={styles.depositeone_box_right}>
                                //     <SendMoney />
                                //     <Text style={styles.depositeone_box_right_b}>{gateway.description}</Text>
                                //     </View>
                                // </Pressable> 
                                // :
                                <Pressable style={style.depositeone_box_edit} onPress={() => handleSendControllerMode(gateway.name)} key={id}>
                                    <View style={[style.depositeone_box_edit_left, {backgroundColor: '#E6E9EB'}]}>
                                    <Image source={{uri:gateway.image}} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={style.depositeone_box_edit_right}>
                                        <View style={style.depositeone_box_right_up}>
                                           <Text style={style.depositeone_box_edit_right_a}>{gateway.name}</Text>
                                          {
                                              (gateway.name == 'Bank Transfer' || gateway.name == 'Crypto Exchange')?
                                              <Text style={style.depositeone_box_edit_right_b}>Rate: $1 = ₦601.50</Text>
                                              :null
                                          }
                                        </View>
                                        <View style={style.depositeone_box_right_down}>
                                            <Text style={style.depositeone_box_edit_right_b}>{gateway.description}</Text>
                                            
                                            {
                                              (gateway.name == 'Crypto Exchange')?
                                              <Text style={style.depositeone_box_edit_right_b}>Fee ~ 0.2%</Text>
                                              :null
                                          }
                                        </View>
                                    </View>
                                </Pressable>

                                 
                             )
                         })
                        
                        }
                        
                        

                        
                        
                        
                        
                    </View>
                </View>
              </View>
               
                              
     </View>
    );
};



export default DepositRoute;
