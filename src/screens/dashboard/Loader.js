import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import { Colors } from '../../constants/Colors';
import { Icon } from 'react-native-elements';
import Header from './components/HeaderGen';
import LineChart from './components/LineChart';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrl } from '../../constants/BaseUrl';

const Loader = ({navigation}) => {


//   useEffect(() => {
//     const checkJwt = async () => {
//       const value = await AsyncStorage.getItem('UserJWTAysnc')
//       if (value !== undefined && value !== null && value != ''){
//             handleCheckJwt(JSON.parse(value));
//          //alert(value)  
//       } else {
          
//       }
//     }
//      checkJwt()
//  },[]);

 
//  const [fetchedJwt, setFetchedJwt] = useState('');
//  function handleCheckJwt(a){
//     fetch(`${BaseUrl}/auth/me`, {
//       method: 'GET', 
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${a}`,
//       },
//      })
//     .then((response) => response.json())
//     .then((responseJSON) => {
//        //console.log('User Data 2', a);
//        if(responseJSON.status == true && responseJSON.statusCode == 200){
//           if(responseJSON.data.emailVerified == false){
//               navigation.navigate('KycEmail', {forced: true })
           
//           }else{
//             setTimeout(() => {
//               navigation.navigate('DashboardIndex');
//             }, 1500);
//           }

//        }else{
          
//        }
       
//     }).catch((error) => {
//        console.log(error);  
//     })  
//   }

useEffect(() => {
  setTimeout(() => {
    navigation.navigate('DashboardIndex');
  }, 1500);

}, [])






    return (
        
            <ScrollView>
               <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                 />         
                   <View style={styles.loader_wrapper}>
                        <Image source={require('../../assets/images/braceloader.gif')} style={styles.loader_wrapper_logo} resizeMode='contain'/>
                    </View>
            </ScrollView>
       
    );
};


export default Loader;
