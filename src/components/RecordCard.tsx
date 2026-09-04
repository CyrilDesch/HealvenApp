import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Context as LocationContext } from '../context/LocationContext';
import { Context as TrackContext } from '../context/TrackContext';
import Counter from './simpleComponents/Counter';

interface RecordCardProps {
  style?: StyleProp<ViewStyle>;
}

const RecordCard = ({ style }: RecordCardProps) => {
  const {
    startRecording,
    stopRecording,
    reset,
    state: { locations, recordDate, speedMoy },
  } = useContext(LocationContext);
  const { createTrack } = useContext(TrackContext);
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [translateAnim] = useState(() => new Animated.Value(0));
  const [rotateAnim] = useState(() => new Animated.Value(0.127));
  const [pause, setPause] = useState(true);
  const [show, setShow] = useState(false);
  const [sec, setSec] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  // `locations` only grows while the context is actually recording, so summing
  // it directly gives the same cumulative distance the old effect+ref combo did,
  // without needing an effect just to derive state from a prop.
  const distance = useMemo(
    () => locations.reduce((total, location) => total + (location.coords.speed ?? 0) / 3.6, 0),
    [locations],
  );

  const startStopWatch = () => {
    timer.current = setInterval(() => {
      rotateAnim.setValue(0.127);
      Animated.spring(rotateAnim, {
        toValue: 0.625,
        speed: 10,
        bounciness: 1000000,
        useNativeDriver: true,
      }).start();
      setSec((s) => s + 1);
    }, 1000);
  };

  const handlePausePlay = () => {
    if (!pause) {
      if (timer.current) clearInterval(timer.current);
      stopRecording();
    } else {
      startRecording();
      startStopWatch();
      if (!hasRecorded) {
        setHasRecorded(true);
        setShow(true);
      }
    }
    setPause(!pause);
  };

  const handleStop = () => {
    stopRecording();
    if (distance > 20 && recordDate) {
      createTrack(locations, Math.round(speedMoy * 10) / 10, recordDate, new Date(sec * 1000), Math.round(distance));
    }
    setHasRecorded(false);
    rotateAnim.setValue(0.127);
    reset();
    if (timer.current) clearInterval(timer.current);
    setSec(0);
    setPause(true);
  };

  useEffect(() => {
    if (hasRecorded) {
      Animated.sequence([
        Animated.timing(translateAnim, {
          toValue: -45,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 2,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setShow(false));
    }
  }, [hasRecorded]);

  return (
    <View style={[style, styles.container]}>
      <Counter style={styles.leftColumn} text={new Date(sec * 1000).toISOString().substring(11, 19)} iconName="timer-outline" animValue={rotateAnim} />
      <View style={styles.middleColumn}>
        <Pressable style={{ top: wp(12) }} onPress={handlePausePlay}>
          <Animated.View style={{ transform: [{ translateY: translateAnim }] }}>
            <Ionicons name={pause ? 'play-circle-outline' : 'pause-circle-outline'} color="white" size={wp(13)} />
          </Animated.View>
        </Pressable>
        {show ? (
          <>
            <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>{`${Math.round(distance)}\nmètres`}</Animated.Text>
            <Pressable onPress={handleStop}>
              <Animated.View style={{ opacity: fadeAnim }}>
                <Ionicons name="stop-circle-outline" color="white" size={wp(13)} />
              </Animated.View>
            </Pressable>
          </>
        ) : null}
      </View>
      <Counter style={styles.rightColumn} text={`${Math.round(speedMoy * 10) / 10} km/h`} iconName="speedometer-outline" animValue={rotateAnim} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(5),
    color: 'white',
    marginBottom: hp(5),
  },
  middleColumn: {
    height: wp(39),
    width: wp(19),
    alignItems: 'center',
  },
  leftColumn: {
    width: wp(30),
    height: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightColumn: {
    width: wp(30),
    height: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: wp(1),
    paddingVertical: wp(2),
    color: 'white',
    fontSize: wp(3.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default RecordCard;
