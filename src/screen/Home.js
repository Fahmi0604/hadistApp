import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Header from '../component/Header';
import {useNavigation} from '@react-navigation/native';
import ListCard from '../component/ListCard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SliderHome from '../component/loader/SliderHome';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  const [dataHadits, setDataHadits] = useState();
  const [loading, setLoading] = useState(false);
  const [lastRead, setLastRead] = useState();

  useEffect(() => {
    getApi();
  }, []);

  const getApi = () => {
    setLoading(true);
    axios.get('https://hadis-api-id.vercel.app/hadith').then(
      res => {
        setDataHadits(res.data);
        setLoading(false);
      },
      error => {
        console.log(error);
        setLoading(false);
      },
    );

    AsyncStorage.getItem('@lastread', (err, result) =>
      setLastRead(JSON.parse(result)),
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getApi} />
      }
      style={{backgroundColor: '#f7f6fd'}}>
      <View style={{flex: 1, backgroundColor: '#f7f6fd'}}>
        <StatusBar backgroundColor={'#f7f6fd'} barStyle="dark-content" />

        {/* header */}
        <View style={{flex: 1, marginHorizontal: 20, marginTop: 40}}>
          <Text style={{fontSize: 18, color: '#282828', fontWeight: '500'}}>
            Welcome To
          </Text>
          <Text style={{fontSize: 36, color: '#282828', fontWeight: 'bold'}}>
            Hadist App
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'gray',
              fontWeight: '300',
              marginTop: 0,
            }}>
            Cari Hadist-Hadist Rosul dengan gampang
          </Text>
        </View>

        {loading && <SliderHome />}

        <View style={{marginHorizontal: 20, marginTop: 50, marginBottom: 0}}>
          <TouchableOpacity
            onPress={() =>
              lastRead &&
              navigation.navigate('ListHadits', {
                slug: lastRead?.slug,
                chapterNumber: lastRead?.chapterNumber + 1,
              })
            }
            style={{
              flex: 1,
              justifyContent: 'space-between',
              backgroundColor: '#3FBD82',
              borderRadius: 12,
              padding: '5%',
              elevation: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Icon name="tag" color={'white'} size={20} />
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  marginLeft: 10,
                }}>
                {lastRead
                  ? `Hadits ${lastRead?.name} - No.${
                      lastRead?.haditsNumber + 1
                    }`
                  : '-'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {!loading && <ListCard data={dataHadits} />}

        {/* <ScrollView scrollEventThrottle={16}>
          <View style={{flex: 1, backgroundColor: 'white', paddingTop: 20}}>
            <Text style={{fontSize:24, fontWeight: '700', paddingHorizontal: 20}}>What can we help ?</Text>
          </View>

          <View style={{height: 130, marginTop: 20}}>
            <ScrollView horizontal={true}>
                <View style={{height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#282828'}}>
                        <View style={{ flex: 2}}>
                            <Image source={{uri: 'https://cdn.dribbble.com/users/5861994/screenshots/18468903/media/5e72762895eef3e8d4d3983e7fc5cb23.jpg?compress=1&resize=1600x1200&vertical=top'}} 
                            style={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                        </View>
                        <View style={{flex: 1, paddingLeft: 10, paddingTop: 1}}>
                            <Text>Test</Text>
                        </View>
                </View>
                <View style={{height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#282828'}}>
                        <View style={{ flex: 2}}>
                            <Image source={{uri: 'https://cdn.dribbble.com/users/5861994/screenshots/18468903/media/5e72762895eef3e8d4d3983e7fc5cb23.jpg?compress=1&resize=1600x1200&vertical=top'}} 
                            style={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                        </View>
                        <View style={{flex: 1, paddingLeft: 10, paddingTop: 1}}>
                            <Text>Test</Text>
                        </View>
                </View>
                <View style={{height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#282828'}}>
                        <View style={{ flex: 2}}>
                            <Image source={{uri: 'https://cdn.dribbble.com/users/5861994/screenshots/18468903/media/5e72762895eef3e8d4d3983e7fc5cb23.jpg?compress=1&resize=1600x1200&vertical=top'}} 
                            style={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                        </View>
                        <View style={{flex: 1, paddingLeft: 10, paddingTop: 1}}>
                            <Text>Test</Text>
                        </View>
                </View>
                <View style={{height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#282828'}}>
                        <View style={{ flex: 2}}>
                            <Image source={{uri: 'https://cdn.dribbble.com/users/5861994/screenshots/18468903/media/5e72762895eef3e8d4d3983e7fc5cb23.jpg?compress=1&resize=1600x1200&vertical=top'}} 
                            style={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                        </View>
                        <View style={{flex: 1, paddingLeft: 10, paddingTop: 1}}>
                            <Text>Test</Text>
                        </View>
                </View>
            </ScrollView>
          </View>
        </ScrollView> */}

        {/* <View
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
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Home;
