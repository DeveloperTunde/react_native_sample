import React, { Component, useEffect, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setFallbackRoute, setFallbackRouteParam, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';
import Header from '../components/HeaderInner';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';

const WithdrawRoute = ({navigation}) => {

    const {isLoggedIn, isActive, userJwt, userData} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();
    const [open, setOpen] = useState(false);
      
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
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setGateWays(responseJSON.data);
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          })  
     },[]);

    function handleWithdrawControllerMode (a){
        if(userData.emailVerified && userData.kycVerified){
            navigation.navigate('WithdrawAmount',{withdrawRoute:a})
        }else{
            dispatch(setFallbackRouteParam(a));
            handleFallbackRoute('WithdrawRoute')
        }
     }


     function handleFallbackRoute(route){
        dispatch(setFallbackRoute(route))
        navigation.navigate('KycIndex')
     }

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="" />
               <Text style={[styles.depositeone_title,{marginTop: 20}]}>Where do you want to withdraw to?</Text>
                    <View style={styles.depositeone_wrapper}>
                        {
                        (gateways.length < 1)?
                         <ActivityIndicator/>
                        :
                         gateways.filter((gate) => gate.active == true).map((gateway, id) => {
                             
                           
                             return(
                                 
                                (gateway.name == 'The Peer')?
                                <Pressable style={styles.depositeone_box}>
                                    <View style={[styles.depositeone_box_left, {backgroundColor: '#E6E9EB'}]}>
                                    <Image source={require('../../../assets/images/coin.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={styles.depositeone_box_right}>
                                    <SendMoney />
                                    <Text style={styles.depositeone_box_right_b}>{gateway.description}</Text>
                                    </View>
                                </Pressable> 
                                :
                                <Pressable style={styles.depositeone_box} onPress={() =>  handleWithdrawControllerMode(gateway.name)} key={id}>
                                    <View style={[styles.depositeone_box_left, {backgroundColor:'#E6E9EB'}]}>
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
                        
           
                    </View>
              </View>
                
                              
     </View>
    );
};



export default WithdrawRoute;
