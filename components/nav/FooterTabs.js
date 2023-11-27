import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '@kaloraat/react-native-text';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider } from 'react-native-elements';

export const Tab = ({ text, name, handlePress, screenName, routeName }) => {
// shows the active color on the corresponding footerTabs icon depending on which screen we're on!
const activeScreenColor = screenName === routeName && "orange";

  return (
    <TouchableOpacity>
      <>
        <FontAwesome5
          name={name}
          size={25}
          style={{ marginBottom: 2, alignSelf: 'center' }}
          onPress={handlePress}
          color={activeScreenColor}
        />
        <Text>{text}</Text>
      </>
    </TouchableOpacity>
  );
}

export default function FooterTabs() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('Route is', route);

  return (
    <>
      <Divider width={1} />

      {/* spreading out the tabs horiztonally */}
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          marginHorizontal: 30,
          justifyContent: 'space-between',
        }}
      >
        <Tab
          text="home"
          name="home"
          handlePress={() => navigation.navigate('Home')}
          screenName="Home"
          routeName={route.name}
        />
        <Tab
          text="history"
          name="history"
          handlePress={() => navigation.navigate('History')}
          screenName="History"
          routeName={route.name}
        />
        <Tab
          text="characters"
          name="users"
          handlePress={() => navigation.navigate('Characters')}
          screenName="Characters"
          routeName={route.name}
        />
        <Tab
          text="account"
          name="user"
          handlePress={() => navigation.navigate('Account')}
          screenName="Account"
          routeName={route.name}
        />
      </View>
    </>
  );
}
