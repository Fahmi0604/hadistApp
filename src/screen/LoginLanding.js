import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Header from '../component/Header';
import {useNavigation} from '@react-navigation/native';

const LoginLanding = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor: '#f7f6fd'}}>
      <View style={{flex: 1, backgroundColor: '#f7f6fd'}}>
        <Header />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#373248',
              textAlign: 'center',
            }}>
            Hadist App
          </Text>
          <Text style={{textAlign: 'center'}}>Aplikasi kumpulan hadist</Text>
          <Text
            style={{marginTop: 20, textAlign: 'center', marginHorizontal: 50}}>
            Semoga dengan belajar tentang sunnah-sunnah rosul, menjadikan kita
            lebih baik lagi
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            backgroundColor: '#e8edf5',
            marginHorizontal: 20,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: '#ffffff',
            elevation: 1,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              paddingVertical: 20,
              borderRadius: 15,
            }}>
            <Text style={{fontWeight: 'bold'}}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f1f3ff',
              paddingVertical: 20,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
            }}
            // onPress={() => navigation.navigate('Login')}
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={{fontWeight: 'bold'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginLanding;
