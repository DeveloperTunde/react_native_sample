import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';
import Header from '../components/Header';
import DepositOne from './DepositOne';
import DepositTwo from './DepositTwo';
import DepositThree from './DepositThree';
import DepositFour from './DepositFour';
import DepositFive from './DepositFive';
import DepositSix from './DepositSix';
import DepositSeven from './DepositSeven';
import DepositEight from './DepositEight';
import DepositNine from './DepositNine';
import  Modal  from 'react-native-modal';


const DepositIndex = ({navigation}) => {
    const {width, height} = Dimensions.get('window');

    const [isLoading, setisLoading] = useState(true);
    const [nosite, setNoSite] = useState(false);
    const [notransaction, setNoTransaction] = useState(false);
      useEffect(
        () => {
          let timer1 = setTimeout(() => setisLoading(false), 3000);
          return () => {
            clearTimeout(timer1);
          };
        },
        []
      );

      function handleStats(){
          navigation.navigate('StatsOne')
      }

      
      const [modalVisible, setModalVisible] = useState(false);
      const [modalview, setModalView] = useState(1);
      
      function setFirstModal(){
        setModalView(1);
        setModalVisible(true);
      }
      function handleController(a){
         if(a == 1){
            setModalVisible(false);
         }else{
             const prev = a -1;
            setModalView(prev)
         }

      }
      
    return (
        <View style={styles.modal_container}>
            <Modal
                animationType="slide"
                transparent={true}
                isVisible={modalVisible}
                deviceWidth={width}
                style={styles.modal}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="down"
                hasBackdrop={false}
                backdropOpacity={0.4}
                
                backdropColor={Colors.lightgray}
            >
                <View style={styles.modalView}>
                    {
                        modalview == 1? <DepositOne setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                        :
                        modalview == 2? <DepositTwo setController={(x,y)=> handleController2(x,y)} setCloseModal={() => setModalVisible(false)}/> 
                        : 
                        modalview == 3? <DepositThree setController={(x,y)=> handleController2(x,y)} setCloseModal={() => setModalVisible(false)}/> 
                        : 
                        modalview == 4? <DepositFour setController={(x,y)=> handleController2(x,y)} setCloseModal={() => setModalVisible(false)}/> 
                        :
                        modalview == 5? <DepositFive setController={(x,y)=> handleController2(x,y)} setCloseModal={() => setModalVisible(false)}/> 
                        :
                        modalview == 6? <DepositSix setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                        :
                        modalview == 7? <DepositSeven setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                        :
                        modalview == 8? <DepositEight setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                        :
                        modalview == 9? <DepositNine setController={(x)=> handleController(x)} setCloseModal={() => setModalVisible(false)}/> 
                        :null
                    }
                    
                </View>
            </Modal>
            </View>
    );

    
};


export default DepositIndex;
