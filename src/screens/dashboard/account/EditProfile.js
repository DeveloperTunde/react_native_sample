
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, Pressable, ScrollView,TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import styles from '../styles';
import { Colors } from '../../../constants/Colors';
import Header from '../components/HeaderInnerC';
import { Icon } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import { CustomeStatusBar } from '../../../constants/CustomeStatusBar';
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsActive, setUserJwt,setUserData} from '../../redux/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import style from '../style';
import CustomAlert from '../../components/CustomAlert';
import DocumentPicker from "react-native-document-picker";


const EditProfile = ({navigation}) => {

    
    const {isLoggedIn, isActive, userJwt, userData, assettype, networktype, modalVisible, withdrawVisible, sendVisible, lscanVisible} = useSelector(state => state.userReducer);
    const dispatch     = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isAdding, setIsAdding] = useState(false);

      const [isActiveOne, setActiveOne] = useState(false);
      const [isActiveTwo, setActiveTwo] = useState(false);
      const [isActiveThree, setActiveThree] = useState(false);
      const [isActiveFour, setActiveFour] = useState(false);
 
    const [email, setEmail] = useState();
    const [braceid, setBraceId] = useState('');
    const [phonenumber, setPhonenumber] = useState(userData.phone);
    const [firstname, setFirstname] = useState(userData.firstname !=''?userData.firstname:'');
    const [lastname, setLastname] = useState(userData.lastname !=''?userData.lastname:'');
 
     const onChangeHandler = (name, value) => {
       if(name=="braceid"){
         setBraceId(value)
       }else if (name=="email") {
         setEmail(value);
       }else if (name=="phonenumber") {
         setPhonenumber(value)
       }else if(name=="firstname"){
        setFirstname(value)
       }else if(name=="lastname"){
        setLastname(value)
       }
      }




    

     const {width, height} = Dimensions.get('window')


     function handleUpdateProfile(){
      setIsAdding(true);
      const data = {
        "firstname": firstname,
        "lastname": lastname
      }

    fetch(`${BaseUrl}/users/me`, {
        method: 'PUT', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userJwt}`,
        },
        body: JSON.stringify(data),
       })
      .then((response) => response.json())
      .then((responseJSON) => {
        setIsAdding(false);
        console.log(responseJSON); 
         if(responseJSON.status == true && responseJSON.statusCode == 200){
            navigation.navigate('ProfileSuccess')
         }else{
             
         }
         
      }).catch((error) => {
        setIsAdding(false);
         console.log(error);  
       
      })    
     }


     const [pickedimage, setImage] = useState('');

     async function handleFilePicking() {

      try {
          const result = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images],
          });
          
          setImage(result);
          console.log(result)
          handleUploadImage(result)
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            alert('Canceled from images selection');
          } else {
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      
    }

    const [isUploading, setIsUploading] = useState(false);
    function handleUploadImage(pickedImage){

       setIsUploading(true)
       let data = new FormData();
       data.append('image', {
        name: pickedImage.name,
        type: pickedImage.type,
        uri: Platform.OS === 'ios' ? pickedImage.uri.replace('file://', '') : pickedImage.uri,
      });

      return fetch(`${BaseUrl}/users/avatar`, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${userJwt}`,
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          handleReCatch()
        })
        .catch((error) => {
            console.error(error);
        });
    }


    function handleReCatch(){
     
      fetch(`${BaseUrl}/auth/me`, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userJwt}`,
        },
       })
      .then((response) => response.json())
      .then((responseJSON) => {
        
         if(responseJSON.status == true && responseJSON.statusCode == 200){
            dispatch(setUserData(responseJSON.data))
            setIsUploading(false)
            setShowAlert(true)
         }else{
            
         }
         
      }).catch((error) => {
         console.log(error);  
      })  
    }
    return (
        <View style={[styles.deposittwo_container_main]}>
            <CustomeStatusBar 
                   backgroundColor={'transparent'}
                   barStyle={'dark-content'}
                   
                 />
               <View style={styles.deposittwo_top_main}>
               <Header  navigation={navigation} isBackArrow={true} title="Edit profile" />
              
               
               <ScrollView 
                  style={{width: '100%' }}
                  showsVerticalScrollIndicator ={false}
                  showsHorizontalScrollIndicator={false}>
               <View style={style.dashboard_eprofile_middle}>
                    {
                      (pickedimage != '')?
                      <Image source={{uri: pickedimage.uri}} style={style.dashboard_eprofile_middle_img} resizeMode='contain'/>
                      :
                      
                      <Image source={{uri: userData.avatar}} style={style.dashboard_eprofile_middle_img} resizeMode='contain'/>
                    }
                    
                    <Pressable onPress={()=> handleFilePicking()}>
                       {
                         (!isUploading)?
                         <Image source={require('../../../assets/images/camera.png')} style={style.dashboard_eprofile_middle_cam} resizeMode='contain'/>
                         :
                         <ActivityIndicator color={Colors.button} style={style.dashboard_eprofile_middle_cam} />
                       }
                    </Pressable>
                    
                </View>
                <View style={{width: '100%'}}>

                <View style={styles.form_group}>
                     <Text style={styles.form_label}>First Name</Text>
                    <View style={(isActiveOne)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                         <TextInput 
                            placeholder='Oluwaseyi'
                            value={firstname}
                            onChangeText={(value)=>onChangeHandler('firstname',value)}
                            placeholderTextColor={Colors.placeholder}
                            
                            onFocus={() => setActiveOne(true)}
                            onBlur={() => setActiveOne(false)}
                            style={styles.form_input_type_2}
                            />

                    </View>
                </View>


                <View style={styles.form_group}>
                     <Text style={styles.form_label}>Last name</Text>
                    <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                         <TextInput 
                            placeholder='Falola'
                            placeholderTextColor={Colors.placeholder}
                            value={lastname}
                            onChangeText={(value)=>onChangeHandler('lastname',value)}
                            onFocus={() => setActiveTwo(true)}
                            onBlur={() => setActiveTwo(false)}
                            style={styles.form_input_type_2}
                            
                            />

                    </View>
                </View>

                {/* <View style={styles.form_group}>
                     <Text style={styles.form_label}>Email address</Text>
                    <View style={(isActiveTwo)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap}>
                         <TextInput 
                            placeholder='Falolaoluwaseyi@gmail.com'
                            placeholderTextColor={Colors.neutral}
                            value={email}
                            onChangeText={(value)=>onChangeHandler('email',value)}
                            onFocus={() => setActiveTwo(true)}
                            onBlur={() => setActiveTwo(false)}
                            style={styles.form_input_type_2}
                            editable={false}
                            />

                    </View>
                </View> */}



                <View style={styles.form_group}>
                     <Text style={styles.form_label}>Brace ID</Text>
                    <View style={[(isActiveThree)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap,{backgroundColor:'#F9FAFB'}]}>
                         <TextInput 
                            placeholder='@falolaoluwaseyi'
                            placeholderTextColor={Colors.neutral}
                            value={'@'+userData.braceTag}
                            onChangeText={(value)=>onChangeHandler('braceid',value)}
                            onFocus={() => setActiveThree(true)}
                            onBlur={() => setActiveThree(false)}
                            style={styles.form_input_type_2}
                            editable={false}
                            />

                    </View>
                </View>


                <View style={styles.form_group}>
                     <Text style={styles.form_label}>Phone number</Text>
                    <View style={[(isActiveFour)?styles.form_input_focus_2_wrap:styles.form_input_type_2_wrap, {backgroundColor:'#F9FAFB'}]}>
                         <TextInput 
                            placeholder='080997748839'
                            placeholderTextColor={Colors.neutral}
                            value={phonenumber}
                            onChangeText={(value)=>onChangeHandler('phonenumber',value)}
                            onFocus={() => setActiveFour(true)}
                            onBlur={() => setActiveFour(false)}
                            style={styles.form_input_type_2}
                            editable={false}
                            />

                    </View>
                </View>


                <Text style={[style.dashboard_eprofile_note, {marginBottom: 25}]}>To change your account information, please email contact@brace.finance</Text>

                </View>
                <View style={[styles.btn_container, {marginBottom: 100}]}>
                        {
                             (firstname != '' && lastname !='')?
                             (!isAdding)?
                            <TouchableOpacity style={styles.btn_wrapper} onPress={()=> handleUpdateProfile()}>
                                <Text style={styles.btn_text}>Update profile </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                               
                                <ActivityIndicator size="small" color="#ffffff" style={{marginLeft:5}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.btn_wrapper2} >
                                <Text style={styles.btn_text}>Update profile </Text>
                            </TouchableOpacity>
                        
                  }        
                    </View>
                </ScrollView>

              </View>
                {/* <View style={[styles.deposittwo_bottom_main]}>
                  
            
               </View> */}
               

               <CustomAlert 
                show={showAlert} 
                message={'Avatar added successfully'} 
                buttonTitle='Close'
                onConfirmPressed={() => {
                    setShowAlert(false)
                }} 
                type='success'
                
            /> 
                

                     
     </View>
    );
};



export default EditProfile;
