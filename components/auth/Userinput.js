import React from 'react';

import { View, TextInput } from 'react-native';

import Text from '@kaloraat/react-native-text';

// WE ARE IMPORTING A CUSTOM TEXT COMPONENT FROM KALORAAT

// marginHorizontal puts space left and right

const UserInput = ({name, value, setValue, autoCapitalize = "none", keyboardType = "default", secureTextEntry = false}) => {
  return (
    <View style={{ marginHoHorizontal: 24 }}>
      <Text semi color="#0066ff">
        {name}
      </Text>
      <TextInput
        autoCorrect = {false}
        autoCapitalize= {autoCapitalize}
        keyboardType = {keyboardType}
        secureTextEntry = {secureTextEntry}
        style={{
          borderBottomWidth: 0.5,
          height: 28,
          borderBottomColor: '#8e93a1',
          marginBottom: 50,
        }}
        // sets the value for name, email, password
        value = {value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

export default UserInput;
