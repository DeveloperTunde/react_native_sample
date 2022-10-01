
import React, { Component, useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';

import { Icon } from 'react-native-elements';
import { BaseUrl } from '../../../constants/BaseUrl';


const DepositOne = (props) => {

    const [open, setOpen] = useState(false);
      
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



    return (
            <>
                <View style={styles.modal_header}>
                    <Pressable style={styles.modal_header_left}  onPress={() => props.setController(1)}>
                        <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                    </Pressable>
                    <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                        <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                    </Pressable>
                 </View>
                <Text style={styles.depositeone_title}>How do you want to fund your account?</Text>
                    <View style={styles.depositeone_wrapper}>
                        {
                        (gateways.length < 1)?
                         <ActivityIndicator/>
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
                                <Pressable style={styles.depositeone_box} onPress={() =>  props.setControllerMode(gateway.name)} key={id}>
                                    <View style={styles.depositeone_box_left}>
                                    <Image source={{uri:gateway.image}} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={styles.depositeone_box_right}>
                                        <Text style={styles.depositeone_box_right_a}>{gateway.name}</Text>
                                        <Text style={styles.depositeone_box_right_b}>{gateway.description}</Text>
                                    </View>
                                </Pressable>

                                 
                             )
                         })
                        
                        }
                        
                        

                        {/* <Pressable style={styles.depositeone_box} onPress={() => props.setController(3)}>
                            <View style={styles.depositeone_box_left}>
                               <Image source={require('../../../assets/images/bank.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.depositeone_box_right}>
                                <Text style={styles.depositeone_box_right_a}>Bank Transfer</Text>
                                <Text style={styles.depositeone_box_right_b}>Recieve funds directly with your brace tag</Text>
                            </View>
                        </Pressable>

                        <Pressable style={styles.depositeone_box} onPress={() => props.setController(4)}>
                            <View style={styles.depositeone_box_left}>
                               <Image source={require('../../../assets/images/creditcard.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.depositeone_box_right}>
                                <Text style={styles.depositeone_box_right_a}>Card Payment</Text>
                                <Text style={styles.depositeone_box_right_b}>Recieve funds directly with your brace tag</Text>
                            </View>
                        </Pressable>

                        <Pressable style={styles.depositeone_box} onPress={() => props.setController(8)}>
                            <View style={styles.depositeone_box_left}>
                               <Image source={require('../../../assets/images/coin.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.depositeone_box_right}>
                                <Text style={styles.depositeone_box_right_a}>Crypto Exchange</Text>
                                <Text style={styles.depositeone_box_right_b}>Recieve funds directly with your brace tag</Text>
                            </View>
                        </Pressable> */}
                        
                        
                        
                    </View>
            </>
    );
};



export default DepositOne;
