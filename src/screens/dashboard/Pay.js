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
        
            <View style={{ flexGrow: 1,}}>
               <CustomeStatusBar 
                   backgroundColor={lscanVisible ? Colors.black:Colors.background}
                   barStyle={lscanVisible ? 'light-content': 'dark-content'}
                 />        
                  
                   
                   
                     <View style={[styles.dashboard_wrapper2, {height}]}>
                     <Header gotoProfile={()=> navigation.navigate('Profile')} goback={()=>navigation.goBack()} title="Pay" setFirstlscan={() => setFirstLscan()} />
                    <View style={styles.dashboard_pay_middle}>
                        <Image source={require('../../assets/images/payimg.png')} style={styles.dashboard_pay_middle_img} resizeMode='contain'/>
                        <Text style={styles.dashboard_pay_middle_txt}>DeFi powered payment for everyone</Text>
                        <Pressable style={styles.dashboard_pay_btn}>
                            <Text style={styles.dashboard_pay_btn_text}>Notify me</Text>
                            <Icon
                                    name='arrowright'
                                    type='antdesign'
                                    color={Colors.green}
                                    size={22}
                                    style={styles.dashboard_pay_btn_icon}
                                    />
                        </Pressable>
                    </View>

                    <View style={styles.modal_container}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            isVisible={lscanVisible}
                            deviceWidth={width}
                            style={styles.modal}
                            onSwipeComplete={() => setSendVisible(false)}
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
            </View>
       
    );
};


export default StatsTwo;
