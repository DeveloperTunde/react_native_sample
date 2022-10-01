import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';
const {width, height} = Dimensions.get('window');
import { BaseUrl } from '../../../constants/BaseUrl';
import { useSelector, useDispatch } from 'react-redux'

        
const StatsBarChart = (props) => {

    const {isLoggedIn, isActive, userJwt, withdrawalamount} = useSelector(state => state.userReducer);
   


    





    // const barData = [
    //     {value: 300, label: 'S'},
    //     {value: 745, label: 'M'},
    //     {value: 500, label: 'T', },
    //     {value: 300, label: 'W', frontColor: Colors.green, topLabelComponent: () => (
    //         <View style={styles.figure_wrapper}>
    //             <View style={styles.figure_wrapper_top}>
    //                <Text style={styles.figure_wrapper_top_text}>$140.32</Text>
    //             </View>
    //             <View style={styles.figure_wrapper_middle}>

    //             </View>
    //             <Icon
    //                 name='circle'
    //                 type='font-awesome'
    //                 color={Colors.button}
    //                 size={12}
    //                 style={styles.site_header_icon}
    //                 />
    //         </View>
    //       ),},
    //     {value: 800, label: 'T' },
    //     {value: 600, label: 'F' },
    //     {value: 256, label: 'S' },
        
    // ];
    return (
        <View style={styles.bar_wrapper}>
            <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={25}
                frontColor="rgba(0, 71, 81, 0.12);"
                data={props.chartData}
                yAxisThickness={0}
                xAxisThickness={0}
               
                spacing={width/16}
                initialSpacing={42}
                hideRules
                height={height/7}
                labelTextStyle={styles.bar_labelTextStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
})

export default StatsBarChart

