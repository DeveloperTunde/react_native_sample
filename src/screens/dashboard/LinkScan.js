
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native';
import styles from './styles';
import style from './style';
import { Colors } from '../../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { useSelector, useDispatch } from 'react-redux'
import Clipboard from '@react-native-community/clipboard';

const LinkScan = (props) => {
    const banks = ["This Week", "Last Week", "Last Month"];
    const [userweek, setBank] = useState('');

    const {isLoggedIn, userData} = useSelector(state => state.userReducer);
    const logo = require('../../assets/images/loader.png');

    const [isCopied, setCopied] = useState(false)

    function handleCopy(a){
        Clipboard.setString(a);
        setCopied(true)
    }
    return (
            <>
                <View style={styles.modal_header}>
                    <Pressable style={styles.modal_header_left}  onPress={() => props.setController(1)}>
                        <Image source={require('../../assets/images/leftarrow.png')} resizeMode='contain' style={styles.modal_header_left_img}/>
                    </Pressable>
                    <Pressable style={styles.modal_header_right} onPress={() => props.setCloseModal()}>
                        <Image source={require('../../assets/images/close.png')} resizeMode='contain' style={styles.modal_header_right_img}/>
                    </Pressable>
                 </View>
                <View style={styles.crypto_wrap22}>
                    <View style={styles.deposit_sharable_wrap22}>
                        <Text style={styles.dashboard_profile_middle_txt_a22}>Payment identity</Text>
                        <View style={{marginTop: 30}}>
                            <QRCode
                                size={170}
                                logoSize={40}
                                value={userData.braceTag}
                                logo={logo}
                                logoBackgroundColor={'#ffffff'}
                            />
                        </View>
                        <Text style={styles.dashboard_profile_middle_txt_b2}>@{userData.braceTag}</Text>
                    </View>
                    
                    <Text style={styles.crypto_share_warning}>Share your brace account payment link with family and friends</Text>
                    
                    
                    {/* <View style={[styles.sharable_link_container]}>
                        <View style={styles.sharable_link_wrap}>
                            <Image source={require('../../assets/images/link2.png')} style={styles.sharable_link_l} resizeMode='contain'/>
                            <View style={styles.sharable_link_middle}>
                                <Text style={styles.sharable_link_middle_text}>https://brace.fi/$falolaseyi</Text>
                            </View>
                            <Pressable onPress={() => handleCopy(`https://brace.fi/$falolaseyi`)}>
                                <Image source={require('../../../assets/images/copy2.png')} style={styles.sharable_link_r} resizeMode='contain'/>
                            </Pressable>
                        
                        </View>
                        
                    </View> */}
                    <LinearGradient
                        colors={['#16BFFD', '#16BFFD', '#16BFFD', '#16BFFD', '#CB3066', '#CB3066']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                    >
                        <TouchableOpacity style={styles.buttonContainer22}>
                            <Image source={require('../../assets/images/link2.png')} style={styles.sharable_link_l} resizeMode='contain'/>
                            <View style={styles.sharable_link_middle}>
                                <Text style={styles.sharable_link_middle_text}>https://brace.fi/@{userData.braceTag}</Text>
                            </View>
                            {
                                (isCopied)?
                                <Text style={style.copied}>Copied</Text>
                                :
                            <Pressable onPress={() => handleCopy(`https://brace.fi/@${userData.braceTag}`)}>
                                <Image source={require('../../assets/images/copy2.png')} style={styles.sharable_link_r} resizeMode='contain'/>
                            </Pressable>
                          }
                        </TouchableOpacity>
                    </LinearGradient>
                    <Text style={styles.crypto_share_warning}>Bank transfer, card and crypto payment supported</Text>
                    <Pressable style={styles.crypto_share_wrap}>
                        <Image source={require('../../assets/images/share.png')} resizeMode='contain' style={styles.crypto_share_wrap_img}/>
                        <Text style={styles.crypto_share_text}>Share</Text>
                    </Pressable>
                </View>
                    
            </>
    );
};



export default LinkScan;
