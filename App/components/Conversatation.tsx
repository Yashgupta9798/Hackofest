import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Markdown from 'react-native-markdown-display';

export default function Conversatation() {
  const [user, setUser] = useState<Array<string>>([]);
  const [model, setModel] = useState<Array<string>>([]);
  const [improved, setImproved] = useState<Array<string>>([
    'Improvement 1',
    'This is a description of the first improvement.',
    '2023-01-01',
    // Add more improved objects as needed
  ]);
  // const DUMMY_DATA = [[[{id: 'e1',data: 'Toilet Paper',},[{id: 'e2',data: 'New TV'}],[{id: 'e3',data: 'Car Insurance',}]],[[{id: 'e1',data: 'Toilet Paper',},[{id: 'e2',data: 'New TV'}],[{id: 'e3',data: 'Car Insurance',}]]];

  const dummyData = {
    success: true,
    message: 'Dummy data generated successfully',
    user: [
      'John Doe',
      'john.doe@.com',
      '12345',

      // Add more user objects as needed
    ],
    model: [
      '*Model A*',
      '2020',
      'Manufacturer A',
      // Add more model objects as needed
      ,
    ],
    improved: [
      'Improvement 1',
      'This is a description of the first improvement.',
      '2023-01-01',
      // Add more improved objects as needed
      ,
    ],
  };

  console.log(dummyData);
  async function getData() {
    // const arr1 = dummyData.user;
    // const arr2 = dummyData.model;
    // const arr3 = dummyData.improved;
    // const arr1 = data.sucess.user;
    // const arr2 = data.sucess.model;
    // const arr3 = data.sucess.improved;

    // let count = 0;
    // let count2 = 0;
    // const len = arr1.length;
    // while (count2 < len) {
    //   return (
    //     <View style={styles.convo}>
    //       <Text style={styles.userText}>{arr1[count]}</Text>
    //       <View style={styles.modelReply}>
    //         <Markdown style={styles.modelText}>{arr2[count]}</Markdown>
    //         <Markdown style={styles.modelOptimizedText}>{arr3[count]}</Markdown>
    //       </View>
    //     </View>
    //   );
    //   count++;
    //   count2++;
    // }
    axios
      .get('http://10.1.12.238:3000/conversations')
      .then(response => {
        console.log(response.data); // Actual data sent by the server
        const data = response.data;

        if (data.sucess == 'true') {
          // const arr1 = dummyData.user;
          // const arr2 = dummyData.model;
          // const arr3 = dummyData.improved;
          const arr1 = data.sucess.user;
          const arr2 = data.sucess.model;
          const arr3 = data.sucess.improved;

          let count = 0;
          let count2 = 0;
          const len = arr1.length;
          while (count2 < len) {
            return (
              <View style={styles.convo}>
                <Text style={styles.userText}>{arr1[count]}</Text>
                <View style={styles.modelReply}>
                  <Markdown style={styles.modelText}>{arr2[count]}</Markdown>
                  <Markdown style={styles.modelOptimizedText}>
                    {arr3[count]}
                  </Markdown>
                </View>
              </View>
            );
            count++;
            count2++;
          }
        }
      })
      .catch(error => {
        console.error('Error fetching data: ', error.message);
      });
      
  }

  // ***
  return (
    <View style={styles.container2}>
      <Text>Conversatation</Text>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={{
              uri: 'https://assets.digital.cabinet-office.gov.uk/media/55ba1211ed915d155c000017/sign-giving-order-turn-left.jpg',
            }}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
      {user.map((ele, ind) => {
        return (
          <View style={styles.convo}>
            <Text style={styles.userText}>{user[ind]}</Text>
            <View style={styles.modelReply}>
              <Markdown style={styles.modelText}>{model[ind]}</Markdown>
              <Markdown style={styles.modelOptimizedText}>
                {improved[ind]}
              </Markdown>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    color: 'blue',
  },
  backArrow: {
    position: 'absolute',
    bottom: 90,
    left: 50,
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  convo: {
    margin: 'auto',
    height: 'auto',
    width: 'auto',
    padding: 5,
  },
  userText: {
    position: 'absolute',
  },
  modelText: {},
  optiText: {},
  modelOptimizedText: {},
  modelReply: {},
});
