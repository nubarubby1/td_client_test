import React, { useState, useContext } from 'react';

// TouchableOpacity is for ui Button
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Text from '@kaloraat/react-native-text';
import UserInput from '../components/auth/Userinput';
import SubmitButton from '../components/auth/SubmitButton';

import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
//CUSTOM
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// CUSTOM NAVIGATION LIBRARY

//custom local tunnel url
import { API } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';

// WE ARE IMPORTING A CUSTOM TEXT COMPONENT FROM KALORAAT

// value and setValue are from reactHooks
// autoCapitalize -> look up on react native text input

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //context
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert('All fields are required');
      setLoading(false);
      return;
    }
    //console.log('Signin Request =>', name, email, password);
    try {
      // making a request to a local server endpoint
      // axios baseURL already set in context/auth.js
      const { data } = await axios.post(`/signin`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {

        //saving in context
        setState(data);

        //save response in async storage(needs to be in json format)
        // setItem (key, value)
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        
        setLoading(false);
        console.log('Sign In Success =>', data);
        alert('Sign in successful');

        //redirect to home screen
        navigation.navigate("Home");
      }
    } catch (err) {
      alert('Signin failed');
      console.log(err);
      setLoading(false);
    }
  };

  //remove later
  // const loadFromAsyncStorage = async() => {
  //   let data = await AsyncStorage.getItem("@auth");
  //   console.log("from async storage :", data);
  // }
  // loadFromAsyncStorage();


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />

        <Text title center>
          Sign In
        </Text>

        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SubmitButton
          title="Sign In"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Text small center>
          {' '}
          Don't have an account?
          <Text onPress={() => navigation.navigate('Signup')} color="#ff2222">
            Sign Up
          </Text>
        </Text>

        
      </View>

      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
