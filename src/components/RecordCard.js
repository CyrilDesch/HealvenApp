import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Context as LocationContext } from '../context/LocationContext';
import { Context as TrackContext } from '../context/TrackContext';
import Counter from './simpleComponents/Counter';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RecordCard = () => {
  const { startRecording, stopRecording, reset, state: { locations, recordDate, speed, speedMoy } } = useContext(LocationContext);
  const { createTrack } = useContext(TrackContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(46)).current;
  const [pause, setPause] = useState(true);
  const [show, setShow] = useState(false);
  const [sec, setSec] = useState(0);
  const record = useRef(false);
  const timer = useRef(null);
  const distance = useRef(0);

  useEffect(() => {
    distance.current = distance.current + speed;
  }, [speed])

  const startStopWatch = () => {
    timer.current = setInterval(() => {
      rotateAnim.setValue(46);
      Animated.spring(rotateAnim,
        {
          toValue: 225,
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
    if(locations.length > 0)
      createTrack(locations, speedMoy, recordDate);
    record.current = false;
    rotateAnim.setValue(46);
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
    <View style={styles.container}>
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
            <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>{`${Math.round(distance.current)}\nmètres`}</Animated.Text>
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
    width: wp(90),
    height: hp(30),
    marginBottom: wp(8),
    backgroundColor: '#fe9b18',
    borderRadius: wp(5),
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(5),
    color: 'white',
    marginBottom: hp(5)
  },
  middleColumn: {
    height: wp(39),
    width: wp(15),
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