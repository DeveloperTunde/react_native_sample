
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, ActivityIndicator } from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType} from '../../redux/actions';

const DepositSeven = (props) => {
    const {isLoggedIn, isActive, userJwt, assettype, networktype} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();

    function handleControl(x){
        dispatch(setAssetType(x))
        props.setControllerRe(9)
    }

    const [assets, setAssets] = useState([]);
    useEffect(() => {
        fetch(`${BaseUrl}/user-addresses/assets`, {
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userJwt}`,
            },
           })
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log('assets', responseJSON);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setAssets(responseJSON.data);
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          })  
     },[]);



     




    return (
            <>
                <View style={styles.modal_header}>
                    <Pressable style={styles.modal_header_left}  onPress={() => props.setController(11)}>
                        <Image source={require('../../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                    </Pressable>
                    <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                        <Image source={require('../../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                    </Pressable>
                 </View>
                <Text style={styles.depositeone_title}>What coin do you want to deposit with? </Text>
                    <View style={styles.depositeone_wrapper}>


                    {
                        (assets.length < 1)? 
                         <ActivityIndicator />
                         :
                         assets.map((asset, id) =>{
                             return (
                                <Pressable style={styles.depositeone_box} onPress={() => handleControl(asset.symbol)} key={id}>
                                    <View style={[styles.depositeone_box_left, {backgroundColor: '#50AF95'}]}>
                                    <Image source={require('../../../assets/images/stablecoin1.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={styles.depositeone_box_right}>
                                        <Text style={styles.depositeone_box_right_a}>{asset.symbol}</Text>
                                        <Text style={styles.depositeone_box_right_b}>{asset.name}</Text>
                                    </View>
                                </Pressable>
                             )
                         })
                        }


                        

                        {/* <Pressable style={styles.depositeone_box} >
                            <View style={[styles.depositeone_box_left, {backgroundColor: '#2775CA'}]}>
                               <Image source={require('../../../assets/images/stablecoin2.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.depositeone_box_right}>
                                <Text style={styles.depositeone_box_right_a}>USDC</Text>
                                <Text style={styles.depositeone_box_right_b}>United States Dollar Coin</Text>
                            </View>
                        </Pressable>

                        <Pressable style={styles.depositeone_box}>
                            <View style={[styles.depositeone_box_left, {backgroundColor: '#F5AC37'}]}>
                               <Image source={require('../../../assets/images/stablecoin3.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.depositeone_box_right}>
                                <Text style={styles.depositeone_box_right_a}>DAI</Text>
                                <Text style={styles.depositeone_box_right_b}>Recieve funds directly with your brace tag</Text>
                            </View>
                        </Pressable>

                        <Pressable style={styles.depositeone_box}>
                            <View style={[styles.depositeone_box_left, {backgroundColor: '#062638'}] }>
                               <Image source={require('../../../assets/images/stablecoin4.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.depositeone_box_right}>
                                <Text style={styles.depositeone_box_right_a}>BUSD</Text>
                                <Text style={styles.depositeone_box_right_b}>Binance United State Dollar</Text>
                            </View>
                        </Pressable> */}
                    </View>
            </>
    );
};



export default DepositSeven;
