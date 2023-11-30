import React, { useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/Userinput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios"; //http
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { API } from "../config";


//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from "../context/auth";

// WE ARE IMPORTING A CUSTOM TEXT COMPONENT FROM KALORAAT

// value and setValue are from reactHooks
// autoCapitalize -> look up on react native text input

const Signup = ({navigation}) => {
  const [username, setName] = useState('Kevin');
  const [email, setEmail] = useState('k@gmail.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  //context
  const [state, setState] = useContext(AuthContext);

  //console.log("Navigation: ", navigation);

  const handleSubmit = async () => {
    setLoading(true);
    if (!username || !email || !password) {
      alert('All fields are required');
      setLoading(false);
      return;
    }
    console.log('Signup Request =>', username, email, password);

   
    try {
      // making a request to a local server
      const { data } = await axios.post(`${API}/signup`, {
        username,
        email,
        password,
      });

   
      
      if(data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        //save data
        setState(data);

        //saving in Async Storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setLoading(false);
        console.log('Sign Up Success =>', data);
        alert('Sign up successful');

        //redirecting to home
        navigation.navigate("Signin");
      }


    } catch (err) {
      alert("Signup failed. Try again");
      console.log(err);

      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View style={{marginVertical: 100}}>
        <CircleLogo />

        <Text title center>
          Sign Up
        </Text>

        <UserInput
          username="NAME"
          value={username}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <UserInput
          username="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          username="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SubmitButton
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {/* navigates to signin screen if you clicked already joined*/}
        <Text small center>Already Joined?
          <Text onPress={() => navigation.navigate("Signin")}color="#ff2222">
            Sign In</Text>
        </Text>

      </View>

      {/* <Text>{JSON.stringify({ username, email, password }, null, 4)}</Text> */}
    </KeyboardAwareScrollView>
  );
};

export default Signup;
