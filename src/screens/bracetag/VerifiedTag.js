import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet,  SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import Clipboard from '@react-native-community/clipboard';
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomAlert from '../components/CustomAlert';
import QRCode from 'react-native-qrcode-svg';

const VerifiedTag = ({navigation, route}) => {
    const { bracetagid } = route.params;

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitleColor, setAlertTitleColor] = useState(Colors.green);
    const [isCopied, setCopied] = useState(false)
    function handleCopy(a){
        Clipboard.setString(a);
        setCopied(true)
    }
  

    useEffect(() => {
        if(!showAlert){
            return
        }
        setTimeout(() => {
            setShowAlert(false)
        }, 5000);
      }, [showAlert])

      const logo = require('../../assets/images/loader.png');
      
    return (
        <View style={styles.page_container}>
               
        <CustomeStatusBar 
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />
         <View style={styles.page_wrapper}>
                <View style={styles.page_wrapper_top}>
                    <Text style={styles.v_tag_title}>Congratulations!</Text>
                    <Text style={styles.v_tag_title2}>You are now a proud owner of a brace account.</Text>

                    {/* <View style={styles.v_tag_wrapper}>
                        <View style={styles.v_tag_under}>
                        
                        </View>
                        <View style={styles.v_tag_tag}>
                            <Text style={styles.v_tag_id2}>@</Text>
                            <Text style={styles.v_tag_id}>{bracetagid}</Text>
                        </View>
                    </View> */}

                  <View style={styles.crypto_qrcode_wrap}>
                    <View style={styles.crypto_qrcode_qrcode}>
                        <QRCode
                            size={160}
                            logoSize={40}
                            value={bracetagid}
                            logo={logo}
                            logoBackgroundColor={'#ffffff'}
                        />
                        <Text style={[styles.crypto_qrcode_text, {color: Colors.green}]}>brace.fi/@{bracetagid}</Text>
                    </View>
                 </View>

                    <Text style={styles.v_tag_subtitle}>Share your brace account payment link
                       with family and friends</Text>

                    <View style={styles.v_tag_link_container}>
                        <View style={styles.v_tag_link_wrap}>
                           <View style={styles.v_tag_link_l_wrap}>
                                <Image source={require('../../assets/images/link.png')} style={styles.v_tag_link_l} resizeMode='contain'/>
                                {/* Change to qrcode */}
                                <View style={styles.v_tag_link_middle}>
                                    <Text style={styles.v_tag_link_middle_text}>https://brace.fi/@{bracetagid}</Text>
                                </View>
                           </View>
                           {
                            (isCopied)?
                            <Text style={styles.copied}>Copied</Text>
                            :
                            <Pressable onPress={() => handleCopy(`https://brace.fi/@`+bracetagid)}>
                                <Image source={require('../../assets/images/copy.png')} style={styles.v_tag_link_r} resizeMode='contain'/>
                            </Pressable>

                           }
                        </View>
                    </View>
                </View>
                <View style={styles.page_wrapper_bottom}>
                    {/* <Text style={styles.v_tag_subtitle}>What to do next?</Text> */}
                    <View style={[styles.page_wrapper_bottom], {marginTop: 20}}>
                        <View style={styles.btn_container}>
                            <TouchableOpacity style={styles.btn_wrapper} onPress={() => navigation.navigate('SecureAccount')}>
                                 <Text style={styles.btn_text}>Continue</Text>
                             </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
                </View>

                <CustomAlert 
                      show={showAlert} 
                      message={alertMessage} 
                      buttonTitle='Close'
                      onConfirmPressed={() => {
                         setShowAlert(false)
                        }} 
                      type='error'
                      
                    /> 
            </View>
    );
};


export default VerifiedTag;
