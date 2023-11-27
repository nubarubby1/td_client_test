import React, {useContext} from "react"; //useContext Hook
import { SafeAreaView, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../context/auth";

import FooterTabs from "../components/nav/FooterTabs";

const Home = () => {

const [state, setState] = useContext(AuthContext);

  return (
    //putting footer tabs at the bottom, space-between puts the tabs at the bottom
    <SafeAreaView style = {{flex: 1}}>
      <Text title center light>
        Home
      </Text>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <View style = {{flex: 1, justifyContent: 'flex-end'}}>
        <FooterTabs />
      </View>
    </SafeAreaView>



  );


}

export default Home;