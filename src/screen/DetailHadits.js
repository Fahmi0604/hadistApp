import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions,
  Share,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailHadits({navigation, route}) {
  const {width, height} = Dimensions.get('window');
  const [detailHadits, setDetailHadits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveHadits, setSaveHadits] = useState([]);

  // add button share
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onShare()}>
          <Icon name="share-alt" size={24} color={'#282828'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  //   React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerRight: () => (
  //         <Icon
  //           onPress={() => onShare()}
  //           name="share-alt"
  //           size={24}
  //           color={'#282828'}
  //         />
  //       ),
  //     });
  //   }, [navigation]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://hadis-api-id.vercel.app/hadith/${route.params.slug}/${route.params.haditsNumber}`,
      )
      .then(
        res => {
          console.log(res.data);
          setDetailHadits(res.data);
          setLoading(false);
        },
        error => {
          console.log(error);
          setLoading(false);
        },
      );

    AsyncStorage.getItem('@saveHadits', (err, result) =>
      setSaveHadits(JSON.parse(result)),
    );
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${detailHadits?.arab} \n\n ${detailHadits?.id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const saveItems = value => {
    AsyncStorage.getItem('@saveHadits', (err, result) => {
      const data = result && JSON.parse(result);

      if (data) {
        if (
          data.some(
            (s, i) =>
              s.haditsNumber === value?.haditsNumber && s.slug === value?.slug,
          )
        ) {
          let filtered = data.filter(
            f =>
              f.haditsNumber !== value?.haditsNumber && f.slug !== value?.slug,
          );
          AsyncStorage.setItem('@saveHadits', JSON.stringify(filtered));
        } else {
          AsyncStorage.setItem(
            '@saveHadits',
            JSON.stringify([
              ...data,
              {
                haditsNumber: value?.number,
                slug: value?.slug,
                name: value?.name,
              },
            ]),
          );
        }
      } else {
        AsyncStorage.setItem(
          '@saveHadits',
          JSON.stringify([
            {
              haditsNumber: value?.number,
              slug: value?.slug,
              name: value?.name,
            },
          ]),
        );
      }
    });
  };

  return (
    <ScrollView style={{backgroundColor: '#f7f6fd', paddingHorizontal: 20}}>
      {loading && (
        <View
          style={{
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator animating={true} color={'#282828'} size="large" />
        </View>
      )}

      {!loading && (
        <View style={{flexDirection: 'column', marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#282828',
                fontSize: 17,
                fontWeight: '600',
              }}>
              Hadits No.{' '}
              <Text style={{color: 'gray'}}>{detailHadits?.number}</Text>
            </Text>

            <TouchableOpacity onPress={() => saveItems(detailHadits)}>
              {saveHadits &&
              saveHadits?.haditsNumber === detailHadits?.haditsNumber &&
              saveHadits?.slug === detailHadits?.slug ? (
                <Icon size={28} name="bookmark" color={'#3FBD82'} />
              ) : (
                <Icon size={28} name="bookmark-o" color={'#282828'} />
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#3FBD82',
              fontSize: 20,
              fontWeight: '600',
              marginTop: 5,
            }}>
            Sahih {detailHadits.name}
          </Text>

          <Text
            style={{
              color: '#282828',
              fontSize: 24,
              //   textAlign: 'justify',
              lineHeight: 40,
              marginVertical: 25,
            }}>
            {detailHadits?.arab}
          </Text>

          <Text
            style={{
              color: '#282828',
              fontSize: 18,
              lineHeight: 30,
              textAlign: 'justify',
            }}>
            {detailHadits?.id}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
