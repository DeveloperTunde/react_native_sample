import React, { Component, useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, StatusBar, ScrollView , TextInput, Pressable, Image, TouchableOpacity} from 'react-native';
import { LineChart } from "react-native-gifted-charts"

import { Colors } from '../../../constants/Colors';
import { Icon } from 'react-native-elements';
const {width, height} = Dimensions.get('window');

const StatsLineChart = (props) => {
const customDataPoint = () => {
    return (
        <View
        style={{
            width: 20,
            height: 20,
            backgroundColor: 'white',
            borderWidth: 4,
            borderRadius: 10,
            borderColor: '#07BAD1',
        }}
        />
    );
};
const customLabel = val => {
    return (
        <View style={{width: width/7.8, marginLeft: width/22}}>
            <Text style={{color: Colors.neutral, fontWeight: '400', fontFamily: 'Faktum-Medium', fontSize: 14,}}>{val}</Text>
        </View>
    );
};
const data = [
   
    {
        value: 120,
        hideDataPoint: true,
        labelComponent: () => customLabel('S'),
    },
    
    {
        value: 200,
        hideDataPoint: true,
        labelComponent: () => customLabel('M'),
    },
    {
        value: 250,
        hideDataPoint: true,
        labelComponent: () => customLabel('T'),
    },
    {
        value: 410,
        labelComponent: () => customLabel('W'),
        
        showStrip: true,
        stripHeight: height/6,
        stripWidth: 5,
        stripColor: '#22C55E',
        dataPointLabelComponent: () => {
        return (
            <View
            style={{
                backgroundColor: 'black',
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>410</Text>
            </View>
        );
        },
        dataPointLabelShiftY: -40,
        dataPointLabelShiftX: -0,
    },
    {
        value: 200,
        hideDataPoint: true,
        labelComponent: () => customLabel('T'),
    },
    {
        value: 230,
        hideDataPoint: true,
        labelComponent: () => customLabel('F'),
        
    },
    {
        value: 150,
        hideDataPoint: true,
        labelComponent: () => customLabel('S'),
    },
   
];
return (
    <View style={{
        marginTop: 25,
        
        backgroundColor: 'transparent',
        width: '100%',
        paddingTop: 10, 
        marginLeft: '-17%',
        paddingBottom: 0,
      }}>
        <LineChart
            isAnimated
            thickness={3}
            color="#385160"
            maxValue={800}
            noOfSections={3}
            areaChart
            yAxisTextStyle={{color:Colors.neutral }}
            xAxisTextStyle={{color:Colors.neutral }}
            data={props.chartData}
            curved
            startFillColor='rgba(0, 71, 81, 0.1)'
            endFillColor='rgba(196, 196, 196, 0)'
            startOpacity={0.4}
            endOpacity={0.4}
            spacing={width/7.05}
            backgroundColor="transparent"
            initialSpacing={42}
            yAxisColor= 'transparent'
            xAxisColor= 'transparent'
            dataPointsHeight={20}
            dataPointsWidth={20}
            hideRules
            height={height/5}
            width={width/1}
            
        />
    </View>
    );
};


const styles = StyleSheet.create({
    bar_wrapper:{
        paddingTop: height/15, 
        marginLeft: '30%',
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
    }
})



export default StatsLineChart