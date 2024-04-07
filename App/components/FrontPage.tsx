import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageComponent,
  Button,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import Voice from '@react-native-voice/voice';
import {useNavigation, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import DetailsScreen from './DetailsScreen';
import axios from 'axios';
// import Tts from 'react-native-tts';
import Tts from 'react-native-tts';

export default function FrontPage() {
  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [response, setResponse] = useState<string>('');
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState<boolean>(false);

  // Tts.voices().then(voices => console.log(voices));

  //!FOR TEXT TO VOICE
  Tts.setDefaultLanguage('en-IE');
  Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
  Tts.setDefaultRate(0.4);
  Tts.setDefaultPitch(1);

  // sending request to the backend

  const sendingRequestToBackend = async (prompt) => {
    try {
       const body = { prompt };
       const res = await axios.post('http://192.168.208.216/3000 9935', body, {
         headers: { 'Content-Type': 'application/json' },
       });
   
       if (res.data.success) {
         setResponse(res.data.message);
         Tts.getInitStatus().then(() => {
           Tts.speak(res.data.message);
         });
       } else {
         setResponse('Some error occurred: ' + res.data.message);
         Tts.getInitStatus().then(() => {
           Tts.speak('Some Error Occurred');
         });
       }
    } catch (err) {
       console.error('Error:', err);
       Tts.getInitStatus().then(() => {
         Tts.speak('Some Error Occurred');
       });
       setResponse('Some error occurred: ' + err.message);
    }
   };
   

  // ************************************************************************************

  //!rendering the new screen
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeachResults;
    // Voice.onSpeechPartialResults = onPartialSpeachResults
  }, []);

  const onSpeechStart = e => {
    console.log('from start: ', e);
    setStarted('✅');
  };

  const onSpeechEnd = e => {
    console.log('from end; ', e);
    setEnded('✅');
  };

  // const onPartialSpeachResults = e => {
  //   console.log("from results: ",e.value );
  //   setResults(e.value);
  // };
  const onSpeachResults = e => {
    console.log('from results: ', e.value[0]);
    setResponse(e.value[0]);
    sendingRequestToBackend(e.value[0]);
  };

  const startRecognizing = async () => {
    try {
      setIsListening(!isListening);
      setResults([]);
      await Voice.start('en-US');
    } catch (error) {
      console.log(error);
    }
  };
  const stopRecognizing = async () => {
    try {
      setIsListening(!isListening);
      setResults([]);
      await Voice.stop();
      await Voice.destroy();
    } catch (error) {
      console.log(error);
    }

    // console.log(e.value[0])
  };

  return (
    <View>
      {/* *************** SECITON OF TOP BORDER ***************** */}
      <View style={styles.container}>
        <View style={styles.TopBorder}>
          {/* <Text>this is top Border</Text> */}
        </View>

        {/* ************** MICROPHONE SECTION ************************ */}
        <View style={styles.MicLogo}>
          <TouchableOpacity
            onPress={() => {
              if (!isListening) startRecognizing();
              else stopRecognizing();
            }}>
            <Image
              source={{
                uri: 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/83-512.png',
              }}
              style={{width: 100, height: 100}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.MicText}>
          <Text>Tap here</Text>
        </View>

        {/* ************************************************************ */}

        {/* ***************** * STOP RECORDING SECTION ************************* */}
        {/* <View style={styles.stopRecording}>
          <Image
            source={{
              uri: 'https://th.bing.com/th/id/OIP.AC9w_SmbjJDnD_QbTUuJfQHaEJ?w=324&h=182&c=7&r=0&o=5&dpr=1.4&pid=1.7',
            }}
            style={{height: 70, width: 100, borderRadius: 30}}
          />
        </View> */}
        {/* ****************************************************************************** */}
        {/* <NavigationContainer>
          <Stack.Navigator>
            
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer> */}

        <Text>{response}hey</Text>

        {/* // for the conversatation part */}
        {/* <View style={styles.conversatation}>
          <Button onPress={()=>poses.navigation.navigate("DetailsScreen")} title="go to details"/>
          <TouchableOpacity onPress={()=>poses.navigation.navigate("DetailsScreen")}>
            <Text style={styles.conversatationText}>List of Details</Text>
          </TouchableOpacity>

        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  TopBorder: {
    height: 40,
    backgroundColor: '#0A79DF',
  },
  TopThreeLine: {
    marginTop: 20,
    marginLeft: 0,
    height: 50,
    width: 50,
    backgroundColor: '#0A79DF',
    borderRadius: 90,
  },
  MicLogo: {
    position: 'relative',
    top: 550,
    left: 150,
    justifyContent: 'center',
    backgroundColor: 'pink',
    width: 110,
    borderRadius: 90,
    zIndex: 100,
  },

  MicText: {
    position: 'relative',
    top: 570,
    left: 170,
  },

  // stopRecording: {
  //   position: 'relative',
  //   top: 430,
  //   left: 280,
  //   backgroundColor: 'pink',
  //   width: 100,
  //   borderRadius: 90,
  // },
  // conversatation: {
  //   position: 'relative',
  //   left: 3,
  // },
  // conversatationText:{
  //   position:"relative",
  //   top:44,
  //   height:50,
  //   width:150,
  //   backgroundColor:"red",
  // }
});
