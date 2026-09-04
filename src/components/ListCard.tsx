import React, { useContext, useEffect, useState } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IconAndText from './simpleComponents/IconAndText';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as UserContext } from '../context/UserContext';
import calorieCalc from '../lib/calorieCalc';

interface ListCardProps {
  style?: StyleProp<ViewStyle>;
}

const ListCard = ({ style }: ListCardProps) => {
  const router = useRouter();

  const [listShow, setListShow] = useState(false);
  const [animTranslate] = useState(() => new Animated.Value(0));
  const [animScale] = useState(() => new Animated.Value(1));
  const [animFade] = useState(() => new Animated.Value(0));
  const [indicator] = useState(() => new Animated.Value(0));
  const [wholeWidth, setWholeWidth] = useState(1);
  const [visibleWidth, setVisibleWidth] = useState(0);
  const {
    state: { poids },
  } = useContext(UserContext);

  const { state: tracks } = useContext(TrackContext);

  useEffect(() => {
    if (listShow) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animTranslate, {
            toValue: -220,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animScale, {
            toValue: 0.5,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(animFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(animFade, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(animTranslate, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(animScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [listShow]);

  const indicatorSize = wholeWidth > visibleWidth ? (visibleWidth * visibleWidth) / wholeWidth : 0;

  const difference = visibleWidth > indicatorSize ? visibleWidth - indicatorSize : 1;

  return (
    <Pressable style={[style, { height: wp(90) }]} disabled={listShow} onPress={() => setListShow(true)}>
      <Animated.View style={[styles.header, { transform: [{ scale: animScale }, { translateY: animTranslate }] }]}>
        <Text style={styles.title}>Afficher vos parcours</Text>
        <Ionicons name="analytics" color="white" size={wp(20)} />
      </Animated.View>

      <Pressable style={styles.hideIcon} onPress={() => setListShow(false)}>
        <Animated.View style={{ opacity: animFade }}>
          <Ionicons name="caret-back" color="white" size={wp(5)} />
        </Animated.View>
      </Pressable>
      <Animated.View style={[{ opacity: animFade }, styles.contentContainer]}>
        <View style={styles.bar} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={(width) => setWholeWidth(width)}
          onLayout={({ nativeEvent: { layout: { width } } }) => setVisibleWidth(width)}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: indicator } } }], { useNativeDriver: false })}
          style={styles.list}
          keyExtractor={(item) => item.id}
          data={tracks}
          ListHeaderComponent={() =>
            tracks.length === 0 ? <Text style={[styles.itemText, { width: wp(90), fontSize: wp(5) }]}>Aucune donnée</Text> : null
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <Pressable style={styles.itemContainer} onPress={() => router.push(`/track/${item.id}`)}>
              <Text style={styles.itemTitle}>DATE</Text>
              <Text style={styles.itemText}>{`${new Date(item.date).toLocaleDateString()}\n${new Date(item.date).toLocaleTimeString()}`}</Text>
              <Text style={styles.itemTitle}>INFO</Text>
              <View>
                <IconAndText iconName="walk-outline" iconSize={5} text={`${item.distance} m`} style={styles.itemDescContainer} />
                <IconAndText
                  iconName="timer-outline"
                  iconSize={5}
                  text={new Date(item.time).toISOString().substring(11, 19)}
                  style={styles.itemDescContainer}
                />
                <IconAndText iconName="speedometer-outline" iconSize={5} text={`${item.speedMoy} km/h`} style={styles.itemDescContainer} />
                <IconAndText
                  iconName="flame"
                  iconSize={5}
                  text={`${calorieCalc(item.speedMoy, new Date(item.time).getTime() / (1000 * 60), Number(poids))} Kcal`}
                  style={styles.itemDescContainer}
                />
              </View>
              <Foundation style={styles.iconMap} name="map" size={wp(5)} color="white" />
            </Pressable>
          )}
        />
        {indicatorSize !== 0 ? (
          <View style={{ width: wp(80) }}>
            <Animated.View
              style={[
                styles.indicator,
                {
                  width: indicatorSize - wp(10),
                  transform: [
                    {
                      translateX: Animated.multiply(indicator, visibleWidth / (wholeWidth + 0.0001)).interpolate({
                        inputRange: [0, difference],
                        outputRange: [0, difference],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: wp(1),
    paddingVertical: wp(2),
    color: 'white',
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
    borderBottomColor: 'white',
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
    width: 0,
    borderLeftWidth: wp(0.2),
    borderLeftColor: 'white',
  },
  itemContainer: {
    width: wp(29.94),
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
    color: 'white',
    fontSize: wp(3),
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  itemDescContainer: {},
  iconMap: {
    position: 'absolute',
    top: wp(2),
    left: wp(2),
  },
  indicator: {
    height: wp(1),
    backgroundColor: 'black',
    opacity: 0.2,
    borderRadius: wp(0.5),
  },
  hideIcon: {
    position: 'absolute',
    padding: wp(2),
    top: wp(2),
    left: wp(2),
  },
});

export default ListCard;
