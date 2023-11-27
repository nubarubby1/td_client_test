import React, { useContext } from 'react';
import Signup from '../../screens/Signup';
import SignIn from '../../screens/SignIn';

//custom navigation from https://reactnavigation.org/docs/navigating
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from '../../screens/Home';
import { AuthContext } from '../../context/auth';
import HeaderTabs from './HeaderTabs';
import Account from '../../screens/Account';
import History from '../../screens/History';
import Characters from '../../screens/Chars';

/* NOTES

React components wrap exisitng native code and interact with native APIs
some of these components used in App.js are <Text> <View>


*/

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  
  const [state, setState] = useContext(AuthContext);

  

  // checking to see if we have a user
  const authenticated = state && state.token != '' && state.user != null;
  // const authenticated = true;
  console.log("Authenticated =>", authenticated);

  return (
    // initialRouteName = default screen
    // signin will show initially b/c no user is authenticated yet
    <Stack.Navigator
      initialRouteName="Home"
      // screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Welcome to The Dojo",
            // shows the header component at the right side
            headerRight: () => <HeaderTabs />,
          }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            title: "My Account",
            headerBackTitle: "Back"
           
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            title: "History",
            headerBackTitle: "Back"
           
          }}
        />
        <Stack.Screen
          name="Characters"
          component={Characters}
          options={{
            title: "Characters",
            headerBackTitle: "Back"
           
          }}
        />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

/*
flexbox w/ 
'flex-start', 'flex-end'

*/

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: `#add8e6`,
//     alignItems: 'center', // default is left, flex-end is right
//     justifyContent: 'center', // flex-start, flex-end
//   },
// });
