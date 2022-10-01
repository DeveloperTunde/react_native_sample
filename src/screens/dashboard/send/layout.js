
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import styles from '../styles';
import style from '../style';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerB';
import { Icon } from 'react-native-elements';
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt, setNetworkType, setAssetType, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction} from '../../redux/actions';

const SendWalletTwo = ({navigation}) => {
    
    const {isLoggedIn, isActive, userJwt, sendamount, assettype, networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const [isRequesting, setisRequesting] = useState(true);
    const [addedaccounts, setAddedAccounts] = useState([]);

    const {width, height} = Dimensions.get('window');

  

    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={Colors.background}
                   barStyle={'dark-content'}
                   
                 />
                 <View style={styles.deposittwo_top_main}>
                     <Header  navigation={navigation} isBackArrow={true} title={`Send $${sendamount}`} />
                 </View>

                 <View style={[styles.deposittwo_bottom_main]}>
                    <View style={styles.btn_container}>
                      
                            <TouchableOpacity style={styles.btn_wrapper} onPress={() => setModalVisible(true)}>
                                <Text style={styles.btn_text}>Proceed </Text>
                            </TouchableOpacity>
                    </View>
            
                  </View>
        
             
            </View>
    );
};



export default SendWalletTwo;
