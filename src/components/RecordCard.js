import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Context as LocationContext } from '../context/LocationContext';
import { Context as TrackContext } from '../context/TrackContext';
import Counter from './simpleComponents/Counter';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RecordCard = ({ style }) => {
  const { startRecording, stopRecording, reset, state: { locations, recordDate, speed, speedMoy } } = useContext(LocationContext);
  const { createTrack } = useContext(TrackContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0.127)).current;
  const [pause, setPause] = useState(true);
  const [show, setShow] = useState(false);
  const [sec, setSec] = useState(0);
  const record = useRef(false);
  const timer = useRef(null);
  const distance = useRef(0);


  useEffect(() => {
    if(!pause){
      distance.current = distance.current + (speed / 3.6);
    }
  }, [locations])

  const startStopWatch = () => {
    timer.current = setInterval(() => {
      rotateAnim.setValue(0.127);
      Animated.spring(rotateAnim,
        {
          toValue: 0.625,
          speed: 10,
          bounciness: 1000000,
          useNativeDriver: true
        }
      ).start();
      setSec((sec) => sec + 1);
    }, 1000);
  }

  const handlePausePlay = () => {
    if(!pause){
      clearInterval(timer.current);
      stopRecording();
    } else {
      startRecording();
      startStopWatch();
      if(!record.current){
        record.current = true;
      }
    }
    setPause(!pause);
  }

  const handleStop = () => {
    stopRecording();
    if(distance.current > 20)
      createTrack(locations, Math.round(speedMoy*10)/10, recordDate, new Date(sec * 1000), Math.round(distance.current));
    record.current = false;
    rotateAnim.setValue(0.127);
    distance.current = 0;
    reset();
    clearInterval(timer.current);
    setSec(0);
    setPause(true);
  }

  useEffect(() => {
    if(record.current){
      setShow(true);
      Animated.sequence([
        Animated.timing(translateAnim,
          {
            toValue: -45,
            duration: 200,
            useNativeDriver: true
          }
        ),
        Animated.timing(fadeAnim,
          {
            toValue: 2,
            duration: 400,
            useNativeDriver: true
          }
        )
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(fadeAnim,
          {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
          }
        ),
        Animated.timing(translateAnim,
          {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }
        ),
      ]).start(() => setShow(false));
    }
  }, [record.current]);

  return(
    <View style={[style, styles.container]}>
      <Counter 
        style={styles.leftColumn} 
        text={new Date(sec * 1000).toISOString().substr(11, 8)}
        iconName="timer-outline"
        animValue={rotateAnim}
      />
      <View style={styles.middleColumn}>
        <AnimatedPressable style={{ top: wp(12), transform: [{ translateY: translateAnim }] }} onPress={handlePausePlay}>
          <Icon name={pause ? 'play-circle-outline' : 'pause-circle-outline'} color="white" size={wp(13)}/>
        </AnimatedPressable>
        {show ? 
          <>
            <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>{`${Math.round(distance.current)}\nm??tres`}</Animated.Text>
            <AnimatedPressable style={{opacity: fadeAnim}} onPress={handleStop}>
              <Icon name="stop-circle-outline" color="white" size={wp(13)}/>
            </AnimatedPressable>
          </>
        : null}
      </View>
      <Counter 
        style={styles.rightColumn}
        text={Math.round(speedMoy*10)/10 + " km/h"}
        iconName="speedometer-outline"
        animValue={rotateAnim}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(5),
    color: 'white',
    marginBottom: hp(5)
  },
  middleColumn: {
    height: wp(39),
    width: wp(19),
    alignItems: 'center'
  },
  leftColumn: {
    width: wp(30),
    height: wp(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightColumn: {
    width: wp(30),
    height: wp(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    padding: wp(1),
    paddingVertical: wp(2),
    color: "white",
    fontSize: wp(3.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  }
});

export default RecordCard;