
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView , Dimensions,TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import { Colors } from '../../constants/Colors';
import { Icon } from 'react-native-elements';
import Header from './components/HeaderStats';
import LineChart from './components/LineChart';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../constants/CustomeStatusBar';
import { useSelector, useDispatch } from 'react-redux'
import { BaseUrl } from '../../constants/BaseUrl';
import NumberFormat from 'react-number-format';
import  Modal  from 'react-native-modal';
import LinkScan from './LinkScan';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsOne = ({navigation}) => {

    const {isLoggedIn, isActive, userJwt, userData, withdrawalamount} = useSelector(state => state.userReducer);

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


    const [isLoading, setisLoading] = useState(true);
    const [nosite, setNoSite] = useState(false);
      useEffect(
        () => {
          let timer1 = setTimeout(() => setisLoading(false), 3000);
          return () => {
            clearTimeout(timer1);
          };
        },
        []
      );

      const weeks = ["This week", "Last week", "This month"];
      const [userweek, setWeek] = useState('');

      const [selectype, setSelectType] = useState('This week');


      const [chartDatas, setChartData] = useState([])
      useEffect(() => { 
        const selected =  selectype.replace(/\s+/g, '-').toLowerCase();
          fetch(`${BaseUrl}/chart/${selected}`, {
              method: 'GET', 
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userJwt}`,
              },
        
             })
            .then((response) => response.json())
            .then((responseJSON) => {
              
              //console.log('chart response', responseJSON); 
               if(responseJSON.status == true && responseJSON.statusCode == 200){
                   setChartData(responseJSON.data)
               }
               
            }).catch((error) => {
              
               console.log(error);  
             
            })  
  
      }, [selectype])

      
      const customLabel = val => {
        return (
            <View style={{width: width/7.8, marginLeft: width/22}}>
                <Text style={{color: Colors.neutral, fontWeight: '400', fontFamily: 'Faktum-Medium', fontSize: 14,}}>{val}</Text>
            </View>
        );
    };

      const chartData = chartDatas.map((data)=> (
        {value: (data.value > 600)?800:data.value, 
            hideDataPoint: (data.currentday)?false:true,
            labelComponent: () => customLabel(data.label), 
            showStrip: (data.currentday)?true:false,

            stripHeight:  (data.currentday)?data.value:0,
            stripWidth: (data.currentday)?5:0,
            stripColor: (data.currentday)?'#22C55E':null,

            frontColor: (data.currentday)? Colors.green: "#F9FAFB",
            
            dataPointLabelComponent:(data.currentday)?() => (
            <View style={styles.figure_wrapper}>
                <View style={styles.figure_wrapper_top}>
                   <Text style={styles.figure_wrapper_top_text}>{NairaDeco(data.value)}</Text>
                </View>
                <View style={styles.figure_wrapper_middle}>
  
                </View>
                <Icon
                    name='circle'
                    type='font-awesome'
                    color={Colors.button}
                    size={12}
                    style={styles.site_header_icon}
                    />
            </View>
          ):null, 
            dataPointLabelShiftY: (data.currentday)?-40:0,
            dataPointLabelShiftX: (data.currentday)?-0:0,}
    ));



    const [transactions, setTransactions] = useState([]);


    function handleTransactions(){
       fetch(`${BaseUrl}/transactions`, {
           method: 'GET', 
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${userJwt}`,
           },
          })
         .then((response) => response.json())
         .then((responseJSON) => {
            //console.log('transactions now', responseJSON.data);
            if(responseJSON.status == true && responseJSON.statusCode == 200){
               setTransactions(responseJSON.data);
            }else{
               
            }
            
         }).catch((error) => {
            console.log(error);  
         }) 
     }

     useEffect(() => {
        handleTransactions()
     }, [])


     const NairaDeco = (amount) =>{
        return <Text> <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} 
         renderText={(value) => <Text>{value}</Text>} /></Text>
     }

 
    return (
           
            <View style={{backgroundColor: Colors.background, }}>          
                <CustomeStatusBar 
                   backgroundColor={'#f2f2f2'}
                   barStyle={'dark-content'}
                   
                 />
                    <View style={[styles.dashboard_wrapper]}>

                    <Header goback={()=>navigation.goBack()} setFirstlscan={() => setFirstLscan()}/>
                   <ScrollView style={[styles.dashboard_main_wrapper]}>
                   <View style={[styles.dashboard_wrapper_top, ,{backgroundColor: '#f2f2f2', paddingBottom: 20}]}>
                       <View style={styles.balance_wrapper_stats}>
                            <View style={styles.balance_middle_stats}>
                                <View style={styles.balance_middle_balance}>
                                   <Text style={styles.balance_middle_b}>{NairaDeco(userData.wallets.currentBalance)}</Text>
                                   {/* <Text style={styles.balance_middle_c}>.48</Text> */}
                                </View>
                            </View>
                            <View style={styles.balance_bottom_stats}>
                            < NumberFormat value={parseFloat(userData.earnedToday).toFixed(1)} displayType={'text'} thousandSeparator={true} prefix={'$'}
                                     renderText={(value, props) => <Text style={styles.balance_bottom_a} {...props}>{value}</Text>} />
                                <Text style={styles.balance_bottom_b}>earned today</Text>
                            </View>
                        </View>

                        <View style={[styles.stats_container, {marginBottom: 20, paddingBottom: 50,}]}>
                              <View style={styles.barchart_header}>
                                  <Pressable style={styles.barchart_header_icon} onPress={()=> navigation.navigate('StatsOne')}> 
                                        <Icon
                                            name='bar-graph'
                                            type='entypo'
                                            color={Colors.green}
                                            size={16}
                                            style={styles.site_bottom_box_icon}
                                            />
                                    </Pressable>
                                 <View style={styles.stats_week_wrap}>
                                    <SelectDropdown
                                        data={weeks}
                                        onSelect={(selectedItem, index) => {
                                            setSelectType(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                        renderDropdownIcon={isOpened => {
                                          return  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} type='font-awesome' color={Colors.black} size={14} style={styles.stats_week_icon}/>;
                                        }}
                                        dropdownStyle={styles.dropdown4DropdownStyle}
                                        rowStyle={styles.dropdown4RowStyle}
                                        rowTextStyle={styles.dropdown4RowTxtStyle}
                                        buttonStyle={styles.stats_week}
                                        buttonTextStyle ={styles.stats_week_text}
                                        dropdownIconPosition='right'
                                        defaultButtonText="This Week"
                                    />
                                 </View>
                              </View>
                              <LineChart chartData={chartData}/>
                          </View>
                        </View>


                        <View style={styles.trans_wrapper_stats2}>
                            <TouchableOpacity style={styles.trans_header} onPress={()=> handleStats()}>
                                <Text style={styles.trans_header_text}>Transactions</Text>
                                {/* <Icon
                                    name='angle-right'
                                    type='font-awesome'
                                    color={Colors.neutral}
                                    size={22}
                                    style={styles.trans_header_icon}
                                    /> */}
                            </TouchableOpacity>

                            {
                             (transactions.length > 0)?
                            
                            <View style={[styles.trans_bottom, {paddingBottom: 100}]}>
                                
                               <View style={styles.transaction_box_wrap}>
                                    {/* <Text style={styles.transaction_box_header}>Today</Text> */}
                                    {
                                        transactions.map((transaction, id)=>{
                                            return(
                                                <View style={styles.transaction_box_box} key={id}>
                                                    <View style={styles.transaction_box_left_wrap}>
                                                        <Image source={require('../../assets/images/user2.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                                        <View style={styles.transaction_box_left}>
                                                            <Text style={styles.transaction_box_left_a}>Tunji Adeyanju</Text>
                                                            <Text style={styles.transaction_box_left_b}>{transaction.action}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.transaction_box_right}>
                                                        {
                                                            (transaction.action == 'CREDIT')?
                                                            <Text style={styles.transaction_box_right_a}>+{NairaDeco(parseFloat(transaction.amount).toFixed(1))}</Text>
                                                            :
                                                            <Text style={styles.transaction_box_right_a}>-{NairaDeco(parseFloat(transaction.amount).toFixed(1))}</Text>
                                                        }
                                                        
                                                        <Text style={styles.transaction_box_right_b}>10:53 AM</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                    

                                    {/* <View style={styles.transaction_box_box}>
                                        <View style={styles.transaction_box_left_wrap}>
                                            <Image source={require('../../assets/images/user.png')} style={styles.transaction_box_box_img} resizeMode='contain'/>
                                            <View style={styles.transaction_box_left}>
                                                <Text style={styles.transaction_box_left_a}>Betdemand</Text>
                                                <Text style={styles.transaction_box_left_b}>Withdrawal</Text>
                                            </View>
                                        </View>
                                        <View style={styles.transaction_box_right}>
                                            <Text style={styles.transaction_box_right_a}>-$1,257</Text>
                                            <Text style={styles.transaction_box_right_b}>08:27 AM</Text>
                                        </View>
                                    </View> */}
                               </View>


                              
                            </View>
                            :
                            <View style={styles.trans_bottom_no}>
                                <Image source={require('../../assets/images/notrans.png')} style={styles.trans_bottom_no_image} resizeMode='contain'/>
                                <Text style={styles.trans_bottom_no_text}>No transaction at the moment</Text>
                            </View>
                            }
                        </View>


                    </ScrollView>

                    </View>



        {/* <CustomAlert 
            show={showAlert} 
            message={alertMessage} 
            buttonTitle='Close'
            onConfirmPressed={() => {
                setShowAlert(false)
            }} 
            type='error'
            
        />  */}

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


export default StatsOne;
