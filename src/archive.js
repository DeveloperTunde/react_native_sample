import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import styles from '../styles';
import { Colors } from '../../constants/Colors';
import AuthHeader from '../components/AuthHeader';

const RegisterOne = ({navigation}) => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={Colors.primary} />
            <AuthHeader goback={()=> navigation.goBack()}/>
        </SafeAreaView>
    );
};


export default RegisterOne;
