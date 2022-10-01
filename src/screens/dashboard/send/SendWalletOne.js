
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerC';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style';
import CountryPicker from 'react-native-country-picker-modal';
import { Flags } from '../../../constants/CountryFlags';
import CustomAlert from '../../components/CustomAlertB';

const SendWalletOne = ({navigation}) => {
    const [isHaveaccountsSaved, setisHaveaccountsSaved] = useState(false);
    
    const {isLoggedIn, isActive, userJwt, userData, assettype, sendamount, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const [isRequesting, setisRequesting] = useState(true);
    const [allbanks, setAllBanks] = useState([]);
    const [userbank, setBank] = useState('');

   

    const [isActiveOne, setActiveOne] = useState(false);
    const [isActiveTwo, setActiveTwo] = useState(false);
    const [isActiveThree, setActiveThree] = useState(false);
 
    const [email, setEmail] = useState('');
    const [accountname, setAccountName] = useState('Falola Oluwaseyi');
    const [walletaddress, setWalletAddress] = useState('');
 
     const onChangeHandler = (name, value) => {
       if(name=="walletaddress"){
        setWalletAddress(value)
       }else if (name=="email") {
         setEmail(value);
       }else if (name=="phonenumber") {
         setPhone(value)
       }
      }

      const banks = allbanks.map((bank)=> (
          bank.name
      ));



      const [showAlert2, setShowAlert2] = useState(false);
      const [alertTitle2, setAlertTitle2] = useState('');
      const [alertMessage2, setAlertMessage2] = useState('');
      const [isAdding, setIsAdding] = useState(false);

      const [checking, setChecking] = useState(false);
      const [validateSuccess, setValidationSuccess] = useState(false);
      const [isAccountWrong, setIsAccountWrong] = useState(false);



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
    
       const allnetworks = networks.map((net)=> (
        net.chain
    ));

      const [usernetwork, setSelectedNetwork] = useState('');
      const [userasset, setSelectedAssets] = useState('');

       const [assets, setAssets] = useState([]);
       const [assetimage, setAssetImage] = useState([]);


       function handlesetSelectedNet(x){
        setAssetImage(assets.filter((filt)=> filt.symbol == x ));
        setSelectedAssets(x)
       }
      
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
          //console.log('assets', responseJSON);
           if(responseJSON.status == true && responseJSON.statusCode == 200){
              setAssets(responseJSON.data);
           }else{
              
           }
           
        }).catch((error) => {
           console.log(error);  
        }) 
      }, [])
      

        const allassets = assets.map((asset)=> (
          asset.symbol
      ));

      
      


      function handleWalletRoute() {
        setIsAdding(true);

        const data = {
          "address": walletaddress,
          "network": usernetwork
        }

        fetch(`${BaseUrl}/finance/validate-crypto-address`, {
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
         })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log('assets', responseJSON);
          setIsAdding(false);
          const wallet = {
            'symbol':userasset,
            'address': walletaddress,
            'network':usernetwork,
 
         }
           if(responseJSON.status == true && responseJSON.statusCode == 200){
            
            if (responseJSON.data.isValid == true) {
              navigation.navigate('SendWalletTwo',{wallet})
            }else{
              setShowAlert2(true)
              setAlertMessage2('Incorrect wallet address')
              setTimeout(() => {
                navigation.navigate('SendWalletTwo',{wallet})
              }, 3000);
            }
           }else{
            setShowAlert2(true)
            setAlertMessage2(responseJSON.error.message)
           }
           
        }).catch((error) => {
          setIsAdding(false);
           console.log(error);  
        }) 
      }


      const [beneficiaryWallets, setBeneficiaryWallets] = useState([])
      useEffect(() => {
        fetch(`${BaseUrl}/finance/crypto/beneficiary/external`, {
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
            setBeneficiaryWallets(responseJSON.data);
           }else{
              
           }
           
        }).catch((error) => {
           console.log(error);  
        }) 
      }, [])



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

      const {width, height} = Dimensions.get('window')

      const [showbeneficiary, setShowBeneficiary] = useState(false)



      useEffect(() => {
        if(!showAlert2){
            return
        }
        setTimeout(() => {
          setShowAlert2(false)
        }, 5000);
      }, [showAlert2])

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={'transparent'}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title={`Send $${sendamount}`} />
                {
                    (networks.length < 1)?
                    <ActivityIndicator style={{marginTop: 30}}/>
                    :
               
               <View>
                <View style={style.beneficiary_wrap}> 
                   <Text style={style.beneficiary_heading} >Choose saved account</Text>   
                    <ScrollView 
                       horizontal={true} 
                       style={style.beneficiary}
                       showsVerticalScrollIndicator ={false}
                       showsHorizontalScrollIndicator={false}>

                      <Pressable style={style.beneficiary_box_small} onPress={() => setShowBeneficiary(!showbeneficiary)}>
                           <View style={style.beneficiary_image_small}>
                              <Image source={require('../../../assets/images/walletblack.png')} style={style.beneficiary_image_img_small} resizeMode='contain'/>
                           </View>
                           <Text style={style.beneficiary_text}>Select wallet</Text>
                        </Pressable>

                      {
                        savedWallets.map((wallet)=>{
                          return(
                            <Pressable style={style.beneficiary_box2}>
                              <View style={style.beneficiary_image2}>
                                  <Image source={require('../../../assets/images/walletblack.png')} style={style.beneficiary_image_img2} resizeMode='contain'/>
                              </View>
                              <Text style={style.beneficiary_text}>Falola </Text>
                              <Text style={style.beneficiary_text_b}> Oluwaseyi</Text>
                            </Pressable>
                          )
                        })
                      }
                        


                       

                    </ScrollView>

                    

                </View>


                {
                  (showbeneficiary )?
                  <ScrollView style={[styles.depositeone_wrapper, {height:height-height/3, marginTop: 15 }]}>
                        {
                          beneficiaryWallets.map((wallet) => {
                              return(
                                <Pressable style={styles.withdrawtwo_box} onPress={()=> navigation.navigate('SendWalletTwo',{wallet})}>
                                    <View style={styles.withdrawtwo_left}>
                                    <Image source={require('../../../assets/images/accesslogo1.png')} style={styles.withdrawtwo_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={styles.withdrawtwo_right}>
                                        <Text style={styles.withdrawtwo_right_a}>{wallet.name}</Text>
                                        <Text style={styles.withdrawtwo_right_b}>{wallet.symbol} - {wallet.address}</Text>
                                    </View>
                                </Pressable>
                              )
                          })
                        }
                      
                </ScrollView>
                : null
                }

               {
                 (!showbeneficiary)?
                 <View style={{width: '100%'}}>
                 <View style={styles.form_group}>
                       <Text style={styles.form_label}>Coin to send</Text>
                       <View style={(isActiveOne)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                          
                           <View style={styles.form_input_type_2_icon}>
                            {
                              (userasset !='')?
                              <Image source={{uri:assetimage[0].image}} resizeMode='contain' style={[styles.input_group_country_imge, {marginLeft: 5}]}/>
                              :null
                            }
                           </View>
 
                           <SelectDropdown
                         data={allassets}
                         onSelect={(selectedItem, index) => {
                             handlesetSelectedNet(selectedItem)
                         }}
                         buttonTextAfterSelection={(selectedItem, index) => {
                             return selectedItem
                         }}
                         rowTextForSelection={(item, index) => {
                             return item
                         }}
                         renderDropdownIcon={isOpened => {
                             (isOpened)?setActiveOne(true):setActiveOne(false)
                             
                             return  <Icon name={isOpened ? 'angle-up' : 'angle-down'} type='font-awesome' color={Colors.black} size={24} style={styles.stats_week_icon}/>;
                         }}
                         
                        
                         dropdownStyle={(userasset !='')?style.dropdown4DropdownStylenew2:style.dropdown4DropdownStylenew}
                         
                         rowStyle={style.dropdown4RowStylenew}
                         rowTextStyle={style.dropdown4RowTxtStylenew}
                         buttonStyle={(userasset !='')?style.deposittwo_main_middle_banknew2:style.deposittwo_main_middle_banknew}
                         buttonTextStyle ={style.deposittwo_main_middle_bank_textnew}
                         dropdownIconPosition='right'
                         defaultButtonText='Select coin'
                        
                     />
                       </View>
                   </View>
 
                 
 
 
                 <View style={styles.form_group}>
                 <Text style={styles.form_label}>Wallet address</Text>
                 <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                 <TextInput 
                 placeholder='Enter or paste wallet address'
               
                 placeholderTextColor={Colors.placeholder}
                 value={walletaddress}
                 onChangeText={(value)=>onChangeHandler('walletaddress',value)}
                 onFocus={() => setActiveTwo(true)}
                 onBlur={() => setActiveTwo(false)}
                 style={styles.form_input_type_2}
                 />
 
                 </View>
                 </View>
 
 
                 <View style={styles.form_group}>
                    <Text style={styles.form_label}>Network</Text>
                     <View style={(isActiveThree)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                     <SelectDropdown
                         data={allnetworks}
                         onSelect={(selectedItem, index) => {
                             setSelectedNetwork(selectedItem)
                         }}
                         buttonTextAfterSelection={(selectedItem, index) => {
                             return selectedItem
                         }}
                         rowTextForSelection={(item, index) => {
                             return item
                         }}
                         renderDropdownIcon={isOpened => {
                             (isOpened)?setActiveThree(true):setActiveThree(false)
                             
                             return  <Icon name={isOpened ? 'angle-up' : 'angle-down'} type='font-awesome' color={Colors.black} size={24} style={styles.stats_week_icon}/>;
                         }}
                         dropdownStyle={styles.dropdown4DropdownStylenew}
                         rowStyle={styles.dropdown4RowStylenew}
                         rowTextStyle={styles.dropdown4RowTxtStylenew}
                         buttonStyle={styles.deposittwo_main_middle_banknew}
                         buttonTextStyle ={styles.deposittwo_main_middle_bank_textnew}
                         dropdownIconPosition='right'
                         defaultButtonText='Select network'
                     />
                     </View>
                 </View>
 
 
                 
 
 
                 </View>:null
               }
                </View>
}
              </View>
                {
                  (!showbeneficiary)?
                  <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        {
                            (userasset != '' && walletaddress != '' && usernetwork !='') ?
                            (!isAdding)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleWalletRoute()}>
                                <Text style={styles.btn_text}>Proceed </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                {/* <Text style={styles.btn_text}>Requesting</Text> */}
                                <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:0}}/>
                            </TouchableOpacity>
                             :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <Text style={styles.btn_text}>Proceed </Text>
                            </TouchableOpacity>
                        }
                        
                    </View>
            
               </View>:null
                }
              
                     <CustomAlert 
                      show={showAlert2} 
                      message={alertMessage2} 
                      buttonTitle='Okay'
                      onConfirmPressed={() => {
                        setShowAlert2(false)
                        }} 
                      type='error'
                      
                    />              
     </View>
    );
};



export default SendWalletOne;
