import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, ActivityIndicator } from 'react-native';
import styles from '../styles';
import style from '../style';
import { Colors } from '../../../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import AwesomeAlert from 'react-native-awesome-alerts';
import Clipboard from '@react-native-community/clipboard';
import Share from 'react-native-share';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType} from '../../redux/actions';
import CustomAlert from '../../components/CustomAlertB';
import Header from '../components/HeaderInnerB';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';

const DepositEight = ({route, navigation}) => {
    const {initialAsset} = route.params;
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitleColor, setAlertTitleColor] = useState(Colors.green);
    const [isCopied, setCopied] = useState(false)

    function handleCopy(a){
        Clipboard.setString(a);
        setCopied(true)
    }

   

    const {isLoggedIn, isActive, userJwt, assettype, networktype} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();
    const [isRequesting, setIsRequesting] = useState(false);


    const [assets, setAssets] = useState([]);
    useEffect(() => {
        setIsRequesting(true)
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
            setIsRequesting(false)
            console.log('assets', responseJSON);
             if(responseJSON.status == true && responseJSON.statusCode == 200){
                setAssets(responseJSON.data);
             }else{
                
             }
             
          }).catch((error) => {
             console.log(error);  
             setIsRequesting(false)
          })  
     },[]);


     const [address, setAddress] = useState([]);
     const [chain, setChain] = useState([]);
     const [allAddress, setAllAddress] = useState([]);
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
             console.log('adresss', responseJSON);
              if(responseJSON.status == true && responseJSON.statusCode == 200){
                console.log(responseJSON.data[0])
                setAddress(responseJSON.data[0].address);
                setChain(responseJSON.data[0].chain)
                setAllAddress(responseJSON.data);
              }else{
                 
              }
              
           }).catch((error) => {
              console.log(error);  
           })  
      },[]);

     
     const allassets = assets.map(asset => (asset.symbol))


     function handleShare(){
        const options = {
            message: address,
            title: 'Hey, here is my blockchain address',
        }
        Share.open(options)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
    }

     const [userasset, setUserAsset] = useState(initialAsset);

     function handlesetUserAsset(a){
        setUserAsset(a)
        dispatch(setAssetType(a))
     }
     const logo = require('../../../assets/images/loader.png');



     const [isActiveThree, setActiveThree] = useState(false);
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
      function handleSetSelectedNet(a){
        const newaddr =  allAddress.filter((filt)=> filt.chain == a);
        console.log(newaddr.address)
        setAddress(newaddr[0].address)
        setChain(newaddr[0].chain)
       
        setSelectedNetwork(a)
      }


      const B = (props) => <Text style={{fontWeight: '800'}}>{props.children}</Text>

      useEffect(() => {
        if(!showAlert){
            return
        }
        setTimeout(() => {
            setShowAlert(false)
        }, 5000);
      }, [showAlert])


    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={'transparent'}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="Wallet Deposit" />
               <View style={[styles.crypto_wrap, {paddingTop: 30}]}>
                   <View style={style.qr_select_background}></View>
                    <View style={styles.deposittwo_main_middle2}>
                        <View style={style.deposittwo_main_middle_bank_wrap2}>
                        <SelectDropdown
                            data={allassets}
                            onSelect={(selectedItem, index) => {
                                handlesetUserAsset(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            renderDropdownIcon={isOpened => {
                                return  <Icon name={isOpened ? 'caret-up' : 'caret-down'} type='font-awesome' color={Colors.black} size={14} style={styles.stats_week_icon}/>;
                            }}
                            dropdownStyle={styles.dropdown4DropdownStyle2}
                            rowStyle={styles.dropdown4RowStyle2}
                            rowTextStyle={styles.dropdown4RowTxtStyle2}
                            buttonStyle={styles.deposittwo_main_middle_bank2}
                            buttonTextStyle ={styles.deposittwo_main_middle_bank_text2}
                            dropdownIconPosition='right'
                            defaultButtonText={assettype}
                        />
                        </View>
                    </View>

                    {/* <Image source={require('../../../assets/images/qrcode.png')} resizeMode='contain' style={styles.crypto_qrcode_img}/> */}
                    
                    <View style={style.crypto_qrcode_qrcode}>
                    <QRCode
                        size={160}
                        logoSize={40}
                        value={address}
                        logo={logo}
                        logoBackgroundColor={'#ffffff'}
                        />
                        <Text style={style.crypto_qrcode_text}>Scan to deposit</Text>
                    </View>


                    <View style={styles.form_group}>
                   <Text style={styles.form_label}>Select network</Text>
                    <View style={(isActiveThree)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                    <SelectDropdown
                        data={allnetworks}
                        onSelect={(selectedItem, index) => {
                            handleSetSelectedNet(selectedItem)
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
                        defaultButtonText={allnetworks[0]}
                    />
                    </View>
                    
                </View>
                    
                    {
                       // isRequesting?<ActivityIndicator />:
                       <View style={{width: '100%'}}>
                            <Text style={[styles.form_label01, {textAlign: 'left', marginTop: 20}]}>{assettype} Deposit address</Text>
                            <View style={style.v_tag_link_wrap}>
                                    <View style={style.v_tag_link_middle2}>
                                        <Text style={style.v_tag_link_middle_text11}>{address}</Text>
                                    </View>
                                    {
                                        (isCopied)?
                                        <Text style={style.copied}>Copied</Text>
                                        :
                                    <Pressable onPress={() => handleCopy(address)}>
                                        
                                        <Image source={require('../../../assets/images/copy.png')} style={styles.v_tag_link_r} resizeMode='contain'/>
                                        </Pressable>
                                    }
                                    
                            </View>
                       </View>
                  }

               
                    
                    <Text style={style.crypto_share_warning}>Only <B>{assettype}({chain})</B> should be sent to this address! Sending another </Text>
                    <Pressable style={styles.crypto_share_wrap} onPress={() => handleShare()}>
                        <Image source={require('../../../assets/images/share.png')} resizeMode='contain' style={styles.crypto_share_wrap_img}/>
                        <Text style={styles.crypto_share_text}>Share wallet address</Text>
                    </Pressable>
                </View>
              </View>
                {/* <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                        <TouchableOpacity style={styles.btn_wrapper2} >
                            <Text style={styles.btn_text}>Add account </Text>
                        </TouchableOpacity>
                    </View>
            
               </View> */}


                   <CustomAlert 
                      show={showAlert} 
                      message={alertMessage} 
                      buttonTitle='Close'
                      onConfirmPressed={() => {
                         setShowAlert(false)
                        }} 
                      type='success'
                      
                    /> 
                              
     </View>
    );
};



export default DepositEight;
