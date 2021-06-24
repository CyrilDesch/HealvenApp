import React, {useContext, useCallback, useRef, useState, useEffect} from 'react';
import { Animated, View, Text, StyleSheet, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAndText from './simpleComponents/IconAndText';
import {Context as TrackContext} from '../context/TrackContext';
import calorieCalc from '../calorieCalc';
import { Context as UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ListCard = ({ style }) => {
  const navigation = useNavigation();

  const [listShow, setListShow] = useState(false);
  const animTranslate = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(1)).current;
  const animFade = useRef(new Animated.Value(0)).current;
  const indicator = useRef(new Animated.Value(0)).current;
  const [wholeWidth, setWholeWidth] = useState(1);
  const [visibleWidth, setVisibleWidth] = useState(0);
  const { state: { poids } } = useContext(UserContext);

  const { fetchTrack, state } = useContext(TrackContext);

  useEffect(() => {
    fetchTrack();
  }, []);


  useEffect(() => {
    if(listShow){
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animTranslate, {
            toValue: -220,
            duration: 600,
            useNativeDriver: true
          }),
          Animated.timing(animScale, {
            toValue: 0.5,
            duration: 600,
            useNativeDriver: true
          })
        ]),
        Animated.timing(animFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(animFade, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        }),
        Animated.parallel([
          Animated.timing(animTranslate, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true
          }),
          Animated.timing(animScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true
          })
        ])        
      ]).start();
    }
  }, [listShow]);

  const indicatorSize = wholeWidth - 10 > visibleWidth ? visibleWidth * visibleWidth / wholeWidth : 0;

  const difference = visibleWidth > indicatorSize ? visibleWidth - indicatorSize : 1

  return(
    <Pressable style={[style, {height: wp(90)}]} disabled={listShow} onPress={() => setListShow(true)}>
      <Animated.View
        style={[styles.header, {transform: [{ scale: animScale }, { translateY: animTranslate }]}]}
      >
        <Text style={styles.title}>Afficher vos parcours</Text>
        <Icon name="analytics" color="white" size={wp(20)} />
      </Animated.View>

      <AnimatedPressable style={[{opacity: animFade}, styles.hideIcon]} onPress={() => setListShow(false)}>
          <Icon name="caret-back" color="white" size={wp(5)}  />
      </AnimatedPressable>
      <Animated.View style={[{opacity: animFade}, styles.contentContainer]}>
        <View style={styles.bar} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={(width) => setWholeWidth(width)}
          onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => setVisibleWidth(width)}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: indicator } } }], { useNativeDriver: false })}
          style={styles.list}
          keyExtractor={(item) => item._id }
          data={state}
          ItemSeparatorComponent={() => <View style={styles.separator} /> }
          renderItem={({item}) =>
            <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('TrackMap', item.locations)}>
            <Text style={styles.itemTitle}>DATE</Text>
            <Text style={styles.itemText}>{`${new Date(item.date).toLocaleDateString()}\n${new Date(item.date).toLocaleTimeString()}`}</Text>
            <Text style={styles.itemTitle}>INFO</Text>
            <View>
              <IconAndText 
                iconName="walk-outline" 
                iconSize={5}
                text={`${item.distance} m`}
                style={styles.itemDescContainer}
              />
              <IconAndText 
                iconName="timer-outline" 
                iconSize={5}
                text={new Date(item.time).toISOString().substr(11, 8)}
                style={styles.itemDescContainer}
              />
              <IconAndText 
                iconName="speedometer-outline"
                iconSize={5}
                text={`${item.speedMoy} km/h`}
                style={styles.itemDescContainer}
              />
              <IconAndText 
                iconName="flame"
                iconSize={5}
                text={`${calorieCalc(item.speedMoy, (new Date(item.time).getTime() / (1000 * 60)), poids)} Kcal`}
                style={styles.itemDescContainer}
              />
            </View>
          </Pressable>            
        }
      />
      <View style={{width: wp(80)}}>
        <Animated.View 
          style={[styles.indicator, {
            width: indicatorSize-wp(10),
            transform: [{
              translateX: Animated.multiply(indicator, visibleWidth / (wholeWidth + 0.0001)).interpolate({
                inputRange: [0, difference],
                outputRange: [0, difference],
                extrapolate: 'clamp'
              })
            }]
          }]} />
      </View>
    </Animated.View>
  </Pressable>
  )
}

const styles = StyleSheet.create({
  title: {
    padding: wp(1),
    paddingVertical: wp(2),
    color: "white",
    fontSize: wp(5.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  header: {
    alignItems: 'center',
    zIndex: 100,
  },
  bar: {
    width: wp(20),
    borderBottomWidth: wp(0.2),
    borderBottomColor: 'white'
  },
  contentContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: wp(28),
  },
  list: {
    marginTop: wp(6),
    paddingBottom: wp(4),
    width: wp(90),
    flexGrow: 0,
  },
  separator: {
    borderLeftWidth: wp(0.2),
    borderLeftColor: 'white'
  },
  itemContainer: {
    width: wp(30),
    padding: wp(1),
    alignItems: 'center',
  },
  itemTitle: {
    paddingTop: wp(1),
    color: 'black',
    fontSize: wp(3.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  itemText: {
    padding: wp(1),
    color: "white",
    fontSize: wp(3),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  }, 
  indicator: {
    height: wp(1),
    backgroundColor: 'black',
    opacity: 0.2,
    borderRadius: wp(0.5)
  },
  hideIcon: {
    position: 'absolute',
    padding: wp(2),
    top: wp(2),
    left: wp(2)
  },
  removeItem: {
    position: 'absolute',
    left: wp(3),
    top: wp(1.5)
  }
});

export default ListCard;