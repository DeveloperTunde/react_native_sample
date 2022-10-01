import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import { Colors } from '../../constants/Colors';
import { Icon } from 'react-native-elements';
import Header from './components/Header';
import LineChart from './components/LineChart';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import  Modal  from 'react-native-modal';
import LinkScan from './LinkScan';

const StatsTwo = ({navigation}) => {
    const {width, height} = Dimensions.get('window');

      const [lscanVisible, setLscanVisible] = useState(false);
      const [lscanview, setLscanView] = useState(1);
       
       function setFirstLscan(){
         setLscanView(1);
         setLscanVisible(true);
       }
       function handleLscanController(a){
          if(a == 1){
             setLscanVisible(false);
          }else{
              const prev = a -1;
              setLscanView(prev)
          }
 
       }
    return (
            <View style={{backgroundColor: Colors.background, }}>
                    
                    <CustomeStatusBar 
                   backgroundColor={lscanVisible ? Colors.black:Colors.background}
                   barStyle={lscanVisible ? 'light-content': 'dark-content'}
                 />   
                    
                    <View style={[styles.dashboard_wrapper2]}>
                    <Header gotoProfile={()=> navigation.navigate('Profile')} goback={()=>navigation.goBack()} title="More"  setFirstlscan={() => setFirstLscan()}/>
                     
                    <ScrollView style={styles.dashboard_main_wrapper}>
                    <View style={styles.dashboard_more}>
                        <View style={styles.dashboard_more_box}>
                            <View style={styles.dashboard_more_box_top} >
                               <Image source={require('../../assets/images/users.png')} style={styles.dashboard_more_box_top_img} resizeMode='contain'/>
                               <Text style={styles.dashboard_more_box_top_text}>Account</Text>
                            </View>
                            <Pressable style={styles.dashboard_more_box_bottom} onPress={() => navigation.navigate('EditProfile')}>
                                <Text style={styles.dashboard_more_box_bottom_text}>Edit Profile</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </Pressable>
                            <Pressable style={styles.dashboard_more_box_bottom} onPress={()=> navigation.navigate('KycIndex')}>
                                <Text style={styles.dashboard_more_box_bottom_text}>Identity Verification</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </Pressable>
                            <Pressable style={styles.dashboard_more_box_bottom} onPress={() => navigation.navigate('BankSelect')}>
                                <Text style={styles.dashboard_more_box_bottom_text}>Banks & Wallets</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </Pressable>
                        </View>
                    </View>


                    <View style={styles.dashboard_more}>
                        <View style={styles.dashboard_more_box}>
                            <View style={styles.dashboard_more_box_top} >
                               <Image source={require('../../assets/images/security.png')} style={styles.dashboard_more_box_top_img} resizeMode='contain'/>
                               <Text style={styles.dashboard_more_box_top_text}>Security</Text>
                            </View>
                            <Pressable style={styles.dashboard_more_box_bottom} onPress={()=> navigation.navigate('PassResetOne')}>
                                <Text style={styles.dashboard_more_box_bottom_text}>Password Reset</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </Pressable>
                            <Pressable style={styles.dashboard_more_box_bottom} onPress={() => navigation.navigate('SetPinOne')}>
                                <Text style={styles.dashboard_more_box_bottom_text}>Setup PIN & Face ID</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </Pressable>
                           
                        </View>
                    </View>


                    <View style={[styles.dashboard_more,{marginBottom:100}]}>
                        <View style={styles.dashboard_more_box}>
                            <View style={styles.dashboard_more_box_top} >
                               <Image source={require('../../assets/images/about.png')} style={styles.dashboard_more_box_top_img} resizeMode='contain'/>
                               <Text style={styles.dashboard_more_box_top_text}>About</Text>
                            </View>
                            <View style={styles.dashboard_more_box_bottom}>
                                <Text style={styles.dashboard_more_box_bottom_text}>FAQs</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </View>
                            <View style={[styles.dashboard_more_box_bottom, {marginBottom:100}]}>
                                <Text style={styles.dashboard_more_box_bottom_text}>Contact us</Text>
                                <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.lightgray}
                                    size={22}
                                    style={styles.dashboard_more_box_bottom_icon}
                                    />
                            </View>
                           
                        </View>
                    </View>

                    
                        </ScrollView>

                        
                    </View>
                    <View style={styles.modal_container}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            isVisible={lscanVisible}
                            deviceWidth={width}
                            style={styles.modal}
                            onSwipeComplete={() => setLscanVisible(false)}
                            swipeDirection="down"
                            hasBackdrop={true}
                            backdropOpacity={0.4}
                            backdropTransitionInTiming={1000}
                            backdropTransitionOutTiming={1000}
                            animationInTiming={1000}
                            animationOutTiming={1000}
                            backdropColor={Colors.lightgray}
                        >
                            <View style={styles.modalView}>
                                {
                                    lscanview == 1? <LinkScan setController={(x)=> handleLscanController(x)} setCloseModal={() => setLscanVisible(false)}/> 
                                    :null
                                }
                                
                            </View>
                        </Modal>
                        </View>
            </View>
    );
};


export default StatsTwo;
