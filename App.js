import React from "react"
import RootNavigation from "./navigation";


/* NOTES

React components wrap exisitng native code and interact with native APIs
some of these components used in App.js are <Text> <View>


*/


export default function App() {
  const names = ['bob', 'kevin', 'joe'];

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
    <RootNavigation />
  );
}

