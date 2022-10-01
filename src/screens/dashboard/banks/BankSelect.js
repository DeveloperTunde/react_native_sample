
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerD';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style';
import { Tab, TabView, } from 'react-native-elements';



const BankSelect = ({route, navigation}) => {

    
    const {isLoggedIn, isActive, userJwt, userData, assettype, networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);

    const [index, setIndex] = React.useState(0);

    const{width, height} = Dimensions.get('window')
    const [isAccountAvailable, setisAccountAvailable]  = useState(false)

    const [isWalletAvailable, setisWalletAvailable]  = useState(true)



    const [savedWallets, setSavedWallets] = useState([])
      useEffect(() => {
        fetch(`${BaseUrl}/finance/crypto/beneficiary`, {
          method: 'GET', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJwt}`,
          },
         })
        .then((response) => response.json())
        .then((responseJSON) => {
         // console.log('wallet beneficiaries', responseJSON);
           if(responseJSON.status == true && responseJSON.statusCode == 200){
              setSavedWallets(responseJSON.data);
           }else{
              
           }
           
        }).catch((error) => {
           console.log(error);  
        }) 
      }, [])


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
             //console.log('addedaccounts', responseJSON.data);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setAddedAccounts(responseJSON.data);
                setisRequesting(false)
             }else{
                
             }
             
          }).catch((error) => {
            setisRequesting(false)
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
               <Header  navigation={navigation} isBackArrow={true} title="Banks & wallets" />

         
                <View style={{width, marginLeft:-15, marginTop: 30}}>
                           
                        <Tab
                            value={index}
                            onChange={(e) => setIndex(e)}
                            indicatorStyle={{
                                backgroundColor: '#22C55E',
                                height: 3,
                                paddingHorizontal: 0,
                                
                            }}
                            variant='primary'
                            backgroundColor={'red'}
                            
                            >
                            <Tab.Item
                                title="Banks"
                                titleStyle={[style.tab_title, {color:(index == 0)?'#062638': '#CDD4D7', textTransform: 'none'}]}
                                
                            />
                            <Tab.Item
                                title="Wallets"
                                titleStyle={[style.tab_title, {color:(index == 1)?'#062638': '#CDD4D7', textTransform: 'none'}]}
                           
                            />
                            
                            </Tab>

                            <TabView value={index} onChange={setIndex} animationType="spring">
                            <TabView.Item style={{ backgroundColor: '#fff', width: '100%', height}}>
                            {
                                (addedaccounts.length> 0)?
                                <View style={[styles.depositeone_wrapper,{paddingHorizontal: 15}]}>
                                {
                                    addedaccounts.map((account) => {
                                        return(
                                            <Pressable style={styles.withdrawtwo_box} >
                                                <View style={styles.withdrawtwo_left}>
                                                <Image source={require('../../../assets/images/accesslogo1.png')} style={styles.withdrawtwo_left_img} resizeMode='contain'/>
                                                </View>
                                                <View style={styles.withdrawtwo_right}>
                                                    <Text style={styles.withdrawtwo_right_a}>{account.name}</Text>
                                                    <Text style={styles.withdrawtwo_right_b}> {account.bank} - {account.accountNumber}</Text>
                                                </View>
                                            </Pressable>
                                        )
                                    })
                                }
                                

                                

                                <View style={[styles.btn_container,{marginTop: 40}]}>
                                    <TouchableOpacity style={styles.btn_wrapper} onPress={() => navigation.navigate('BankAdd')}>
                                    <Text style={styles.btn_text}>Add account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={[styles.depositeone_wrapper,{paddingHorizontal: 15}]}>
                                <View style={styles.deposittwo_main_top}>
                                    
                                    <Text style={[styles.deposittwo_main_top_d_b, {fontStyle: 'italic', maxWidth: '70%'}]}>You do not have a saved bank account currently</Text>
                                </View>

                                <View style={[styles.btn_container,{marginTop: 40}]}>
                                    <TouchableOpacity style={styles.btn_wrapper} onPress={() => navigation.navigate('BankAdd')}>
                                    <Text style={styles.btn_text}>Add account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            }
                            </TabView.Item>
                            <TabView.Item style={{ backgroundColor: '#fff', width: '100%', height}}>
                                
                            {
                                (savedWallets.length> 0)?
                                <View style={[styles.depositeone_wrapper,{paddingHorizontal: 15}]}>

                                {
                                    savedWallets.map((wallet) => {
                                        return(
                                            <Pressable style={styles.withdrawtwo_box} >
                                                <View style={styles.withdrawtwo_left}>
                                                <Image source={require('../../../assets/images/stablecoin1.png')} style={styles.withdrawtwo_left_img} resizeMode='contain'/>
                                                </View>
                                                <View style={styles.withdrawtwo_right}>
                                                    <Text style={styles.withdrawtwo_right_a}>{wallet.symbol}</Text>
                                                    <Text style={styles.withdrawtwo_right_b}> {wallet.address}</Text>
                                                </View>
                                            </Pressable>
                                        )
                                    })
                                }


                                

                                

                                <View style={[styles.btn_container,{marginTop: 40}]}>
                                    <TouchableOpacity style={styles.btn_wrapper} onPress={() => navigation.navigate('WalletAdd')}>
                                    <Text style={styles.btn_text}>Add wallet</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={[styles.depositeone_wrapper,{paddingHorizontal: 15}]}>
                                <View style={styles.deposittwo_main_top}>
                                    
                                    <Text style={[styles.deposittwo_main_top_d_b, {fontStyle: 'italic', maxWidth: '60%'}]}>You do not have a saved wallet currently</Text>
                                </View>

                                <View style={[styles.btn_container,{marginTop: 40}]}>
                                    <TouchableOpacity style={styles.btn_wrapper} onPress={() => navigation.navigate('WalletAdd')}>
                                    <Text style={styles.btn_text}>Add wallet</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            }

                            </TabView.Item>
                           
                            </TabView>
                           
                        </View>
                    </View>
                                        
     </View>
    );
};



export default BankSelect;
