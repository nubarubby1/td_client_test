import React from 'react';

import { View, Image } from 'react-native';

const CircleLogo = () => (
  <View
    style = {{
      justifyContent: "center",
      alignItems: "center"
    }}
  
    >
    <Image source={require('../../assets/icon.png')}
           style = {{width: 300, height: 300, marginBottom: 30}}  />
  </View>
);

export default CircleLogo;
