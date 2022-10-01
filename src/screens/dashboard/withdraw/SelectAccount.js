
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInner';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';

const SelectAccount = ({navigation}) => {
    
    const {isLoggedIn, isActive, userJwt, assettype, networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const [isRequesting, setisRequesting] = useState(true);
    const [addedaccounts, setAddedAccounts] = useState([]);

    useEffect(() => {
        fetch(`${BaseUrl}/finance/bank/beneficiary`, {
            method: 'GET', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userJwt}`,
            },
           })
          .then((response) => response.json())
          .then((responseJSON) => {
             console.log('addedaccounts', responseJSON.data);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setAddedAccounts(responseJSON.data);
                setisRequesting(false)
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
          })  
     },[]);

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
                 <Header  navigation={navigation} isBackArrow={true} title="Select bank account" />

                {
                  (isRequesting)?
                  <ActivityIndicator  style={{marginTop: 30}}/>
                  :
                  (addedaccounts.length > 0)?
                   <View style={{width: '100%'}}>
                   <View style={styles.send_contact_title}>
                         <Text style={styles.send_contact_title_text}>Select account</Text>
                    </View>
                    <View style={styles.depositeone_wrapper}>
                        {
                          addedaccounts.map((account) => {
                              return(
                                <Pressable style={styles.withdrawtwo_box} onPress={() => navigation.navigate('ConfirmWithdrawal',{account})}>
                                    <View style={styles.withdrawtwo_left}>
                                    <Image source={require('../../../assets/images/accesslogo1.png')} style={styles.withdrawtwo_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={styles.withdrawtwo_right}>
                                        <Text style={styles.withdrawtwo_right_a}>{account.name}</Text>
                                        <Text style={styles.withdrawtwo_right_b}>{account.bank} - {account.accountNumber}</Text>
                                    </View>
                                </Pressable>
                              )
                          })
                        }
                      
                    </View>
                   </View>
                    :
                   <View style={{width: '100%', marginTop: 30}}>
                    <View style={styles.deposittwo_main_top}>
                        <View style={styles.deposittwo_main_top_c_b}>
                           <Image source={require('../../../assets/images/bank2.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
                        </View>
                      
                        <Text style={styles.deposittwo_main_top_d_b}>You do not have a saved bank account currently</Text>
                    </View>

                    
                        <View style={styles.btn_container}>
                            <TouchableOpacity style={styles.btn_wrapper} onPress={() => navigation.navigate('AddAccount')}>
                               <Text style={styles.btn_text}>Add account</Text>
                            </TouchableOpacity>
                        </View>
          
                  </View>
                }   
                </View>   
            </View>
    );
};



export default SelectAccount;
