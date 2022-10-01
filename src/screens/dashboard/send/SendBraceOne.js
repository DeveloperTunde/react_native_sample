
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import styles from '../styles';
import style from '../style';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerC';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';
import { Flags } from '../../../constants/CountryFlags';

const SendWalletOne = ({navigation}) => {
    
    //savedcontact
    const {isLoggedIn, isActive, userJwt, savedcontact, userData,assettype, sendamount,networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const [isRequesting, setisRequesting] = useState(true);
    const [addedaccounts, setAddedAccounts] = useState([]);

    const {width, height} = Dimensions.get('window');

    const [isActiveTwo, setActiveTwo] = useState(false);

   
     const [tagvalue, setBraceTag] = useState('');
 
     const onChangeHandler = (name, value) => {
       if(name=="tagvalue"){
         setBraceTag(value);
       }
      }


      const [recentBraceAcc, setRecentBraceAcc] = useState([]);
      useEffect(() => {      
         fetch(`${BaseUrl}/finance/brace-tag/recent`, {
          method: 'GET', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJwt}`,
          },
         
         })
        .then((response) => response.json())
        .then((responseJSON) => {
           console.log('Recennt Brace Response ', responseJSON)
           if(responseJSON.status == true && responseJSON.statusCode == 200){
              setRecentBraceAcc(responseJSON.data)
           }else{
               
           }
           
        }).catch((error) => {
           console.log('Contact Erroe',error);  
        })  
      
      }, [])




      const [recentBankAcc, setRecentBankAcc] = useState([]);
      useEffect(() => {      
         fetch(`${BaseUrl}/finance/bank/recent`, {
          method: 'GET', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJwt}`,
          },
         
         })
        .then((response) => response.json())
        .then((responseJSON) => {
           console.log('Recennt Bank Response ', responseJSON)
           if(responseJSON.status == true && responseJSON.statusCode == 200){
            setRecentBankAcc(responseJSON.data)
           }else{
               
           }
           
        }).catch((error) => {
           console.log('Contact Erroe',error);  
        })  
      
      }, [])
      


      const savedcontact2 =  [
        {
          "name": "Falola Tele",
          "username": "$falola",
          "userId": "13ac68c9-7ceb-4ff7-b213-89d99ced2eac",
          "phoneNumber": '08162879550'
        },
        {
          "name": "Bukola Ola",
          "username": "$bukky123",
          "userId": "7d9b138f-f60a-4974-9aa5-8a8886dfe51c",
          "phoneNumber": '081718363738'
        },
        {
            "name": "Bambam ",
            "username": "$bambam",
            "userId": "7d9b138f-f60a-4974-9aa5-8a8886dfe51c",
            "phoneNumber": '09035627678'
        },
        {
            "name": "Seyi Falola",
            "username": "$seyifalola",
            "userId": "7d9b138f-f60a-4974-9aa5-8a8886dfe51c",
            "phoneNumber": '070345687877'
        },
        {
            "name": "The Major ",
            "username": "majortele",
            "userId": "7d9b138f-f60a-4974-9aa5-8a8886dfe51c",
            "phoneNumber": '090637252732'
        },
        {
            "name": "Olatunde",
            "username": "$olatunde",
            "userId": "7d9b138f-f60a-4974-9aa5-8a8886dfe51c",
            "phoneNumber": '08146141452'
          }

      ]
 
      const [filteredContact, setFilteredContacts] = useState([])

      const handleChangedInput =(text) =>{
           // alert('yes')
            setFilteredContacts([])
            setBraceTag(text)
            const search = text.toLowerCase().toString();
            if (text != '' ) {
             if (isNaN(text)) {
                const outp = savedcontact.filter(x => String(x.username).includes(search));
                setFilteredContacts(outp)

               // console.log(outp)
             }else{
                const outp = savedcontact.filter(x => String(x.phoneNumber).includes(search));
                setFilteredContacts(outp)

                //console.log(outp)
             }
            
           
            }
      }

      const regex = /(<([^>]+)>)/ig;
      //const result = data.description.replace(regex, '');
    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
                 <Header  navigation={navigation} isBackArrow={true} title={`Send $${sendamount}`} />
                
                 <View style={styles.depositeone_wrapper}>
                 <View style={(isActiveTwo)?style.form_input_focus_2_wrap2:style.form_input_type_2_wrap2}>
                      <View style={styles.form_input_type_2_icon}>
                            {/* <Icon
                              name='at-sign'
                              type='feather'
                              color='#111827'
                              size={20}
                              onPress={() => handlePasswordToggle()} /> */}
                        
                          <Image source={require('../../../assets/images/search.png')} style={styles.icon_andat} resizeMode='contain'/>
                      </View>
                          <TextInput 
                              style={style.form_input_type_44}
                              placeholder='Enter @brace tag or phone number'
                              placeholderTextColor={'#6B7280'}
                              caretHidden={false}
                              value={tagvalue}
                              onChangeText={(value)=>handleChangedInput(value)}
                              onFocus={() => setActiveTwo(true)}
                              onBlur={() => setActiveTwo(false)}
                          />
                            
                  </View>


                  
                        {
                            (filteredContact.length > 0)?
                            <View style={style.search_results}>
                            { 
                            filteredContact.map((contact)=>{
                                return(
                                    <Pressable style={style.transaction_box_box_border} onPress={()=> navigation.navigate('SendBraceTwo',{contact, flag:Flags[userData.country]})}>
                                        <View style={styles.transaction_box_left_wrap}>
                                            <Image source={require('../../../assets/images/user2.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                            <View style={styles.transaction_box_left}>
                                                <Text style={style.transaction_box_left_a}>{contact.name}</Text>
                                                <Text style={style.transaction_box_left_b}>{contact.username}</Text>
                                            </View>
                                        </View>
                                        <View style={style.transaction_box_right}>
                                        <Image source={{uri: Flags[userData.country]}} style={style.transaction_box_flag} resizeMode='contain'/>
                                        </View>
                                    </Pressable>
                                )
                            })
                         }</View> 
                         :null
                        }
                                
                        
                        {
                            (filteredContact.length < 1)?
                            <View style={styles.depositeone_wrapper}>

                                <Pressable style={style.depositeone_box} onPress={() => navigation.navigate('SendBankOne')}>
                                    <View style={style.depositeone_box_left}>
                                    <Image source={require('../../../assets/images/bank2.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={styles.depositeone_box_right}>
                                        <Text style={style.depositeone_box_right_a}>Send to bank account</Text>
                                    </View>
                                </Pressable>

                                <Pressable style={style.depositeone_box} onPress={() => navigation.navigate('SendWalletOne')}>
                                    <View style={style.depositeone_box_left}>
                                    <Image source={require('../../../assets/images/pay1.png')} style={styles.depositeone_box_left_img} resizeMode='contain'/>
                                    </View>
                                    <View style={styles.depositeone_box_right}>
                                        <Text style={style.depositeone_box_right_a}>Send to crypto wallet</Text>
                                    </View>
                                </Pressable> 
                            </View>: null
                        }
                      
                 </View>

                </View>
                
                {
                    (filteredContact.length < 1)?
                <ScrollView 
                   style={{width: '100%', height: height}}
                   showsVerticalScrollIndicator ={false}
                   showsHorizontalScrollIndicator={false}
                >
                <View style={style.trans_wrapper}>
                        <Text style={style.trans_header_text}>Recent</Text>

                        {
                            recentBraceAcc.map((recent)=> {
                                return(
                                    <Pressable style={style.transaction_box_box_border} onPress={() => navigation.navigate('SendBraceTwo', {contact:recent, flag:Flags[userData.country]})}>
                                        <View style={style.transaction_box_left_wrap}>
                                            <Image source={require('../../../assets/images/user2.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                            <View style={style.transaction_box_left}>
                                                <Text style={style.transaction_box_left_a}>{recent.name}</Text>
                                                <Text style={style.transaction_box_left_b}>{recent.username}</Text>
                                            </View>
                                        </View>
                                        <View style={style.transaction_box_right}>
                                        <Image source={require('../../../assets/images/flag.png')} style={style.transaction_box_flag} resizeMode='contain'/>
                                        </View>
                                    </Pressable>
                                )
                            })
                        }


                       {
                            recentBankAcc.map((recent)=> {
                                return(
                                    <Pressable style={style.transaction_box_box_border} onPress={() => navigation.navigate('SendBraceTwo', {contact:recent, flag:Flags[userData.country]})}>
                                        <View style={style.transaction_box_left_wrap}>
                                            <Image source={require('../../../assets/images/user2.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                            <View style={style.transaction_box_left}>
                                                <Text style={style.transaction_box_left_a}>{recent.name}</Text>
                                                <Text style={style.transaction_box_left_b}>{recent.accountNumber}</Text>
                                            </View>
                                        </View>
                                        <View style={style.transaction_box_right}>
                                        <Image source={require('../../../assets/images/flag.png')} style={style.transaction_box_flag} resizeMode='contain'/>
                                        </View>
                                    </Pressable>
                                )
                            })
                        }



                  </View>   


                  <View style={[style.trans_wrapper]}>
                        <Text style={style.trans_header_text}>All Contact</Text>
                                
                        {
                            savedcontact.map((contact)=>{
                                return(
                                    <Pressable style={style.transaction_box_box_border} onPress={()=> navigation.navigate('SendBraceTwo',{contact, flag:Flags[userData.country]})}>
                                        <View style={style.transaction_box_left_wrap}>
                                            <Image source={require('../../../assets/images/user2.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                            <View style={style.transaction_box_left}>
                                                <Text style={style.transaction_box_left_a}>{contact.name}</Text>
                                                <Text style={style.transaction_box_left_b}>{contact.username}</Text>
                                            </View>
                                        </View>
                                        <View style={style.transaction_box_right}>
                                        <Image source={{uri: Flags[userData.country]}} style={style.transaction_box_flag} resizeMode='contain'/>
                                        </View>
                                    </Pressable>
                                )
                            })
                        }


                       

                  </View> 
                  </ScrollView>  : null
                }
            </View>
    );
};



export default SendWalletOne;
