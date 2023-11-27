import React, {useContext} from "react";
import {View, TouchableOpacity, SafeAreaView} from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../../context/auth";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderTabs = () => {
  const [state, setState] = useContext(AuthContext);

  // removes the user from the async Storage so we can switch
  // DOES NOT REMOVE FROM DATABASE
  const signOut = async () => {
    setState({ token: "", user: null });
    // removes data stored under the key "@auth"
    await AsyncStorage.removeItem("@auth");
  };

  return (
    <SafeAreaView>
      {/* calls signOut when we press the font-awesome-Button */}
      <TouchableOpacity onPress={signOut}>
        <FontAwesome5 name="sign-out-alt" size={30} color="#ff00ff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderTabs;