import {StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';
const {width, height} = Dimensions.get('window');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;


export default  styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
      },
      appBar: {
        backgroundColor:'red',
        height: STATUSBAR_HEIGHT,
     },
     keyboard_wrap:{
       width: '100%',
       padding: 0,
       margin: 0,
       marginBottom: 15,
     },
     keyboard_wrap2:{
      width,
      padding: 0,
      margin: 0,
      marginBottom: height/10,
    },
    keyboard_row:{
      width,
      margin: 0,
      padding: 0,
      marginLeft: -width/11,
    },
    keyboard_row2:{
      width,
      margin: 0,
      padding: 0,
      marginLeft: -width/19,
   },
     keyboard_key:{
      backgroundColor: '#F9FAFB',
       marginRight: width/20,
       fontWeight: '600',
      
       borderRadius: 8,
       overflow: 'hidden'
     },
     keyboard_key_text:{
      fontWeight: '500',
      fontFamily: 'Faktum-Medium',
      borderRadius: 8,
      color: '#191A1C',
      fontSize: 20,
      paddingVertical: 10,
      paddingHorizontal: 0,
      overflow: 'hidden'
     },
   alert_overlay:{
    backgroundColor: '#062638',
    opacity: 0.1,
 },
 alert_content_container:{
     width: '100%',
     backgroundColor: Colors.background,
     borderRadius: 12,
     overflow: 'hidden',
 },
 alert_message:{
   width: '80%',
   color: Colors.black,
   maxWidth: '80%',
   fontSize: 14,
   lineHeight: 18,
   fontWeight: '400',
   fontFamily: 'Faktum',
   textAlign: 'center',
   marginVertical: 6,
 },
 alert_button:{
     width: width/1.6,
     paddingVertical: 14,
     flexDirection: 'row',
     justifyContent: 'center'
 },
 alert_button_text:{
   color: Colors.white,
   maxWidth: '80%',
   fontSize: 16,
   lineHeight: 24,
   fontWeight: '600',
   fontFamily: 'Faktum',
 },

 bar_wrapper:{
  paddingTop: height/15, 
  marginLeft: '-16%',
},
figure_wrapper:{
  width: width/5.6,
  alignItems: 'center',
  marginBottom: 10
},
figure_wrapper_top:{
 marginBottom: 10,
 width: '100%',
 backgroundColor: Colors.button,
 paddingVertical: 10,
 flexDirection: 'row',
 justifyContent: 'center',
 borderRadius: 5,
 overflow: 'hidden',
},
figure_wrapper_top_text:{
  color: Colors.white,
  fontSize: 10,
  lineHeight: 10,
  fontWeight: '400',
  fontFamily: 'Faktum-Medium',
},
figure_wrapper_middle:{
width:10,
height:10,
borderLeftWidth:10,
borderLeftColor:"transparent",
borderRightWidth:10,
borderRightColor:"transparent",
borderTopWidth:10,
borderTopColor:Colors.button,
marginTop:-10,
marginBottom: 10
},
figure_wrapper_bottom:{
  paddingBottom: 20
},
bar_labelTextStyle:{
  color: Colors.neutral,
  fontSize: 30,
  lineHeight: 12,
  fontWeight: '400',
  fontFamily: 'Faktum-Medium',
},


    dashboard_wrapper:{
       width: '100%',
       backgroundColor: Colors.white,
       marginTop: Platform.OS == 'ios'? -20: 0
    },

    dashboard_wrapper2:{
        width: '100%',
        backgroundColor: Colors.white,
        marginTop: Platform.OS == 'ios'? -20: 0
     },
    dashboard_wrapper_top:{
       width: '100%',
       paddingHorizontal: 10,
       backgroundColor: Colors.white,
      
    },
    dashboard_main_wrapper:{
     width: '100%',
     height,
     backgroundColor: Colors.background,
     paddingTop: 50,
    },
    header_wrapper:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS == 'ios'? 0: 0,
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 5,
        backgroundColor: Colors.background,
        position: 'absolute',
        minHeight: 60,
        top: 0,
        paddingTop: Platform.OS == 'ios'? 0: 10,
       
        zIndex: 10,

    },
    header_wrapper_inner:{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Platform.OS == 'ios'? 0: 10,
      alignItems: 'center',
  },
    header_wrapper_left:{
      width:'27%',
      flexDirection: 'row'
    },
    header_wrapper_left2:{
      width:'36%',
      flexDirection: 'row'
    },
    header_wrapper_right:{
      width:'73%',
      flexDirection: 'row'
    },

    header_wrapper_left_c:{
      width:'40%',
      flexDirection: 'row'
    },
    header_wrapper_right_c:{
      width:'60%',
      flexDirection: 'row'
    },


    header_wrapper_left_d:{
      width:'34%',
      flexDirection: 'row'
    },
    header_wrapper_right_d:{
      width:'66%',
      flexDirection: 'row'
    },
    header_wrapper_profile:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios'? 6: 14,
        paddingHorizontal: 15,
        marginBottom: 5,
        backgroundColor: Colors.background,
        position: 'absolute',
        minHeight: 60,
        top: 0,
        marginTop: 0,
        zIndex: 10,
    },
    header_wrapper_stats:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6
    },
    header_left_text:{
        color: Colors.neutral,
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
    },
    header_icon:{
      width: 47,
      height: 47,
      borderRadius: 50,
      overflow: 'hidden',
    },
    header_icon_profile:{
        width: 36,
        height: 36,
        overflow: 'hidden',
        borderRadius: 50,
      },
    header_icon_back:{
        width: 18,
        height: 18,
      },
    header_menu_wrap:{
       backgroundColor: '#fff',
       paddingVertical: 11,
       paddingHorizontal:11,
       shadowColor: Colors.gray,
       shadowOpacity: 0.5,
       shadowOffset: { width: 0, height: 1},
       shadowRadius: 5,
       elevation: 10,
       borderRadius: 50,
       marginTop: 5
    },
    header_menu:{
      
    },
    header_middle:{
      color: Colors.neutral,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
      fontFamily: 'Faktum-Regular',
    },
    logo_wrapper:{
        width: '100%',
        alignItems:'center',
        marginBottom: 30
    },
    logo:{
        width: 140,
        height: 60,
        
    },
    btn_container:{
      width:'100%',
      justifyContent:'center',
      alignItems: 'center'
  },
  btn_wrapper:{
      width: width/1.1,
      backgroundColor: Colors.button,
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: 12,
      overflow: 'hidden',
  },

  btn_wrapper_green:{
    width: width/1.1,
    backgroundColor: Colors.green,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
},

btn_wrapper_white:{
  width: width/1.1,
  backgroundColor: Colors.white,
  paddingVertical: 15,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:'center',
  borderRadius: 12,
  overflow: 'hidden',
  borderColor: Colors.lightgray,
  borderWidth: 1,
  marginTop: 10
},
btn_wrapper_small_white:{
  width: width/3.5,
  backgroundColor: Colors.white,
  paddingVertical: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent:'center',
  borderRadius: 12,
  overflow: 'hidden',
  borderColor: Colors.lightgray,
  borderWidth: 1,
  marginTop: 10
},
btn_text_white:{
  color: Colors.neutral,
  textAlign: 'center',
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
},
btn_wrapper_green_img:{
  width: 20,
  height: 20,
  marginLeft: 10
},
btn_wrapper_white_img:{
  width: 20,
  height: 20,
  marginLeft: 10
},

  btn_wrapper2:{
      width: width/1.1,
      backgroundColor: Colors.inactive_button2,
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: 12,
      overflow: 'hidden',
      flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
  },
  btn_text:{
      color: Colors.white,
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
      fontFamily: 'Faktum-Bold',
  },
    auth_header_container:{
        width:'100%',
        flexDirection: 'row',
        marginTop: 10
    },
    auth_header_left:{
        paddingLeft: 10
    },
    auth_header_left_img:{
        width: 16,
        height: 16,
    },
    loader_wrapper:{
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background
        
    },
    loader_wrapper_logo:{
        width: 140,
        height: 140,
        marginTop: -height/7
    },
    page_wrapper:{
        marginTop: height/20,
        paddingHorizontal: 15,
        flexDirection: 'column',
        width,
        height
    },
    page_wrapper_tag:{
        marginTop: 20,
        paddingHorizontal: 15,
        flexDirection: 'column',
        width,
        height
    },
    page_wrapper_top:{
       flex: .72,
    },
    page_wrapper_bottom:{
       flex:.28,
    },
    page_title:{
        color: Colors.black,
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
       
        fontFamily: 'Faktum-Bold',
    },
    page_subtitle:{
        color: Colors.dark_gray,
        maxWidth: '80%',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
        marginTop: 20
    },
    page_subtitle2:{
        color: Colors.dark_gray,
        maxWidth: '100%',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        marginTop: 12
    },

    page_subtitle4:{
      color: Colors.dark_gray,
      maxWidth: '70%',
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '400',
      fontFamily: 'Faktum-Regular',
      marginTop: 12
  },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100
      },
      modalView: {
        marginTop: height/10,
        backgroundColor: Colors.white,
        borderRadius: 20,
        width,
        height,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modal_button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      balance_wrapper:{
       width: '100%',
       marginTop: 32,
       backgroundColor: Colors.white
      },
      balance_wrapper_stats:{
        width: '100%',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
       },
      balance_top:{
        width: '100%',
        flexDirection: 'row',
        textAlign: 'center'
      },
      balance_top_a:{
        color: Colors.black,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
      },
      balance_top_b:{
        marginLeft: 15
      },
      balance_middle:{
        width: '100%',
        flexDirection: 'row',
        marginTop: 13, 
        backgroundColor: Colors.white
      },
      balance_middle_stats:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 13
      },
      balance_middle_a:{
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: Colors.lightgray,
        borderRadius: 50,
        overflow: 'hidden',
      },
      balance_middle_a_img:{
          width: 25,
          height: 25,
      },
      balance_middle_balance:{
          flexDirection: 'row',
          alignItems: 'baseline',
      },
      balance_middle_b:{
        marginLeft: 10,
        color: Colors.neutral,
        fontSize: 36,
        lineHeight: 44,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
      },
      balance_middle_c:{
        color: Colors.black,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
      },
      balance_middle_d_wrap:{
        width: '25%',
        marginLeft: 20
      },
      balance_middle_d:{
        width: '100%',
      },
      balance_bottom:{
          marginTop: 10,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
      },
      balance_bottom_stats:{
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
      balance_bottom_a:{
        color: Colors.green,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
      },
      balance_bottom_b:{
        color: Colors.black,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        marginLeft: 6,
      },

      action_wrapper:{
        width: '100%',
        flexDirection: 'row',
        marginTop: 30,
        backgroundColor: Colors.white,
      },
      action_box:{
        width: '22%',
        marginRight: '3%',
        alignItems: 'center',
        backgroundColor: Colors.white,
      },
      action_box_image_wrap:{
        paddingVertical: 13,
        paddingHorizontal: 13,
        backgroundColor: Colors.button,
        borderRadius: 50,
        overflow: 'hidden',
      },
      action_box_image:{
        width: 25,
        height: 25,
      },
      action_box_text:{
        marginTop: 10,
        color: Colors.button,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
      },
      site_wrapper:{
        backgroundColor: Colors.white,
        marginTop: 40,
        paddingHorizontal: 15,
        paddingTop: 25,
        paddingBottom: 30,
        borderTopColor: '#E5E7EB',
        borderTopWidth: 1,
      },
      site_header:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 20
      },
      site_header_text:{
        color: Colors.button,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
      },
      site_header_icon:{
          
      },
      site_bottom:{

      },
      site_bottom_box_cover:{
        flexDirection: 'row',
        marginLeft: 3
      },
      site_bottom_box:{
        marginRight: 15,
        marginBottom: 20
      },
      site_bottom_box2:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop: -15,
      },
      site_bottom_box2_txt:{
        color: '#9CA3AF',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
      },
      site_bottom_box_image:{
         width: 60,
         height: 60,
         borderRadius: 50,
         overflow: 'hidden',
      },
      site_bottom_box_icon_wrap:{
         paddingHorizontal: 18,
         paddingVertical: 18,
         backgroundColor: Colors.white,
         borderRadius: 50,
         shadowColor: Colors.gray,
         shadowOpacity: 0.5,
         shadowOffset: { width: 0, height: 3},
         shadowRadius: 5,
         elevation: 10,
      },
      site_bottom_box_icon:{
          
      },

      trans_wrapper:{
        width: '100%',
        backgroundColor: Colors.white,
        marginTop: -20,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 40,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        overflow: 'hidden',
        zIndex: 20,
        // borderColor: '#F3F4F6',
        // borderWidth: 1.5
      },
      trans_header:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 20
      },
      trans_header_text:{
        color: Colors.button,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
      },
      trans_header_icon:{
          
      },
      trans_bottom:{
       paddingBottom: 30,
      },
      trans_bottom_no:{
       paddingVertical: 20,
       justifyContent: 'center',
       alignItems: 'center',
       paddingBottom: 20,
      },
      trans_bottom_no_image:{
        width: 100,
        height: 100
     },
     trans_bottom_no_text:{
        color: Colors.neutralgray,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        marginTop: 7,
     },
      transaction_box_wrap:{
          width: '100%',
          marginTop: 0,
          marginBottom: 10,
      },
      transaction_box_header:{
        color: Colors.neutralgray,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        marginBottom: 10,
      },
      transaction_box_box:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      transaction_box_box_img:{
        width: 50,
        height: 50,
        borderRadius:50,
        overflow: 'hidden',
      },
      transaction_box_left_wrap:{
        flexDirection: 'row',
        
      },
      transaction_box_left:{
        marginLeft: 15
      },
      transaction_box_left_a:{
        color: Colors.button,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        marginTop: 3,
      },
      transaction_box_left_b:{
        color: Colors.neutralgray,
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        marginTop: 5,
      },
      transaction_box_right:{
         justifyContent: 'flex-end',
         alignItems: 'flex-end'
      },
      transaction_box_right_a:{
        color: Colors.button,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        marginTop: 3,
      },
      transaction_box_right_b:{
        color: Colors.neutralgray,
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        marginTop: 5,
      },
      stats_container:{
          width: '100%',
          minHeight: 300,
          backgroundColor: Colors.background,
          marginTop: 20,
          borderRadius: 30,
          paddingHorizontal: 10,

      },
      
      barchart_header:{
         width: '100%',
         marginTop: 10,
         flexDirection: 'row',
         justifyContent: 'space-between'
      },
      barchart_header_icon:{
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: Colors.white,
        borderRadius: 50,
        shadowColor: Colors.gray,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 1},
        shadowRadius: 5,
        elevation: 10,
     },
      stats_week_wrap:{
        backgroundColor: Colors.white,
        width: '30%',
        borderRadius: 25,
        shadowColor: Colors.gray,
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 4},
        shadowRadius: 10,
        elevation: 10,
        maxHeight: 40,
      },
      stats_week:{
        paddingHorizontal: 0,
        backgroundColor: Colors.white,
        width: '100%',
        borderRadius: 25,
        overflow: 'hidden',
    },
    stats_week_text:{
        color: Colors.neutralgray,
        fontSize: 12,
        lineHeight: 12,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
    },
    stats_week_icon:{
        marginRight: 10
    },
    dropdown4BtnTxtStyle: {
        color: '#444', 
        textAlign: 'left'
    },
  dropdown4DropdownStyle: {
      backgroundColor: '#EFEFEF'
   },
  dropdown4RowStyle: {
      backgroundColor: '#EFEFEF', 
      borderBottomColor: '#C5C5C5',
      
  },
  dropdown4RowTxtStyle: {
        color: Colors.neutralgray,
        fontSize: 12,
        lineHeight: 12,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
   },

 dropdown4DropdownStyle2: {
    backgroundColor: Colors.white,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
 },
  dropdown4RowStyle2: {
    backgroundColor: Colors.white, 
    borderBottomColor: '#C5C5C5'
},
  dropdown4RowTxtStyle2: {
      color: Colors.neutralgray,
      fontSize: 14,
      lineHeight: 16,
      fontWeight: '400',
      fontFamily: 'Faktum-Regular',
 },
trans_wrapper_stats:{
        width: '100%',
        backgroundColor: Colors.white,
        marginTop: 30,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 100,
        borderColor: '#F3F4F6',
        borderWidth: 1.5
      },

      trans_wrapper_stats2:{
        width: '100%',
        backgroundColor: Colors.white,
        marginTop: 0,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 100,
        borderColor: '#F3F4F6',
        borderWidth: 1.5
      },
    dashboard_pay_middle:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: height/6,
    },
    dashboard_pay_middle_img:{
        width: '55%',
        height: height/4
    },
    dashboard_pay_middle_txt:{
        width: '65%',
        marginVertical: 30,
        color: Colors.neutralgray,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        textAlign: 'center'
    },
    dashboard_pay_btn:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    dashboard_pay_btn_text:{
        color: Colors.green,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
    },
    dashboard_pay_btn_icon:{
        marginLeft: 10
    },
    dashboard_more:{
        width: '100%',
    },
    dashboard_more_box:{
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 15
    },
    dashboard_more_box2:{
      width: '100%',
      marginTop: 50,
      paddingHorizontal: 0,
      
  },
    dashboard_more_box_top:{
        width: '100%',
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: 17,
        alignItems: 'center'
    },
    dashboard_more_box_top_img:{
        width: 25,
        height: 25,
    },
    dashboard_more_box_top_text:{
        marginLeft: 10,
        color: Colors.green,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
    },
    dashboard_more_box_bottom:{
        width: '100%',
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        alignItems: 'center'
    },
    dashboard_more_box_bottom_text:{
        color: Colors.button,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
    },
    dashboard_more_box_bottom_icon:{

    },
    dashboard_more_logout:{
      width:'100%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 30,
      paddingBottom: 60,
      backgroundColor: Colors.background
    },
    dashboard_more_logout_text:{
      color: 'red',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
    },
    dashboard_profile_middle:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        paddingBottom: 30,
        borderBottomColor: '#F3F4F6',
        borderBottomWidth: 2,
      },
      dashboard_profile_middle_img:{
         width: 80,
         height: 80,
         borderRadius:50,
         overflow: 'hidden',
      },
      dashboard_profile_middle_txt_a:{
          width: '100%',
          marginBottom: height/12,
          color: Colors.neutral,
          fontSize: 24,
          lineHeight: 32,
          fontWeight: '600',
          fontFamily: 'Faktum-Bold',
          textAlign: 'center'
      },
      dashboard_profile_middle_txt_a22:{
        width: '100%',
        marginBottom: 1,
        color: Colors.neutral,
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
        textAlign: 'center'
    },
      dashboard_profile_middle_txt_b:{
        width: '100%',
        marginTop: 10,
        color: Colors.neutral,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'Faktum-Regular',
        textAlign: 'center'
    },
    dashboard_profile_middle_txt_b2:{
      width: '100%',
      marginTop: 10,
      color: Colors.neutral,
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '400',
      fontFamily: 'Faktum-Regular',
      textAlign: 'center'
  },
      dashboard_profile_middle_txt:{
        width: '65%',
        marginVertical: 20,
        color: Colors.neutral,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Faktum-Bold',
        textAlign: 'center'
    },
    v_tag_link_container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    v_tag_link_wrap:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        padding: 10,
        backgroundColor: '#F3F4F6',
    },
    v_tag_link_wrap2:{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      overflow: 'hidden',
      borderColor: Colors.black,
      borderWidth: 2,
      padding: 4,
      backgroundColor: '#EDEDED',
  },
    v_tag_link_l:{
      width: 30,
      height: 30
    },
    v_tag_link_middle:{
        borderLeftColor: Colors.black,
        borderLeftWidth: 1.3,
        marginHorizontal: 10,
    },
    v_tag_link_middle2:{
      marginRight: 10,
  },
    v_tag_link_middle_text:{
       marginLeft: 8,
       color: Colors.neutral,
       fontSize: 14,
       lineHeight: 18,
       fontWeight: '600',
       fontFamily: 'Faktum-Bold',
    },
    v_tag_link_middle_text11:{
      marginLeft: 8,
      color: Colors.neutral,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '600',
      fontFamily: 'Faktum-Bold',
   },
    v_tag_link_middle_text2:{
      marginLeft: 15,
      color: Colors.white,
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '600',
      fontFamily: 'Faktum-Bold',
   },
    v_tag_link_r:{
       width: 30,
       height: 30
    },
    modal_container:{
      height: height-40,
    },
    modal:{
      width:'100%',
      margin: 0,
      marginTop: height/7.9,
      backgroundColor: 'transparent',
  },
   modalView: {
     marginTop: 0,
     backgroundColor: Colors.white,
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
     width: '100%',     
     height,
     shadowColor: Colors.gray,
     shadowOpacity: 0.5,
     shadowOffset: { width: 0, height: 4},
     shadowRadius: 5,
     elevation: 10,
     paddingHorizontal: 15,
     paddingTop: 10
   },
   modal_header:{
     width: '100%',
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginTop: 10,
     alignItems: 'center',
     marginBottom: 20,
  },
 
   modal_header_left:{
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 50,
    shadowColor: Colors.gray,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0},
    shadowRadius: 2,
    elevation: 5,
 },
 modal_header_left_img:{
    width: 12,
    height: 12
 },
 modal_header_middle:{
  color: Colors.neutral,
  fontSize: 18,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
 },
 modal_header_right:{
  paddingHorizontal: 10,
  paddingVertical: 10,
  backgroundColor: Colors.white,
  borderRadius: 50,
  shadowColor: Colors.gray,
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 1},
  shadowRadius: 5,
  elevation: 20,
},
modal_header_right_img:{
  width: 14,
  height: 14
},

depositeone_title:{
  color: Colors.neutral,
  fontSize: 18,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  maxWidth: '80%',
},
depositeone_wrapper:{
  width: '100%',
  marginTop: 30,
},
depositeone_box:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 20,
},
depositeone_box_left:{
  paddingVertical: 13,
  paddingHorizontal: 13,
  backgroundColor: Colors.button,
  borderRadius: 50,
  overflow: 'hidden',
},

depositeone_box_left_img:{
  width: 25,
  height: 25,
},
depositeone_box_right:{
  marginLeft: 15
},
depositeone_box_right_a:{
  color: Colors.black,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '500',
  fontFamily: 'Faktum-Medium',
},
depositeone_box_right_b:{
  color: Colors.gray,
  fontSize: 12,
  lineHeight: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
deposittwo_container:{
  flex: 1,
  backgroundColor: Colors.background,
  
},
deposittwo_container_main:{
  flex: 1,
  backgroundColor: Colors.background,
  marginTop: Platform.OS == 'ios'? -20:0,
},
deposittwo_top:{
  width: '100%',
},
deposittwo_bottom:{
  bottom: Platform.OS == 'ios'? 110:80,
  position: 'absolute',
  width: '100%',
 },

 deposittwo_top_main:{
  width: '100%',
  paddingHorizontal: 15
},
deposittwo_bottom_main:{
  bottom: Platform.OS == 'ios'? 50:30,
  position: 'absolute',
  width: '100%',
  paddingHorizontal: 15,
 },


 deposittwod_top:{
  flex: .75,
 },
 deposittwod_bottom:{
   flex: .25,
  },
deposittwo_main_top:{
  width: '100%',
  alignItems: 'center',

},

deposittwo_main_top_b:{
  width: '100%',
},

deposittwo_main_top_main:{
  width: '100%',
  marginTop: 10
},

deposittwo_main_top2:{
  width: '100%',
  alignItems: 'center',
  marginTop: height/4,

},
deposittwo_main_top_a:{
  color: Colors.black,
  fontSize: 24,
  lineHeight: 32,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
},
deposittwo_main_top_b:{
  color: Colors.neutral,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
deposittwo_main_top_e:{
  color: Colors.neutral,
  fontSize: 16,
  lineHeight: 20,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  
},
deposittwo_main_top_b2:{
  color: Colors.button,
  fontSize: 16,
  lineHeight: 20,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  marginTop: 10,
},
deposittwo_main_top_b3:{
  color: Colors.button,
  fontSize: 20,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginTop: 10,
  textAlign: 'center',
  maxWidth: '80%',
},
deposittwo_main_top_b4:{
  color: Colors.button,
  fontSize: 16,
  lineHeight: 20,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  marginTop: 20,
},
deposittwo_main_top_f:{
  color: Colors.neutral,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
deposittwo_main_middle:{
  width: '100%',
  alignItems: 'center',
  marginTop: height/10
},
deposittwo_main_middle2:{
  width: '100%',
  alignItems: 'center',
  marginTop: 0,
},
deposittwo_main_input:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
},
deposittwo_main_middle_a:{
  color: Colors.button,
  fontSize: 72,
  lineHeight: 72,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
},
deposittwo_main_middle_a_i:{
  color: Colors.button,
  fontSize: 72,
  lineHeight: 79,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginTop: -2,
},
deposittwo_main_middle_bank_wrap:{
  flexDirection: 'row',
  width: '50%',
  alignItems: 'center',
  backgroundColor: Colors.white,
  height: 36,
  borderRadius: 12,
  paddingLeft: 10,
  shadowColor: Colors.gray,
  shadowOpacity: 0.5,
  shadowOffset: { width: 2, height: 4},
  shadowRadius: 10,
  elevation: 10,
  marginTop: 20,
},
deposittwo_main_middle_bank_wrap2:{
  flexDirection: 'row',
  width: '30%',
  alignItems: 'center',
  backgroundColor: Colors.white,
  height: 36,
  borderRadius: 12,
  paddingLeft: 10,
  shadowColor: Colors.gray,
  shadowOpacity: 0.5,
  shadowOffset: { width: 2, height: 4},
  shadowRadius: 10,
  elevation: 10,
  marginTop: 10,
},
deposittwo_main_middle_bank_i:{
  width: 20,
  height: 20,
},
deposittwo_main_middle_bank:{
  paddingHorizontal: 0,
  height: '100%',
  backgroundColor: Colors.white,
  width: '80%',
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  overflow: 'hidden',
},
deposittwo_main_middle_bank2:{
  paddingHorizontal: 0,
  height: '100%',
  backgroundColor: Colors.white,
  width: '100%',
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  overflow: 'hidden',
},

deposittwo_main_middle_bank_text2:{
  color: Colors.neutralgray,
  fontSize: 20,
  lineHeight: 28,
  fontWeight: '500',
  fontFamily: 'Faktum-Medium',
},

deposittwo_main_middle_bank_text:{
  color: Colors.neutralgray,
  fontSize: 14,
  lineHeight: 18,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
// stats_week_icon:{
//   marginRight: 10
// },
deposittwo_main_top_c:{
  paddingVertical: 18,
  paddingHorizontal: 18,
  backgroundColor: Colors.button,
  borderRadius: 50,
  overflow: 'hidden',
  marginBottom: 25,
},

deposittwo_main_top_c_b:{
  paddingVertical: 18,
  paddingHorizontal: 18,
  backgroundColor: '#E6E9EB',
  borderRadius: 50,
  overflow: 'hidden',
  
},
deposittwo_main_top_c2:{
  paddingVertical: 15,
  paddingHorizontal: 15,
  backgroundColor: Colors.green,
  borderRadius: 50,
  overflow: 'hidden',
  marginBottom: 10,
},

deposittwo_main_top_c_img:{
  width: 30,
  height: 30,
}, 
deposittwo_main_top_d:{
  color: Colors.neutralgray,
  fontSize: 14,
  lineHeight: 18,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  maxWidth: '80%',
  marginTop: 30,
},

deposittwo_main_top_d_b:{
  color: Colors.neutralgray,
  fontSize: 14,
  lineHeight: 18,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  maxWidth: '80%',
  marginVertical: 40,
  textAlign: 'center',
  
},


depositfour_main:{
  width: '100%',
  marginBottom: height/8,
  paddingHorizontal: 5,
  marginTop: 25
},
depositfour_main_box:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 25,
  borderBottomColor: Colors.lightgray,
  borderBottomWidth: 1,
},
depositfour_main_box_text1:{
  color: Colors.neutralgray,
  fontSize: 14,
  lineHeight: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
depositfour_main_box_text2:{
  color: Colors.neutral,
  fontSize: 14,
  lineHeight: 18,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
crypto_wrap:{
  width: '100%',
  alignItems: 'center',
  
},
crypto_wrap22:{
  width: '100%',
  alignItems: 'center',
  
  
},
crypto_qrcode_img:{
  width: '60%',
  height: '44%',

},
crypto_qrcode_qrcode:{
  marginVertical: 30,
  
},
crypto_qrcode_img22:{
  width: '60%',
  height: height/4,
  marginTop: 20,
  marginBottom: 10
},
crypto_share_warning:{
  maxWidth: '70%',
  textAlign: 'center',
  marginBottom: 20,
  marginTop: 10,
  color: '#323232',
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
crypto_share_wrap:{
   paddingHorizontal: 16,
   paddingVertical: 12,
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: Colors.button,
   borderRadius: 12,
   overflow: 'hidden',
   marginTop: 10,

},
crypto_share_wrap_img:{
   width: 13,
   height: 13,
},
crypto_share_text:{
  color: Colors.white,
  fontSize: 14,
  lineHeight: 18,
  fontWeight: '500',
  fontFamily: 'Faktum-Medium',
  marginLeft: 5, 
},
deposit_sharable_wrap:{
  width: '100%',
  alignItems: 'center',
  marginTop: 0,
  paddingBottom: 30,
  borderBottomWidth:4,
  borderBottomColor: '#F3F4F6',
  marginBottom: 50
},

deposit_sharable_wrap22:{
  width: '100%',
  alignItems: 'center',
  marginTop: 0,
  paddingBottom: 20,
  borderBottomWidth:1,
  borderBottomColor: '#F3F4F6',
  marginBottom: 20,
  
},

sharable_link_container:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
},
sharable_link_wrap:{
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 10,
  overflow: 'hidden',
  borderColor: Colors.black,
  borderWidth: 2,
  padding: 10,
  backgroundColor: Colors.button,
},

sharable_link_l:{
width: 30,
height: 30
},
sharable_link_middle:{
  borderLeftColor: Colors.white,
  borderLeftWidth: 1.3,
  marginHorizontal: 10,
},
sharable_link_middle2:{
marginRight: 10,
},
sharable_link_middle_text:{
 marginLeft: 15,
 color: Colors.white,
 fontSize: 14,
 lineHeight: 18,
 fontWeight: '600',
 fontFamily: 'Faktum-Bold',
},
sharable_link_r:{
 width: 30,
 height: 30
},
grediant: {
  height: 56,
  
  justifyContent: 'center',
  alignSelf: 'center',
  borderRadius: 12,
  
},
buttonContainer22: {
  flex: 1.0,
  alignSelf: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: Colors.button,
  paddingHorizontal: 14,
  borderRadius: 12,
  overflow: 'hidden',
  margin: 1,

},
buttonText: {
  textAlign: 'center',
  color: '#4C64FF',
  alignSelf: 'center',
},
withdrawtwo_box:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 20,
},
withdrawtwo_left:{
  borderRadius: 50,
  overflow: 'hidden',
},

withdrawtwo_left_img:{
  width: 30,
  height: 30,
},
withdrawtwo_left_img2:{
  width: 40,
  height: 40,
  borderRadius:50,
  overflow: 'hidden',
},
withdrawtwo_right:{
  marginLeft: 10
},
withdrawtwo_right_a:{
  color: Colors.black,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
withdrawtwo_right_b:{
  color: Colors.gray,
  fontSize: 12,
  lineHeight: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},

code_input_wrapper:{
  width: '100%',
  flexDirection: 'row'
},
codeFieldRoot: {
  marginTop: 20,
  marginRight: 0
  
},
cell: {
width: 60,
height: 60,
paddingTop: 5,
borderColor: Colors.lightgray,
borderWidth: 1,
borderRadius:5,
overflow: 'hidden',
paddingTop: 17,
marginRight:10,
fontSize: 18,
fontFamily: 'Faktum-Bold',
fontWeight: '600',
backgroundColor: Colors.white,
textAlign: 'center',
color: Colors.button

},
focusCell: {
  width: 66,
  height: 66,
  paddingTop: Platform.OS == 'ios'? 17: 19,
  borderRadius:10,
  borderColor: '#F3F4F6',
  borderWidth: 6,
  shadowColor: '#F3F4F6',
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 2},
  shadowRadius: 10,
  elevation: 10,
  marginTop: -3,
},
codeError:{
 borderColor: '#FF6D6D' 
},
page_error_text_wrap:{
  flexDirection: 'row',
  width: '100%',
  marginTop: 14
},
page_error_text1:{
  color: Colors.dark_gray,
  fontSize: 14,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  
},
page_error_text2:{
  color: Colors.green,
  fontSize: 14,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
send_input_wrap:{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
},
send_input_left:{
  flexDirection: 'row',
  alignItems: 'center'
},
send_input_label:{
  color: Colors.button,
  fontSize: 18,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  
},
send_input:{
  color: '#64C2CB',
  fontSize: 16,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginLeft: 10,
  maxWidth: width/1.4
},
send_input_img:{
  width: 25,
  height: 25,

},
send_contact_wrap:{
  width: '100%',
  marginTop: 20
},
send_contact_title:{
 width: '100%',
 borderBottomColor: Colors.lightgray,
 borderBottomWidth: 1,
 paddingBottom: 15,
 marginBottom: 0,
 marginTop: 25
},
send_contact_title_text:{
  color: Colors.neutral,
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
send_container:{
  flex: 1,
},
send_top:{
 flex: .7,
},
send_bottom:{
  flex: .3,
 },
send_estimate_wrap:{
  width: '100%',
  borderTopColor: Colors.lightgray,
  borderTopWidth: 1,
  paddingTop: 20,
  borderBottomColor: Colors.lightgray,
  borderBottomWidth: 1,
  paddingBottom: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 15,
},
send_estimate_left:{
  
},
send_estimate_left_a:{
  color: '#1F2937',
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
send_estimate_left_b:{
  color: '#9CA3AF',
  fontSize: 12,
  lineHeight: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
send_confirm_text:{
  width: '100%',
  justifyContent: 'center',
  flexDirection: 'row',
  marginTop: height/20,
  marginBottom: 20,
},
send_confirm_text_txt:{
  color: Colors.neutral,
  fontSize: 52,
  lineHeight: 56,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
},
send_confirm_account:{
  width: '100%',
  borderTopColor: '#F3F4F6',
  borderTopWidth: 1,
  paddingTop: 20,
  borderBottomColor: '#F3F4F6',
  borderBottomWidth: 1,
  paddingBottom: 20,
},
send_confirm_account1:{
  color: Colors.neutral,
  fontSize: 18,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginBottom: 8,
},
send_confirm_account2:{
  color: '#64C2CB',
  fontSize: 15,
  lineHeight: 23,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginBottom: 5
},
send_confirm_note:{
  color: '#4B5563',
  fontSize: 14,
  lineHeight: 18,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  marginBottom: 8,
  width: '90%',
  paddingLeft: '5%',
  textAlign: 'center'
},
qr_container:{
  width: '100%',
  height,
  backgroundColor: Colors.background
},
qr_wrapper:{
 width: '100%',
 height:  height/1.6,
 backgroundColor: Colors.background,
 
},
qr_code_scanner:{
 width: '100%',
 height: '100%',

}, 

marker_wrapper: {
  width: 100,
  height: 90,
  justifyContent: 'space-between'
},
marker_top:{
  width:'100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
},
marker_top1:{
  position: 'absolute',
  top: 0,
  left: 0,
  height: 25,
  width: 25,
  borderColor: '#FFFFFF',
  borderLeftWidth: 5,
  borderTopWidth: 5,
  borderRadius: 4
},
marker_top2:{
  position: 'absolute',
  top: 0,
  right: 0,
  height: 25,
  width: 25,
  borderColor: '#FFFFFF',
  borderRightWidth: 5,
  borderTopWidth: 5,
  borderRadius: 4
},
marker_bottom:{
  width:'100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
},
marker_bottom1:{
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: 25,
  width: 25,
  borderColor: '#FFFFFF',
  borderLeftWidth: 5,
  borderBottomWidth: 5,
  borderRadius: 4
},
marker_bottom2:{
  position: 'absolute',
  bottom: 0,
  right: 0,
  height: 25,
  width: 25,
  borderColor: '#FFFFFF',
  borderRightWidth: 5,
  borderBottomWidth: 5,
  borderRadius: 4
},
marker_middle:{
   flexDirection: 'row',
   justifyContent:'center'
},
marker_middle_text:{
  color: Colors.white,
  fontSize: 14,
  lineHeight: 18,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
qr_bottom:{
  height: height/1.4,
  width: '100%',
  backgroundColor: '#000000',
  marginTop: -10,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 30,
  paddingHorizontal: 15
 },
 qr_bottom_box:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 20,
},
qr_bottom_box_left:{
  paddingVertical: 13,
  paddingHorizontal: 13,
  backgroundColor: Colors.button,
  borderRadius: 50,
  overflow: 'hidden',
},

qr_bottom_box_left_img:{
  width: 18,
  height: 18,
},
qr_bottom_box_right:{
  marginLeft: 15
},
qr_bottom_box_right_a:{
  color: Colors.white,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
qr_bottom_box_right_b:{
  color: Colors.gray,
  fontSize: 12,
  lineHeight: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  
},











page_title:{
  color: Colors.black,
  fontSize: 24,
  lineHeight: 32,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginTop: 30
},
page_title2:{
  color: Colors.black,
  maxWidth: '80%',
  fontSize: 24,
  lineHeight: 32,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginTop: 20
},
page_subtitle:{
  color: Colors.dark_gray,
  maxWidth: '80%',
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginTop: 20
},

page_subtitle2:{
  color: Colors.dark_gray,
  maxWidth: '100%',
  fontSize: 14,
  lineHeight: 18,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  marginTop: 12
},
page_subtitle3:{
  color: Colors.dark_gray,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Bold',
  marginTop: 0,
  textDecorationStyle: 'solid',
  textDecorationColor: Colors.dark_gray,
},
page_error_text_wrap:{
  flexDirection: 'row',
  width: '100%',
  marginTop: 14
},
page_error_text1:{
  color: Colors.dark_gray,
  fontSize: 14,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  
},
page_error_text2:{
  color: Colors.green,
  fontSize: 14,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},
page_error_text11:{
  color: Colors.dark_gray,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  
},
page_error_text12:{
  color: Colors.dark_gray,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  textDecorationStyle: 'solid',
  textDecorationColor: Colors.dark_gray,
  textDecorationLine: 'underline',
},
form_group:{
  width: '100%',
  marginTop: 20
},    
form_label:{
  color: Colors.neutral,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
},

form_label01:{
  color: Colors.neutral,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '500',
  fontFamily: 'Faktum-Medium',
},


form_input_type_1:{
  color: Colors.neutral,
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  borderColor: Colors.lightgray,
  borderWidth: 1.2,
  paddingHorizontal: 12,
  paddingVertical: 14,
  marginTop: 10,
  borderRadius: 6,
  overflow: 'hidden',
},
form_input_focus_1:{
  color: Colors.gray,
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  borderColor: '#062638',
  borderWidth: 1.6,
  paddingHorizontal: 12,
  paddingVertical: 14,
  marginTop: 10,
  borderRadius: 6,
  overflow: 'hidden',
  // shadowColor: '#E1E1FE',
  // shadowOpacity: 0.5,
  // shadowOffset: { width: 0, height: 4},
  // shadowRadius: 5,
  // elevation: 10,
},

input_group:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderColor: Colors.lightgray,
  borderWidth: 1.2,
  paddingHorizontal: 12,
  paddingVertical: Platform.OS == 'ios'? 14: 4,
  borderRadius: 6,
  marginTop: 10,
},
input_group_focus:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderColor: '#062638',
  borderWidth: 1.2,
  paddingHorizontal: 12,
  paddingVertical: Platform.OS == 'ios'? 14: 4,
  borderRadius: 6,
  marginTop: 10,
},
input_group_country_wrap:{
  paddingRight: 7,
  borderRightColor: Colors.gray,
  borderRightWidth: 1,
},
input_group_country:{
  flexDirection: 'row',
  alignItems: 'center',
},
input_group_country_imge:{
  width: 20,
  height: 20,
  borderRadius: 1.5,
},
input_group_country_text:{
  color: Colors.neutral,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '600',
  fontFamily: 'Faktum-Regular',
  marginHorizontal: 5
},
input_group_country_icon:{

},
form_input_type_1_group:{
  color: Colors.neutral,
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  overflow: 'hidden',
  paddingLeft: 7,
  minWidth: width/1.8,
 
},
form_input_focus_1_group:{
  color: Colors.gray,
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  borderColor: '#062638',
  overflow: 'hidden',
  // shadowColor: '#E1E1FE',
  // shadowOpacity: 0.5,
  // shadowOffset: { width: 0, height: 4},
  // shadowRadius: 5,
  // elevation: 10,
},


form_input_type_2_wrap:{
  flexDirection: 'row',
  borderColor: Colors.lightgray,
  borderWidth: 1.2,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  marginTop: 10,
  borderRadius: 6,
  overflow: 'hidden',
},
form_input_type_2_wrap2:{
  flexDirection: 'row',
  borderColor: Colors.lightgray,
  borderWidth: 1.2,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 10,
  marginTop: 10,
  borderRadius: 6,
  overflow: 'hidden',
},
form_input_focus_2_wrap:{
  flexDirection: 'row',
  borderColor: '#062638',
  borderWidth: 1.6,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  marginTop: 10,
  borderRadius: 6,
  overflow: 'hidden',
},
form_input_focus_2_wrap2:{
  flexDirection: 'row',
  borderColor: '#062638',
  borderWidth: 1.6,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 10,
  marginTop: 10,
  borderRadius: 6,
  overflow: 'hidden',
},
form_input_type_2:{
  color: Colors.neutral,
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  flex: .95,
  paddingHorizontal: 12,
  paddingVertical: 14,
},
form_input_type_2_icon:{
  marginTop: 14
},
icon_andat:{
  width: 20,
  height: 20,
},
form_input_type_3:{
  color: Colors.neutral,
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  flex: .9,
  paddingHorizontal: 10,
  paddingBottom: 14,
  paddingTop: 14,
  borderRadius: 6,
  overflow: 'hidden',
},
form_input_type_33:{
  color: Colors.neutral,
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  flex: .9,
  paddingHorizontal: 10,
  paddingBottom: 14,
  paddingTop: 12.5,
  borderRadius: 6,
  overflow: 'hidden',
},

form_input_type_44:{
  color: Colors.neutral,
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  flex: .9,
  paddingHorizontal: 10,
  paddingBottom: 14,
  paddingTop: 12.5,
  borderRadius: 6,
  overflow: 'hidden',
  backgroundColor: '#E5E7EB'
},



dropdown4DropdownStylenew: {
  backgroundColor: Colors.white,
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 10,
  
},
dropdown4RowStylenew: {
  backgroundColor: Colors.white, 
  borderBottomColor: '#C5C5C5'
},
dropdown4RowTxtStylenew: {
    color: Colors.neutralgray,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    fontFamily: 'Faktum-Regular',
    textAlign: 'left'
},
deposittwo_main_middle_banknew:{
  paddingHorizontal: 0,
  height: '100%',
  backgroundColor: Colors.white,
  width: '100%',
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  paddingHorizontal: 2,
  paddingVertical: 14,
  overflow: 'hidden',
},
deposittwo_main_middle_bank_textnew:{
  color: Colors.neutralgray,
  fontSize: 16,
  lineHeight: 24,
  fontWeight: '400',
  fontFamily: 'Faktum-Regular',
  textAlign: 'left'
},
list: {
 width: '100%',
  marginTop:20,
  height: 300,
  marginLeft: -32
},
})