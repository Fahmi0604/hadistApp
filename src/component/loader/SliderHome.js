import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import {View, Dimensions} from 'react-native';

const SliderHome = props => {
  const {width, height} = Dimensions.get('window');

  return (
    <ContentLoader
      speed={2}
      // width={400}
      // height={460}
      height={((height / 4) * 3) + 20}
      width={width - 40}
      // viewBox="0 0 400 460"
      backgroundColor="#eee"
      // foregroundColor="#ecebeb"
      foregroundColor="#d9d9d9"
      style={{alignItems: 'flex-start', marginHorizontal: 20, marginTop: 30}}
      {...props}>
      {/* <Circle cx="31" cy="31" r="15" />  */}
      {/* <Rect x="58" y="18" rx="2" ry="2" width="140" height="10" />  */}
      {/* <Rect x="58" y="34" rx="2" ry="2" width="140" height="10" />  */}
      <Rect
        x="0"
        y="0"
        rx="2"
        ry="2"
        height='95%'
        width='100%'
      />
    </ContentLoader>
  );
};

export default SliderHome;
