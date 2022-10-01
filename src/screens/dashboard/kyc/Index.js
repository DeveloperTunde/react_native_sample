
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable,  NativeModules, NativeEventEmitter, TouchableOpacity, TextInput} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInner';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
//import Timeline from 'react-native-timeline-flatlist'
import MyTimeline from './components/Timeline';
import style from '../style';
import { useSelector, useDispatch } from 'react-redux'
import {
    MetaMapRNSdk,
  } from 'react-native-metamap-sdk';
  import { BaseUrl } from '../../../constants/BaseUrl';

const Index = ({navigation}) => {

    const { fallbackRoute, fallbackRouteParam, isLoggedIn, isActive, userJwt, userData, withdrawalamount} = useSelector(state => state.userReducer);


    const [isActiveOne, setActiveOne] = useState(false);
    const [isActiveTwo, setActiveTwo] = useState(false);
 
    const [email, setEmail] = useState('');
    const [accountnumber, setAccountNumber] = useState('');
 
     const onChangeHandler = (name, value) => {
       if(name=="accountnumber"){
         setAccountNumber(value)
       }else if (name=="email") {
         setEmail(value);
       }else if (name=="phonenumber") {
         setPhone(value)
       }
      }


      const [idPercentage, setidPercentage] = useState(20);
      useEffect(() => {
        if(userData.emailVerified){
            setidPercentage(idPercentage + 20)
        }
        if(userData.kycVerified){
            setidPercentage(idPercentage + 60)
        }

      
      }, [])
      
    


      function handleGetKycResponse(response){
     
        const data = {
            "status": response,
            "provider": "MetaMap"
          }
    
      fetch(`${BaseUrl}/user-kycs`, {
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJwt}`,
          },
          body: JSON.stringify(data),
         })
        .then((response) => response.json())
        .then((responseJSON) => {
     
          console.log(responseJSON); 
           if(responseJSON.status == true && responseJSON.statusCode == 200){
            if(response != 'CANCELLED'){
                handleRedirectRoute()
            }
           }
           
        }).catch((error) => {
         
           console.log(error);  
         
        })  
        
      }


      useEffect(() => {
        const MetaMapVerifyResult = new NativeEventEmitter(NativeModules.MetaMapRNSdk)
        MetaMapVerifyResult.addListener('verificationSuccess', (data) => handleGetKycResponse('SUCCESS'))
        MetaMapVerifyResult.addListener('verificationCanceled', (data) => handleGetKycResponse('CANCELLED') )
       // MetaMapVerifyResult.addListener('verificationCanceled', (data) => alert(data))
      })
       const handleMetaMapClickButton = (props) => {

     
           var yourMetadata = { userId: userData.wallets.userId };
            MetaMapRNSdk.showFlow("62aa133ab5a109001c637231", "********", yourMetadata);
       }


       function handleRedirectRoute(){
        if(fallbackRoute != ''){
          navigation.navigate(fallbackRoute);
        }else{
            navigation.navigate('DashboardIndex')
        }
         
     }
      

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="Identity verification" />


                <View style={styles.deposittwo_main_top_main}>    
                    
                    <Text style={[styles.page_subtitle4,{marginTop: 35, marginBottom: 15}]}>You have done {idPercentage}% of the verification process.You are almost there!</Text>
                </View>

                <View style={{width: '100%', }}>

                <View style={styles.form_group}>
                <Text style={styles.form_label}>Verification stage</Text>
                
                {/* <Timeline 
                    style={styles.list}
                    data={data}
                    separator={false}
                    circleSize={20}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'

                    descriptionStyle={{color:'gray'}}
                    options={{
                        style:{paddingTop:0}
                    }}
                    renderDetail={<renderDetail rowData={data}/>}

                    /> */}
                 
                 <View style={style.step_container}>
                     <View style={style.step_wrapper}>
                         <View style={style.step_header}>
                           <View style={style.step_header_image_wrap}>
                              <Image source={require('../../../assets/images/marked.png')} style={style. step_header_image} resizeMode='contain' />
                           </View>
                            <View style={style.step_header_text_wrap}>
                                <Text style={style.step_header_text}>Sign up</Text>
                            </View>
                         </View>
                         <View style={style.step_box}>
                             <View style={style.step_box_row}>
                                 <Text style={style.step_box_text}>Daily withdrawal limit of $100</Text>
                                 <Image source={require('../../../assets/images/marked.png')} resizeMode='contain' style={style.step_box_image} />
                             </View>
                             <View style={style.step_box_row}>
                                 <Text style={style.step_box_text}>Daily withdrawal limit of $100</Text>
                                 <Image source={require('../../../assets/images/marked.png')} resizeMode='contain' style={style.step_box_image} />
                             </View>
                         </View>
                         
                     </View>

                    
                     <View style={style.step_wrapper}>
                         <View style={style.step_header}>
                           <View style={style.step_header_image_wrap}>
                           
                              <Image source={ (userData.emailVerified)?require('../../../assets/images/marked.png'):require('../../../assets/images/unmarkedold.png')} style={style.step_header_image} resizeMode='contain' />
                            </View>
                            <View style={style.step_header_text_wrap}>
                                <Pressable >
                                <Text style={style.step_header_text}>Email</Text>
                                </Pressable>
                               
                                {
                                    (userData.emailVerified)?
                                    null:
                                    <Pressable style={style.step_header_button_wrap} onPress={()=> navigation.navigate('KycEmail', {forced: false})}>
                                        <Text style={style.step_header_button}>Verify</Text>
                                    </Pressable>
                                }
                            </View>
                         </View>
                         <View style={style.step_box}>
                             <View style={style.step_box_row}>
                                 <Text style={style.step_box_text}>Unlimited daily withdrawal</Text>
                                 <Image source={ (userData.emailVerified)?require('../../../assets/images/marked.png'):require('../../../assets/images/markedlight.png')} resizeMode='contain' style={style.step_box_image} />
                             </View>
                             <View style={style.step_box_row}>
                                 <Text style={style.step_box_text}>Unlimited daily deposit</Text>
                                 <Image source={ (userData.emailVerified)?require('../../../assets/images/marked.png'):require('../../../assets/images/markedlight.png')} resizeMode='contain' style={style.step_box_image} />
                             </View>
                         </View>
                         
                     </View>


                     

                     

                     <View style={style.step_wrapper}>
                         <View style={style.step_header}>
                           <View style={style.step_header_image_wrap}>
                              <Image source={ (userData.kycVerified)?require('../../../assets/images/marked.png'):require('../../../assets/images/unmarkedold.png')} style={style.step_header_image} resizeMode='contain' />
                            </View>
                            <View style={style.step_header_text_wrap}>
                                <Text style={style.step_header_text}>Identity</Text>
                                {
                                    (userData.kycVerified)?
                                    null:
                                    <Pressable style={style.step_header_button_wrap} onPress={()=> handleMetaMapClickButton()}>
                                        <Text style={style.step_header_button}>Verify</Text>
                                    </Pressable>
                                }
                            </View>
                         </View>
                         <View style={style.step_box_nil}>
                             <View style={style.step_box_row}>
                                 <Text style={style.step_box_text}>Unlimited daily withdrawal</Text>
                                 <Image source={ (userData.kycVerified)?require('../../../assets/images/marked.png'):require('../../../assets/images/markedlight.png')} resizeMode='contain' style={style.step_box_image} />
                             </View>
                             <View style={style.step_box_row}>
                                 <Text style={style.step_box_text}>Unlimited daily deposit</Text>
                                 <Image source={ (userData.kycVerified)?require('../../../assets/images/marked.png'):require('../../../assets/images/markedlight.png')} resizeMode='contain' style={style.step_box_image} />
                             </View>
                         </View>
                         
                     </View>
                 </View>
                </View>
           

                

                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                    {/* <View style={styles.btn_container}>
                        {
                            ( email != '')?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> navigation.navigate('KycPIN')}>
                                <Text style={styles.btn_text}>Submit </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <Text style={styles.btn_text}>Submit </Text>
                            </TouchableOpacity>
                        }
                        
                    </View> */}
            
               </View>
                              
     </View>
    );
};



export default Index;
