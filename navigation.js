import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from "./context/auth";


import ScreensNav from './components/nav/ScreensNav';

/* NOTES

React components wrap exisitng native code and interact with native APIs
some of these components used in App.js are <Text> <View>


*/

export default function RootNavigation() {
  const names = ['kayla', 'kevin', 'joe'];

  // // name is from props.name
  // return (
  //   //<WebView source= {{uri: "https://codecontinue.com"}} />
  //   <View style={styles.container}>
  //     <StatusBar style="dark" />

  //     {names.map((name) => (
  //       <Welcome key={name} name={name} />
  //     ))}
  //   </View>
  // );

  return (
    // initialRouteName = default name on header
    <NavigationContainer>
      <AuthProvider>
        <ScreensNav />
      </AuthProvider>
    </NavigationContainer>
  );
}

