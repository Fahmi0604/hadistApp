import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Login() {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Login</Text>

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
            backgroundColor: '#f1f3ff',
            paddingVertical: 20,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}
          onPress={() => navigation.goBack()}
          >
          <Text style={{fontWeight: 'bold', color: '#282828'}}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
