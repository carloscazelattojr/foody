import React from 'react';
import { Pressable, Text } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import type {NavigationProp} from "@react-navigation/core/src/types";

export type RecipeItemProp = {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
}

export type RecipeCardProps = {
    index: number;
    item: RecipeItemProp;
    navigation: NavigationProp<any>;
}

export function RecipeCard({ item, index, navigation }: RecipeCardProps) {

    let isEven = index % 2 == 0
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className='flex justify-center mb-4 space-y-4'
                onPress={() => navigation.navigate('RecipeDetail', { ...item })}
            >

                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className='bg-black/5'
                    sharedTransitionTag={item.strMeal}
                />
                {/* <CachedImage
                    uri={item.strMealThumb}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className='bg-black/5'
                /> */}


                {/* Title meal */}
                <Text
                    style={{ fontSize: hp(1.5) }}
                    className='font-semibold ml-2 text-neutral-600'
                >
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}
