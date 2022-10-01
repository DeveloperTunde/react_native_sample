import React,{useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { CustomeStatusBar } from '../../constants/CustomeStatusBarB';
import { useSelector, useDispatch } from 'react-redux'
import { setIsBoarded, setIsBoardedView } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');


const slides = [
  {
    id: '1',
    image: require('../../assets/images/paybg.png'),
    title: 'Pay',
    subtitle: 'DeFi powered payment on for everyone',
  },
  {
    id: '2',
    image: require('../../assets/images/savebg.png'),
    title: 'Save',
    subtitle: 'Save for the rainy days and earn upto 20% APY',
  },
  {
    id: '3',
    image: require('../../assets/images/spendbg.png'),
    title: 'Spend',
    subtitle: 'Fast way to send and withdraw funds',
  },
  {
    id: '4',
    //image: require('../../assets/images/earn.svg'),
    image: require('../../assets/images/earnbg.png'),
    title: 'Earn',
    subtitle: 'Earn interest and cashbacks on account balance',
  },
  {
    id: '5',
    //image: require('../../assets/images/invest.svg'),
    image: require('../../assets/images/investbg.png'),
    title: 'Invest',
    subtitle: 'Grow your funds by creating investment plans',
  },
];

const Slide = ({item}) => {
  return (
    <View style={styles.slider_wrapper}>
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
     
      <View style={styles.slider_image_wrap}>
        <Image
          source={item?.image}
          style={styles.slider_image}
          resizeMode='cover'
        />
      </View>
     
      
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {

  const {isLoggedIn, isActive, userJwt, isBoarded} = useSelector(state => state.userReducer);
  const dispatch     = useDispatch();

  // useEffect( async() => {
  //   try {
  //       await AsyncStorage.setItem('Onboarded', 'isBoarded');
        
  //     } catch (error) {
  //         //console.log(error);
  //     }
  // }, [])
  

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

 async function handleDirRoute(route){
       dispatch(setIsBoardedView(route)) 
      try {
          await AsyncStorage.setItem('Onboarded', 'isBoarded');
          dispatch(setIsBoarded(true)) 
        } catch (error) {
            //console.log(error);
        }
    
   }


  const Footer = ( ) => {
    return (
      <View
        style={styles.footer_wrapper}>
        {/* Indicator container */}
        <View
          style={styles.indicator_container}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && styles.indicator_active,
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={styles.btn_container}>
          
            <View style={styles.btn_wrapper}>
              <TouchableOpacity style={styles.btn} onPress={() => handleDirRoute('RegisterPhoneOne')}>
                <Text style={styles.btn_text}> Create account</Text>
              </TouchableOpacity>
            
            </View>
              <View style={styles.link_wrapper}>
                  <Text style={styles.link_wrapper_text1}>Already joined? </Text>
                  <TouchableOpacity onPress={() => handleDirRoute('SignInPhone')}>
                    <Text style={styles.link_wrapper_text2}>Sign in</Text>
                  </TouchableOpacity>
              </View>
            
         
           
        </View>
      </View>
    );
  };



 

  return (
    <SafeAreaView style={styles.onboarding_container}>
      <CustomeStatusBar 
            backgroundColor={Colors.background}
            barStyle={'dark-content'}
          />
        
      <View style={styles.logo_wrapper}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode='contain'/>
      </View>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  onboarding_container:{
    backgroundColor: Colors.background,
    flex: 1,
    
  },
  logo_wrapper:{
      width: '100%',
      alignItems:'center',
      marginTop: Platform.OS == 'ios'? 10: height/10
  },
  logo:{
      width: 140,
      height: 60,
      
  },
  slider_wrapper:{
      alignItems: 'center',
      marginTop: height < 700? 0: 20,
      width,
  },
  subtitle: {
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    color: Colors.black,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: 'Faktum-Regular',
  },
  title: {
    color: Colors.black,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Faktum-Bold',
  },
  slider_image_wrap:{
    height: height/2.25,
    width: '96%',
    marginTop: height < 700? 30: 10,
  },
  slider_image: {
    height: '100%',
    width: '100%',
  },
  footer_wrapper:{
    width,
    paddingBottom: 40,
  
  },
  indicator_container:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
    
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#c6c6c6',
    marginHorizontal: 3,
    
  },
  indicator_active:{
    backgroundColor: Colors.green,
  },
  btn_container:{
      width: '100%',
     marginTop: 25
      
  },
  btn_wrapper:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  btn: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: Colors.neutral,
    color: Colors.white,    
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  btn_text:{
      color: Colors.white,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
      fontFamily: 'Faktum-Bold',
  },
  link_wrapper:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  link_wrapper_text1:{
    color: Colors.gray,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily:'Faktum-Regular',
  },
  link_wrapper_text2:{
    color: Colors.black,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Faktum-Bold',
  },
});
export default OnboardingScreen;