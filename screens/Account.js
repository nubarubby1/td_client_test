import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Text from '@kaloraat/react-native-text';

import CircleLogo from '../components/auth/CircleLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthContext } from '../context/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import FooterTabs from '../components/nav/FooterTabs';

import UserInput from '../components/auth/Userinput';
import SubmitButton from '../components/auth/SubmitButton';

const Account = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  // context
  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, [state]);

  const handleSubmit = async () => {
    // removes the user from the async Storage so we can switch
    // DOES NOT REMOVE FROM DATABASE
    setState({ token: "", user: null });
    // removes data stored under the key "@auth"
    await AsyncStorage.removeItem("@auth");
  
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100}}>
      <View style={{ }}>
        <CircleLogo />
        <Text title center style={{ paddingBottom: 10 }}>
          {name}
        </Text>
        <Text medium center style={{ paddingBottom: 10 }}>
          {email}
        </Text>
        <Text small center light style={{ paddingBottom: 50 }}>
          {role}
        </Text>
      </View>

      <View style={{ }}>
        <SubmitButton
          title="Logout"
          handleSubmit={handleSubmit}
          //loading={loading}
        />
      </View>

     
    </SafeAreaView>
  );
};

export default Account;
