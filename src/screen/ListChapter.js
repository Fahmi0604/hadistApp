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

export default function ListChapter({route}) {
  // const totalData = [...Array(route.params.).keys()]
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();

  const [totalData, setTotalData] = useState([]);
  const [rangeData, setRangeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastRead, setLastRead] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://hadis-api-id.vercel.app/hadith/${route.params.slug}?page=1&limit=50`,
      )
      .then(
        res => {
          // console.log(res.data);

          // total pages
          setTotalData([...Array(res.data.pagination?.totalPages).keys()]);

          // total items
          const totalItems = res.data.pagination?.totalItems;
          setRangeData(sliceIntoChunks([...Array(totalItems).keys()], 50));
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

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  function listItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          renderLastRead();
          navigation.navigate('ListHadits', {
            slug: route.params.slug,
            chapterNumber: item + 1,
          });
        }}>
        <View
          style={{
            backgroundColor: '#eee',
            marginBottom: 10,
            padding: '10%',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <Text style={{color: '#282828'}}>Bab {item + 1}</Text> */}
          <Text style={{color: '#282828'}}>
            Hadist no {rangeData[item][0] + 1} sampai{' '}
            {rangeData[item][rangeData[item].length - 1] + 1}
          </Text>

          {/* badge last read */}
          <View style={{alignSelf: 'flex-start', padding: '1%'}}>
            {lastRead &&
              lastRead.chapterNumber === item &&
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
        Imam {route.params.name}
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
          data={totalData}
          // pagingEnabled
          keyExtractor={item => String(item)}
          // legacyImplementation={false}
          renderItem={({item}) => listItem(item)}
        />
      )}
    </View>
  );
}
