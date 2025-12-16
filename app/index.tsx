import { View, Text, Image, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(10)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Cat entrance (slower)
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Tiny shake (clock personality)
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Text appears (slower)
    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        delay: 900,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslate, {
        toValue: 0,
        duration: 600,
        delay: 900,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate next (after animations finish)
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-4deg', '4deg'],
  });

  return (
    <View className="flex-1 items-center justify-center bg-orange-400">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { rotate }],
          opacity: opacityAnim,
        }}
      >
        <Image
          source={require('../assets/images/cat-splash.png')}
          className="w-52 h-52"
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslate }],
        }}
        className="items-center mt-6"
      >
        <Text className="text-4xl font-bold text-white">
          Meowrning
        </Text>
        <Text className="text-lg text-white opacity-70 mt-3">
          Wake up or face the Cat Inspector 😼
        </Text>
      </Animated.View>
    </View>
  );
}
