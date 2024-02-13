import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';



export function WelcomeScreen() {


    const navigation = useNavigation();

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;

        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(1)), 200);
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300);
        setTimeout(() => navigation.navigate("Home"), 1500);
    }, []);

    return (
        <View className='flex-1 justify-center items-center space-y-10 bg-amber-500'>

            {/*logo imagem  */}
            <Animated.View className='bg-white/20 rounded-full ' style={{ padding: ring2padding }}>
                <Animated.View className='bg-white/20 rounded-full' style={{ padding: ring1padding }}>
                    <Image source={require('../assets/welcome.png')} style={{ width: hp(30), height: hp(30) }} />
                </Animated.View>
            </Animated.View>

            {/* Titulo */}
            <View className='flex items-center space-y-2'>
                <Text className='font-bold text-white tracking-widest' style={{ fontSize: hp(8) }}>
                    Foody
                </Text>
                <Text className='font-medium text-white tracking-widest ' style={{ fontSize: hp(2) }}>
                    Food is always right
                </Text>
            </View>
        </View>
    );
}