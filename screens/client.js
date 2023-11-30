// client for combos

import axios from "axios";

const API = "https://td-node-server.onrender.com/api";


export const findAllCombos = async () => {
  const response = await axios.get(`${API}/combos`);
  return response.data;
};

export const createCombo = async (combo) => {
  try {
    const response = await axios.post(`${API}/createCombo`, combo);
    return response.data;

  } catch (err) {
    console.log(err);
  }
 
}

export const updateCombo = async (combo) => {
  const response = await axios.put(`${API}/combos/${combo._id}`, combo);
  console.log("hit updateCombo in client.js");
  return response.data;

}

export const findComboById = async (id) => {
  const response  = await axios.get(`${API}/combos/${id}`);
  return response.data;
}

export const deleteCombo = async (id) => {
  const response = await axios.delete(`${API}/delete/${id}`);
  return response.data;
}