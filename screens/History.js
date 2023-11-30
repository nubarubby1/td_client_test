import React, {useState} from "react";
import { SafeAreaView, View } from "react-native";
import { TextInput, Button, Text } from 'react-native';
import FooterTabs from "../components/nav/FooterTabs";

export default function History() {

  const [stringArray, setStringArray] = useState([]);

  const addString = () => {
    setStringArray([...stringArray, '']);
  };

  const handleStringChange = (text, index) => {
    const newArray = [...stringArray];
    newArray[index] = text;
    setStringArray(newArray);
  };

  const removeString = (index) => {
    const newArray = [...stringArray];
    newArray.splice(index, 1);
    setStringArray(newArray);
  };


  return (
    <SafeAreaView style = {{flex: 1}}>
      <Text>
        History Screen
      </Text>

    

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Add String" onPress={addString} />
      {stringArray.map((text, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', padding: 5, flex: 1 }}
            value={text}
            onChangeText={(newText) => handleStringChange(newText, index)}
          />
          <Button title="Remove" onPress={() => removeString(index)} />
        </View>
      ))}
      <Text>Current Strings:</Text>
      {stringArray.map((text, index) => (
        <Text key={index}>{text}</Text>
      ))}
    </View>



      <View style = {{flex: 1, justifyContent: 'flex-end'}}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}