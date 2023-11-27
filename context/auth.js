// you can have more than one "context"

import React, {useState, useEffect, createContext} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config"

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: ""
  });

  //configuring axios
  axios.defaults.baseURL = API;



  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      // grabbing data from AsyncStorage, remeber we saved the data with the key "@auth"
      let data = await AsyncStorage.getItem("@auth");
      // json to js object
      const as = JSON.parse(data);
      // updates the state with data 
      setState({...state, user: as.user, token: as.token});
    };
    loadFromAsyncStorage();

  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );

};


export {AuthContext, AuthProvider};