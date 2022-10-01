import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Linking,StatusBar, ScrollView , Dimensions , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import { Colors } from '../../constants/Colors';
import { Icon } from 'react-native-elements';
import Header from './components/HeaderStats';
import BarChart from './components/BarChart';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const StatsOne = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const onSuccess = (e)  =>{
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

  const myCustomMarker = () => {
    return (
        <View style={styles.marker_wrapper}>
            <View style={styles.marker_top}>
               <View style={styles.marker_top1}></View>
               <View style={styles.marker_top2}></View>
            </View>
            <View style={styles.marker_middle} >
               <Text style={styles.marker_middle_text}>Scan Code</Text>
            </View>
            <View style={styles.marker_bottom}>
               <View style={styles.marker_bottom1}></View>
               <View style={styles.marker_bottom2}></View>
            </View>
        </View>
    );
};
    return (
            <ScrollView style={{ flexGrow: 1,}}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                 />         
                    <View style={[styles.dashboard_wrapper, {height}]}>
                     <View style={styles.qr_container}>
                       <View style={styles.qr_wrapper}>
                              <QRCodeScanner
                                onRead={() =>onSuccess()}
                                containerStyle={styles.qr_code_scanner}
                              // flashMode={RNCamera.Constants.FlashMode.torch}
                                showMarker={true}
                                customMarker= {myCustomMarker}
                                
                              />
                        </View>
                        <View style={styles.qr_bottom} >
                        <Pressable style={styles.qr_bottom_box} onPress={() => props.setController(3)}>
                            <View style={[styles.qr_bottom_box_left, {backgroundColor:'#22C55E'}]}>
                               <Image source={require('../../assets/images/sendmoney.png')} style={styles.qr_bottom_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.qr_bottom_box_right}>
                                <Text style={styles.qr_bottom_box_right_a}>Send money</Text>
                                <Text style={styles.qr_bottom_box_right_b}>Recieve funds directly with your brace tag</Text>
                            </View>
                        </Pressable>

                        <Pressable style={styles.qr_bottom_box} onPress={() => props.setController(3)}>
                            <View style={[styles.qr_bottom_box_left, {backgroundColor:'#575FCC'}]}>
                               <Image source={require('../../assets/images/paybiz.png')} style={styles.qr_bottom_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.qr_bottom_box_right}>
                                <Text style={styles.qr_bottom_box_right_a}>Pay a business</Text>
                                <Text style={styles.qr_bottom_box_right_b}>Recieve funds directly with your brace tag</Text>
                            </View>
                        </Pressable>

                        <Pressable style={styles.qr_bottom_box} onPress={() => props.setController(3)}>
                            <View style={[styles.qr_bottom_box_left, {backgroundColor:'#FF6D3B'}]}>
                               <Image source={require('../../assets/images/connectdapp.png')} style={styles.qr_bottom_box_left_img} resizeMode='contain'/>
                            </View>
                            <View style={styles.qr_bottom_box_right}>
                                <Text style={styles.qr_bottom_box_right_a}>Connect Dapp</Text>
                                <Text style={styles.qr_bottom_box_right_b}>Recieve funds directly with your brace tag</Text>
                            </View>
                        </Pressable>
                        </View>
                     </View>
                    </View>
            </ScrollView>
    );
};


export default StatsOne;
