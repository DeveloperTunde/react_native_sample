
import React, { Component, useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, ActivityIndicator } from 'react-native';
import styles from '../screens/dashboard/styles';
import { Colors } from '../constants/Colors';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType} from '../screens/redux/actions';
import { BaseUrl } from '../constants/BaseUrl';


const DepositNetwork = (props) => {
    const {isLoggedIn, isActive, userJwt, networktype} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();

    function handleControl(x, z){
        dispatch(setNetworkType(x))
        props.setController(8)
    }


    const [networks, setNetworks] = useState([]);
    useEffect(() => {
        fetch(`${BaseUrl}/user-addresses`, {
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userJwt}`,
            },
           })
          .then((response) => response.json())
          .then((responseJSON) => {
           /// console.log('network', responseJSON.data);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setNetworks(responseJSON.data);
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          })  
     },[]);

    
    return (
            <>
                <View style={styles.modal_header}>
                    <Pressable style={styles.modal_header_left}  onPress={() => props.setController(2)}>
                        <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                    </Pressable>
                    <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                        <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                    </Pressable>
                 </View>
                <Text style={styles.depositeone_title}>Which network do you want to deposit on?</Text>
                    <View style={styles.depositeone_wrapper}>
                        
                        {
                        (networks.length < 1)? 
                         <ActivityIndicator />
                         :
                         networks.map((network, id) =>{
                             return (
                                <Pressable style={styles.depositeone_box} onPress={() => handleControl(network, network.id)} key={id}>
                                    <View style={[styles.depositeone_box_left, {backgroundColor: '#062638'}]}>
                                    <Image source={require('../../../assets/images/stablecoin4.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={styles.depositeone_box_right}>
                                        <Text style={styles.depositeone_box_right_a}>{network.network}</Text>
                                        <Text style={styles.depositeone_box_right_b}>{network.chain}</Text>
                                    </View>
                                </Pressable>
                             )
                         })
                        }

                    </View>
            </>
    );
};



export default DepositNetwork;
