import React from 'react'
import {View, StatusBar, Image, useWindowDimensions} from 'react-native'

export default function Header() {
    const {width, height} = useWindowDimensions();
    return (
        <View>
            <StatusBar backgroundColor={'#f7f6fd'} barStyle="dark-content" />
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                <Image
                    source={require('../images/user.png')}
                    style={{ width: width - 40, height: width - 40 }}
                />
            </View>
        </View>
    )
}
