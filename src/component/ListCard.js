import React from 'react';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function ListCard({data}) {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  //   const data = ['#235', '#282828', '#eee', '#232323', '#255'];

  function Card(data) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ListChapter', {slug: data.slug, name: data.name})
        }
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: '#eee',
          //   height: (height / 4) * 3,
          //   width: width - 40,
          width: (width / 4) * 3,
          height: height / 2,
          marginHorizontal: 10,
          borderRadius: 12,
          padding: '10%',
          elevation: 10,
        }}>
        <View>
          <View>
            <Text
              style={{
                color: '#282828',
                fontSize: 36,
                fontWeight: '400',
                opacity: 0.5,
              }}>
              Sahih
            </Text>
            <Text
              style={{
                color: '#282828',
                fontSize: 40,
                fontWeight: 'bold',
                marginTop: -10,
              }}>
              {data.name}
            </Text>
          </View>

          <View style={{alignSelf: 'flex-start', padding: '1%'}}>
            <Text
              style={{
                // width: 'auto',
                color: '#fff',
                backgroundColor: '#3FBD82',
                paddingHorizontal: '5%',
                paddingVertical: '2%',
                // textAlign: 'center',
                borderRadius: 1000,
                fontWeight: '500',
                marginTop: '5%',
              }}>
              {/* Shahih */}
              Jumlah Hadist {data.total}
            </Text>
          </View>
        </View>

        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Image
            source={require('../images/quran.png')}
            style={{width: '50%', height: '60%', opacity: 0.2}}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      style={{
        height: height / 2 + 20,
        marginTop: 30,
        marginHorizontal: 20,
        marginBottom: 0,
      }}
      data={data}
      //   pagingEnabled
      keyExtractor={(item, index) => String(item.slug)}
      legacyImplementation={false}
      showsHorizontalScrollIndicator={false}
      // snapToOffsets={[Array(data.length).map((x,i)=> i * (width * 0.8-40) + (i-1) * 40)]}
      // snapToAlignment={'start'}
      // scrollEventThrottle={16}
      // decelerationRate={'fast'}
      horizontal
      renderItem={({item}) => Card(item)}
    />
  );
}
