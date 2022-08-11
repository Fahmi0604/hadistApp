import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListHadits({route}) {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastRead, setLastRead] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://hadis-api-id.vercel.app/hadith/${route.params.slug}?page=${route.params.chapterNumber}&limit=50`,
      )
      .then(
        res => {
          //   console.log(res.data);

          setData(res.data);
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
  }, []);

  function renderLastRead() {
    AsyncStorage.getItem('@lastread', (err, result) =>
      setLastRead(JSON.parse(result)),
    );
  }

  useEffect(() => {
    console.log(lastRead);
  }, [lastRead]);

  function listItem(item, index) {
    return (
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.setItem(
            '@lastread',
            JSON.stringify({
              chapterNumber: route.params.chapterNumber - 1,
              haditsNumber: index,
              slug: route.params.slug,
              name: data?.name,
            }),
          );
          renderLastRead();
          navigation.navigate('DetailHadits', {
            slug: route.params.slug,
            haditsNumber: index + 1,
          });
        }}
        style={{}}>
        <View
          style={{
            // width: width / 2,
            // height: width / 2,
            backgroundColor: '#eee',
            marginBottom: 10,
            padding: '10%',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <Text style={{color: '#282828'}}>Bab {item + 1}</Text> */}
          <Text
            style={{
              color: '#282828',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Hadits No.{item?.number}
          </Text>

          {/* badge last read */}
          <View style={{alignSelf: 'flex-start', padding: '1%'}}>
            {lastRead &&
              lastRead.chapterNumber === route.params.chapterNumber - 1 &&
              lastRead.haditsNumber === index &&
              lastRead.slug === route.params.slug && (
                <Icon size={30} color="#3FBD82" name="tag" />
              )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    // <Text>{route.params.slug}</Text>
    <View style={{backgroundColor: '#f7f6fd', paddingHorizontal: 20}}>
      <Text
        style={{
          color: '#282828',
          fontSize: 20,
          fontWeight: '600',
          marginTop: 0,
        }}>
        Imam {data?.name}
      </Text>

      {loading && (
        <View
          style={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator animating={true} color={'#282828'} size="large" />
        </View>
      )}

      {!loading && (
        <FlatList
          style={{marginTop: 20, marginBottom: 60}}
          data={data?.items}
          // pagingEnabled
          keyExtractor={(item, index) => String(item + index)}
          // legacyImplementation={false}
          renderItem={({item, index}) => listItem(item, index)}
        />
      )}
    </View>
  );
}
