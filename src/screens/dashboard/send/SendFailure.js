
import React, { Component, useState } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerB';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { useSelector, useDispatch } from 'react-redux'
import NumberFormat from 'react-number-format';

const SendFailure = ({route,navigation}) => {
    const {content} = route.params

    const {isLoggedIn, isActive, userJwt, sendamount} = useSelector(state => state.userReducer);
    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={false} title="" />
                <View style={{width: '100%'}}>
                <View style={styles.deposittwo_main_top2}>
                    <View style={[styles.deposittwo_main_top_c2, {backgroundColor: 'red'}]}>
                    <Image source={require('../../../assets/images/closewhite.png')} style={styles.deposittwo_main_top_c_img} resizeMode='contain'/>
                    </View>
                    
                    
                    {/* <NumberFormat value={sendamount} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={content}
                                         renderText={(value, props) => <Text style={styles.deposittwo_main_top_b3} {...props}>{value}</Text>} /> */}
                    <Text style={styles.deposittwo_main_top_b3}>{content}</Text>
                </View>

                </View>
              </View>
                <View style={[styles.deposittwo_bottom_main]}>
                <View style={styles.btn_container}>
                    <TouchableOpacity style={styles.btn_wrapper_small_white} onPress={() => navigation.navigate('SendBraceOne')}>
                        <Text style={styles.btn_text_white}>Return </Text>
                    </TouchableOpacity>
                </View>
            
               </View>
                              
     </View>
    );
};



export default SendFailure;
