import React from "react";
import { SafeAreaView, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import FooterTabs from "../components/nav/FooterTabs";

export default function History() {
  return (
    <SafeAreaView style = {{flex: 1}}>
      <Text>
        History Screen
      </Text>
      <View style = {{flex: 1, justifyContent: 'flex-end'}}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}