import  React, {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, PanResponder, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from './src/screens/onboarding/Index';
import RegisterPhoneOne from './src/screens/auths/RegisterPhoneOne';
import RegisterPhoneTwo from './src/screens/auths/RegisterPhoneTwo';
import RegisterEmailOne from './src/screens/auths/RegisterEmailOne';
import RegisterEmailTwo from './src/screens/auths/RegisterEmailTwo';
import BraceTagIndex from './src/screens/bracetag/Index';
import SignInPhone from './src/screens/auths/SignInPhone';
import SignInEmail from './src/screens/auths/SignInEmail';
import ForgotPasswordPhone from './src/screens/auths/ForgotPasswordPhone';
import ForgotPasswordPhoneTwo from './src/screens/auths/ForgotPasswordPhoneTwo';
import ForgotPasswordEmail from './src/screens/auths/ForgotPasswordEmail';
import VerifiedTag from './src/screens/bracetag/VerifiedTag';
import SecureTag from './src/screens/bracetag/SecureTag';
import SecureAccount from './src/screens/bracetag/SecureAccount';
import SelectAccount from './src/screens/dashboard/withdraw/SelectAccount';
import AddAccount from './src/screens/dashboard/withdraw/AddAccount';
import ConfirmWithdrawal from './src/screens/dashboard/withdraw/ConfirmWithdrawal';
import WithdrawSuccess from './src/screens/dashboard/withdraw/WithdrawSuccess';
import WithdrawFailure from './src/screens/dashboard/withdraw/WithdrawFailure';
import WithdrawPIN from './src/screens/dashboard/withdraw/WithdrawPIN';
import WithdrawRoute from './src/screens/dashboard/withdraw/WithdrawRoute';
import KycEmail from './src/screens/dashboard/kyc/KycEmail';
import KycPIN from './src/screens/dashboard/kyc/KycPIN';
import KycSuccess from './src/screens/dashboard/kyc/KycSuccess';
import KycCountry from './src/screens/dashboard/kyc/KycCountry';
import KycIndex from './src/screens/dashboard/kyc/Index';
import WithdrawCryptoPIN from './src/screens/dashboard/withdraw/WithdrawCryptoPIN';
import WithdrawCryptoConfirmOne from './src/screens/dashboard/withdraw/WithdrawCryptoConfirmOne';
import SendBraceOne from './src/screens/dashboard/send/SendBraceOne';
import SendBraceTwo from './src/screens/dashboard/send/SendBraceTwo';
import SendBankOne from './src/screens/dashboard/send/SendBankOne';
import SendBankTwo from './src/screens/dashboard/send/SendBankTwo';
import SendWalletOne from './src/screens/dashboard/send/SendWalletOne';
import SendWalletTwo from './src/screens/dashboard/send/SendWalletTwo';
import SendWalletPIN from './src/screens/dashboard/send/SendWalletPIN';
import EditProfile from './src/screens/dashboard/account/EditProfile';
import ProfileSuccess from './src/screens/dashboard/account/ProfileSuccess';
import BankIndex from './src/screens/dashboard/banks/Index';
import BankSelect from './src/screens/dashboard/banks/BankSelect';
import BankAdd from './src/screens/dashboard/banks/BankAdd';
import BankSuccess from './src/screens/dashboard/banks/BankSuccess';
import PassResetOne from './src/screens/dashboard/security/PassResetOne';
import PasswordSuccess from './src/screens/dashboard/security/PasswordSuccess';
import PasswordFailure from './src/screens/dashboard/security/PasswordFailure';
import SetPinOne from './src/screens/dashboard/security/SetPinOne';
import SetPINTwo from './src/screens/dashboard/security/SetPinTwo';
import SendAmount from './src/screens/dashboard/send/SendAmount';
import WithdrawAmount from './src/screens/dashboard/withdraw/WithdrawAmount';
import WithdrawCrypto from './src/screens/dashboard/withdraw/WithdrawCrypto';
import DepositNine from './src/screens/dashboard/deposit/DepositNine';
import DepositWallet from './src/screens/dashboard/deposit/DepositWallet';
import WalletAdd from './src/screens/dashboard/banks/WalletAdd';


import SendBracePIN from './src/screens/dashboard/send/SendBracePIN';
import SendBankPIN from './src/screens/dashboard/send/SendBankPIN';
import SendSuccess from './src/screens/dashboard/send/SendSuccess';
import SendFailure from './src/screens/dashboard/send/SendFailure';

import DepositRoute from './src/screens/dashboard/deposit/DepositRoute';
import DepositCoin from './src/screens/dashboard/deposit/DepositCoin';
import DepositAmount from './src/screens/dashboard/deposit/DepositAmount';
import DepositTwo from './src/screens/dashboard/deposit/DepositTwo';
import DepositFour from './src/screens/dashboard/deposit/DepositFour';
import P2PFulfil from './src/screens/dashboard/deposit/P2PFulfil';
import DepositSuccess from './src/screens/dashboard/deposit/DepositSuccess';

import Loader from './src/screens/dashboard/Loader';
import DashboardIndex from './src/screens/dashboard/Index';
import Save from './src/screens/dashboard/Save';
import Pay from './src/screens/dashboard/Pay';
import Invest from './src/screens/dashboard/Invest';
import More from './src/screens/dashboard/More';
import StatsOne from './src/screens/dashboard/StatsOne';
import StatsTwo from './src/screens/dashboard/StatsTwo';
import Profile from './src/screens/dashboard/Profile';
import Test from './src/screens/dashboard/Test';
import Scan from './src/screens/dashboard/Scan';
import { Provider } from 'react-redux';
import { Store } from './src/screens/redux/store';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt,setIsBoarded, setModalVisibleAction, setWithdrawVisibleAction, setSendVisibleAction, setLscanVisibleAction, setUserData} from './src/screens/redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './src/constants/Colors';
import SplashScreen from 'react-native-splash-screen'
import UnlockScreen from './src/screens/UnlockScreen';
import { BaseUrl } from './src/constants/BaseUrl';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const GeneralStack = () => {
  const { isBoardedView} = useSelector(state => state.userReducer);
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {(isBoardedView == 'RegisterPhoneOne')?
        <>
        <Stack.Screen name="RegisterPhoneOne" component={RegisterPhoneOne} />
        <Stack.Screen name="SignInPhone" component={SignInPhone} />
        <Stack.Screen name="SignInEmail" component={SignInEmail} />
       
        <Stack.Screen name="RegisterPhoneTwo" component={RegisterPhoneTwo} />
        <Stack.Screen name="RegisterEmailOne" component={RegisterEmailOne} />
        <Stack.Screen name="RegisterEmailTwo" component={RegisterEmailTwo} />
        <Stack.Screen name="BraceTagIndex" component={BraceTagIndex} />
        <Stack.Screen name="ForgotPasswordPhone" component={ForgotPasswordPhone} />
        <Stack.Screen name="ForgotPasswordPhoneTwo" component={ForgotPasswordPhoneTwo} />
        <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail} />
        <Stack.Screen name="VerifiedTag" component={VerifiedTag} />
        <Stack.Screen name="SecureTag" component={SecureTag} />
        <Stack.Screen name="SecureAccount" component={SecureAccount} />
        
        <Stack.Screen name="StatsOne" component={StatsOne} />
        <Stack.Screen name="StatsTwo" component={StatsTwo} />
        </>:
        
        <>
        
        <Stack.Screen name="SignInPhone" component={SignInPhone} />
        <Stack.Screen name="SignInEmail" component={SignInEmail} />
        <Stack.Screen name="RegisterPhoneOne" component={RegisterPhoneOne} />
        <Stack.Screen name="RegisterPhoneTwo" component={RegisterPhoneTwo} />
        <Stack.Screen name="RegisterEmailOne" component={RegisterEmailOne} />
        <Stack.Screen name="RegisterEmailTwo" component={RegisterEmailTwo} />
        <Stack.Screen name="BraceTagIndex" component={BraceTagIndex} />
        <Stack.Screen name="ForgotPasswordPhone" component={ForgotPasswordPhone} />
        <Stack.Screen name="ForgotPasswordPhoneTwo" component={ForgotPasswordPhoneTwo} />
        <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail} />
        <Stack.Screen name="VerifiedTag" component={VerifiedTag} />
        <Stack.Screen name="SecureTag" component={SecureTag} />
        <Stack.Screen name="SecureAccount" component={SecureAccount} />
        
        <Stack.Screen name="StatsOne" component={StatsOne} />
        <Stack.Screen name="StatsTwo" component={StatsTwo} />
        </>}
      </Stack.Navigator>
  );
};


const OnboardingStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
  );
};




const DashboardStack = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle : {
        backgroundColor: Colors.background,
        height: Platform.OS == 'android'? 60: 80,
        paddingBottom: Platform.OS == 'android'? 10: 30,
       },
       
    }}

    >
      <Tab.Screen
          name="Loader"
          component={Loader}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: (props) => null, //like this
            tabBarVisible: false, 
         }}/>

        <Tab.Screen
          name="DashboardIndex"
          component={DashboardIndex}
          options={{
            tabBarIcon: ({ focused }) => (
              focused?<Image source={require('./src/assets/images/home1.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
              :<Image source={require('./src/assets/images/home2.png')} style={styles.footer_icon} resizeMode='contain'/>
            ),
            tabBarLabel: ({ focused }) => <Text style={focused?styles.tabBarLabel2: styles.tabBarLabel}>Home</Text>
          }} />

         <Tab.Screen
          name="Pay"
          component={Pay}
          options={{
            tabBarIcon: ({ focused }) => (
              focused? <Image source={require('./src/assets/images/pay2.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
              :<Image source={require('./src/assets/images/pay1.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
            ),
            tabBarLabel: ({ focused }) => <Text style={focused?styles.tabBarLabel2: styles.tabBarLabel}>Pay</Text>
          }} />

        <Tab.Screen
          name="Save"
          component={Save}
          options={{
            tabBarIcon: ({ focused }) => (
              focused? <Image source={require('./src/assets/images/save2.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
              :<Image source={require('./src/assets/images/save1.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
            ),
            tabBarLabel: ({ focused }) => <Text style={focused?styles.tabBarLabel2: styles.tabBarLabel}>Save</Text>
          }} />


        <Tab.Screen
          name="Invest"
          component={Invest}
          options={{
            tabBarIcon: ({ focused }) => (
              focused?<Image source={require('./src/assets/images/invest2.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
              :<Image source={require('./src/assets/images/invest1.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
            ),
            tabBarLabel: ({ focused }) => <Text style={focused?styles.tabBarLabel2: styles.tabBarLabel}>Invest</Text>
            
          }} 
          />


         <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({ focused }) => (
              focused?<Image source={require('./src/assets/images/more2.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
              :<Image source={require('./src/assets/images/more1.png')} style={styles.footer_icon_sm} resizeMode='contain'/>
            ),
            tabBarLabel: ({ focused }) => <Text style={focused?styles.tabBarLabel2: styles.tabBarLabel}>More</Text>
          }} />

    </Tab.Navigator>
  );
};

const MainDashboardStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Dashboard" component={DashboardStack} />
        <Stack.Screen name="StatsOne" component={StatsOne} />
        <Stack.Screen name="StatsTwo" component={StatsTwo} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="SelectAccount" component={SelectAccount} />
        <Stack.Screen name="AddAccount" component={AddAccount} />
        <Stack.Screen name="ConfirmWithdrawal" component={ConfirmWithdrawal} />
        <Stack.Screen name="WithdrawSuccess" component={WithdrawSuccess} />
        <Stack.Screen name="WithdrawFailure" component={WithdrawFailure} />
        <Stack.Screen name="WithdrawPIN" component={WithdrawPIN} />
        <Stack.Screen name="WithdrawRoute" component={WithdrawRoute} /> 
        <Stack.Screen name="KycEmail" component={KycEmail} />
        <Stack.Screen name="KycPIN" component={KycPIN} />
        <Stack.Screen name="KycSuccess" component={KycSuccess} />
        <Stack.Screen name="KycCountry" component={KycCountry} />
        <Stack.Screen name="KycIndex" component={KycIndex} />
        <Stack.Screen name="WithdrawCryptoConfirmOne" component={WithdrawCryptoConfirmOne} />
        <Stack.Screen name="SendBraceOne" component={SendBraceOne} />   
        <Stack.Screen name="SendBraceTwo" component={SendBraceTwo} />
        <Stack.Screen name="SendBankOne" component={SendBankOne} />
        <Stack.Screen name="SendBankTwo" component={SendBankTwo} />
        <Stack.Screen name="SendWalletOne" component={SendWalletOne} />
        <Stack.Screen name="SendWalletTwo" component={SendWalletTwo} />
        <Stack.Screen name="SendBracePIN" component={SendBracePIN} />
        <Stack.Screen name="SendBankPIN" component={SendBankPIN} />
        <Stack.Screen name="SendFailure" component={SendFailure} />
        <Stack.Screen name="SendSuccess" component={SendSuccess} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ProfileSuccess" component={ProfileSuccess} />
        <Stack.Screen name="BankIndex" component={BankIndex} />
        <Stack.Screen name="BankSelect" component={BankSelect} />
        <Stack.Screen name="BankAdd" component={BankAdd} />
        <Stack.Screen name="BankSuccess" component={BankSuccess} />
        <Stack.Screen name="PassResetOne" component={PassResetOne} />
        <Stack.Screen name="PasswordSuccess" component={PasswordSuccess} />
        <Stack.Screen name="PasswordFailure" component={PasswordFailure} />
        <Stack.Screen name="SetPinOne" component={SetPinOne} />
        <Stack.Screen name="SetPINTwo" component={SetPINTwo} />
        <Stack.Screen name="SendWalletPIN" component={SendWalletPIN} />
        <Stack.Screen name="SendAmount" component={SendAmount} />
        <Stack.Screen name="WithdrawAmount" component={WithdrawAmount} />
        <Stack.Screen name="WithdrawCrypto" component={WithdrawCrypto} />
        <Stack.Screen name="DepositNine" component={DepositNine} />
        <Stack.Screen name="DepositWallet" component={DepositWallet} />
        <Stack.Screen name="WalletAdd" component={WalletAdd} />

        <Stack.Screen name="DepositRoute" component={DepositRoute} />
        <Stack.Screen name="DepositCoin" component={DepositCoin} />
        <Stack.Screen name="DepositAmount" component={DepositAmount} />
        <Stack.Screen name="DepositTwo" component={DepositTwo} />
        <Stack.Screen name="DepositFour" component={DepositFour} />
        <Stack.Screen name="P2PFulfil" component={P2PFulfil} />
        <Stack.Screen name="DepositSuccess" component={DepositSuccess} />
        
        
        
        

        <Stack.Screen name="WithdrawCryptoPIN" component={WithdrawCryptoPIN} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
  );
};


const UnlockScreenStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="UnlockScreen" component={UnlockScreen} />
     
      </Stack.Navigator>
  );
};

function MainNavigation(props) {
  const {isLoggedIn, isActive, userJwt, isBoarded} = useSelector(state => state.userReducer);
  const dispatch     = useDispatch();

  
  useEffect(() => {
    const checkJwt = async () => {
      const value = await AsyncStorage.getItem('UserJWTAysnc')
      if (value !== undefined && value !== null && value != ''){
            handleCheckJwt(JSON.parse(value));
            dispatch(setIsLoggedIn(true))
         //alert(value)  
      } else {
          
      }
    }
     checkJwt()
     },[]);

     const [isOnboarded, setOnboarded] = useState(false);
     useEffect(() => {
      const checkOnboard = async () => {
        const value = await AsyncStorage.getItem('Onboarded')
        if (value !== undefined && value !== null && value != ''){
            dispatch(setIsBoarded(true)) 
            //alert(value)
           // setOnboarded(true)
        } else {
            
        }
      }
      checkOnboard()
     },[]);


    function handleCheckJwt(a){
      fetch(`${BaseUrl}/auth/me`, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${a}`,
        },
       })
      .then((response) => response.json())
      .then((responseJSON) => {
         console.log('token', responseJSON);
         if(responseJSON.status == true && responseJSON.statusCode == 200){
          dispatch(setUserJwt(a))
          dispatch(setUserData(responseJSON.data))
         }else{
          dispatch(setIsLoggedIn(false))
         }
         
      }).catch((error) => {
         console.log(error);  
      })  
    }

 const timerId = useRef(false)
  const [timeForInactivityInSecond, setTimeForInactivityInSecond] = useState(
   36000
  )

  useEffect(() => {
    resetInactivityTimeout()
  }, [])

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
         //console.log('user starts touch');
         //dispatch(setIsActive(true));
        resetInactivityTimeout()
      },
    })
  ).current

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current)
    timerId.current = setTimeout(() => {
      // action after user has been detected idle
      dispatch(setModalVisibleAction(false));
      dispatch(setWithdrawVisibleAction(false));
      dispatch(setSendVisibleAction(false));
      dispatch(setLscanVisibleAction(false));
      setTimeout(() => {
        dispatch(setIsActive(false));
      }, 2000);
    }, timeForInactivityInSecond * 1000)
  }

// dispatch(setLogged(true))

  return (
    <View {...panResponder.panHandlers} style={{flex: 1}}>
    <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        {...props}
        >
        {
          (userJwt != '' && userJwt != null && isLoggedIn )?
            (isActive )? 
            <Stack.Screen name="MainDashboard" component={MainDashboardStack} />
            :<Stack.Screen name="LockScreen" component={UnlockScreenStack} />
          :
          (!isBoarded)?
            <Stack.Screen name="Onboard" component={OnboardingStack} />
            :
            <Stack.Screen name="Intro" component={GeneralStack} />
        }
        
        
      </Stack.Navigator>
      </View>
  );
}



export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    },2000);
  });
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <MainNavigation/>
      </NavigationContainer>
    </Provider>
  );
}



const styles = StyleSheet.create({

  footer_icon:{
    width:22,
    height:22,
  },
  footer_icon_sm:{
    width:26,
    height:26,
  },
  tabBarLabel:{
    color: Colors.black,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    fontFamily: 'Faktum-Regular',
    
  },
  tabBarLabel2:{
    color: Colors.green,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '600',
    fontFamily: 'Faktum-Bold'
    
  }
});