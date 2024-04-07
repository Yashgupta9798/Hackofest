import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import FrontPage from './components/FrontPage';
import Toggle from './components/Toggle';
import Conversatation from './components/Conversatation';

const App = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [isShowingArrow, setIsShowingArrow] = useState<boolean>(false);
  return (
    <View>
      <FrontPage />
      {/* *************** THREE LINE SECTION ****************** */}
      <View style={styles.TopThreeLine}>
        {/* <Icon name="menu" size={30} color="#000" /> */}
        {/* <Text>--</Text> */}
        <TouchableOpacity
          onPress={() => {
            setIsShowing(!isShowing);
          }}>
          <Image
            source={{
              // uri: 'https://th.bing.com/th?id=OIP.E27rfxtA7q6VzXkaSXAeXgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2',
              uri: 'https://th.bing.com/th/id/OIP.PcJfrtbqP01UtsFpV6eNLAHaHa?w=151&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7https://th.bing.com/th/id/OIP.PcJfrtbqP01UtsFpV6eNLAHaHa?w=151&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
            }}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
      </View>
      {isShowing && (
        <>
          <Toggle />
        </>
      )}

      <View style={styles.stopRecording}>
        <TouchableOpacity
          onPress={() => {
            setIsShowingArrow(!isShowingArrow);
          }}>
          <Image
            source={{
              uri: 'https://th.bing.com/th/id/OIP.AC9w_SmbjJDnD_QbTUuJfQHaEJ?w=324&h=182&c=7&r=0&o=5&dpr=1.4&pid=1.7',
            }}
            style={{height: 70, width: 100, borderRadius: 30}}
          />
        </TouchableOpacity>
      </View>
      {isShowingArrow && (
        <>
          <Conversatation />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  TopThreeLine: {
    position: 'relative',
    bottom: 80,
    marginTop: -50,
    marginLeft: 0,
    height: 40,
    width: 50,
    borderRadius: 90,
  },
  stopRecording: {
    position: 'absolute',
    top: 605,
    left: 280,
    backgroundColor: 'pink',
    width: 100,
    borderRadius: 90,
  },
});

export default App;
