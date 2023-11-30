import React, { useState, useContext, useEffect } from 'react'; //useContext Hook
import { SafeAreaView, View, TextInput, Button, Picker } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import FooterTabs from '../components/nav/FooterTabs';

import * as client from './client';

function Home() {
  const [combos, setCombos] = useState([]);

  const [combo, setCombo] = useState({ name: '', difficulty: '', combo: [''] });

  // displaying all combos
  const fetchCombos = async () => {
    // signin bug
    await AsyncStorage.removeItem('@auth');
    const combos = await client.findAllCombos();
    setCombos(combos);
  };

  const createCombo = async () => {
    combo.difficulty = combo.difficulty.trim();
    combo.name = combo.name.trim();

    if (
      (combo.difficulty === 'Easy' ||
        combo.difficulty === 'Normal' ||
        combo.difficulty === 'Hard') &&
      combo.name &&
      combo
    ) {
      try {
        combo.combo = combo.combo.map((str) => str.toUpperCase());
        const newCombo1 = {
          name: combo.name,
          difficulty: combo.difficulty,
          combo: combo.combo,
        };
        console.log(newCombo1);

        const newCombo = await client.createCombo(newCombo1);
        setCombos([newCombo, ...combos]);
      } catch (err) {
        alert("can't create this combo");
        console.log(err);
      }
    } else {
      alert('Difficulty must be Easy, Normal, or Hard');
    }
  };

  // select a combo and display it in the editor
  const selectCombo = async (combo) => {
    try {
      const c = await client.findComboById(combo._id);
      setCombo(c);
      // setCombo({ name: c.name, difficulty: c.difficulty, combo: c.combo });
    } catch (err) {
      console.log(err);
    }
  };

  const updateCombo = async () => {
    try {
      combo.combo = combo.combo.map((str) => str.toUpperCase());
      const status = await client.updateCombo(combo);

      // updates the updated combo in combos array
      setCombos(combos.map((c) => (c._id === combo._id ? combo : c)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCombo = async (combo) => {
    try {
      await client.deleteCombo(combo._id);
      setCombos(combos.filter((c) => c._id !== combo._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1.5,
      padding: 16,
      paddingTop: 30,
      backgroundColor: '#fff',
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    headText: { margin: 6, textAlign: 'center', fontWeight: 'bold' }, // textStyle for header row
    text: { margin: 6, textAlign: 'center' }, // textStyle for data rows
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    title: { fontSize: 24, marginBottom: 8, color: 'blue' },
  });

  return (
    //putting footer tabs at the bottom, space-between puts the tabs at the bottom
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Combo lists</Text>
        <ScrollView>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={['name', 'difficulty', 'combos']}
              style={styles.head}
              textStyle={styles.headText}
            />
            {combos.map((combo, index) => (
              <Row
                key={index}
                data={[
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{combo.name}</Text>

                    <TouchableOpacity
                      onPress={() => selectCombo(combo)}
                      style={{ marginBottom: 10 }}
                    >
                      <Ionicons name="create" size={30} color="blue" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => deleteCombo(combo)}
                      style={{ marginBottom: 10 }}
                    >
                      <Ionicons name="trash-bin" size={30} color="red" />
                    </TouchableOpacity>
                  </View>,
                  combo.difficulty,
                  combo.combo.join(', '),
                ]}
                style={styles.row}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </ScrollView>
      </View>

      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Combo editor</Text>
          <TouchableOpacity onPress={createCombo}>
            <Ionicons
              name="ios-add-circle"
              size={30}
              color="green"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={updateCombo} style={{ marginBottom: 10 }}>
            <Ionicons name="checkmark-circle" size={30} color="green" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Text>Name</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => setCombo({ ...combo, name: text })}
            value={combo.name}
          />
          <Text>Difficulty</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => setCombo({ ...combo, difficulty: text })}
            value={combo.difficulty}
          />
          <Text>Combo- separate moves by commas</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) =>
              setCombo({ ...combo, combo: text.split(', ') })
            }
            value={combo.combo.join(', ')}
          />
        </ScrollView>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}

export default Home;
