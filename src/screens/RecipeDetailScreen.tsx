import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View, TouchableOpacity, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import Loading from '@/components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export function RecipeDetailScreen(props) {

    const [isFavourite, setIsFavourite] = useState(false);
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const item = props.route.params;

    const navigation = useNavigation();


    const getMealData = async (id: number) => {

        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
            }

        } catch (err) {
            console.log("Error: ", err);
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    }

    function getRandomMinuteValue() {
        const randomFraction = Math.random();
        const randomValue = Math.floor(randomFraction * (120 - 20 + 1)) + 20;
        return randomValue;
    }

    function getRandomPeopleValue() {
        const randomFraction = Math.random();
        const randomValue = Math.floor(randomFraction * (3 - 1 + 1)) + 1;
        return randomValue;
    }

    function getRandomPreparationValue() {
        let value = getRandomPeopleValue();
        switch (value) {
            case 1:
                return "easy";
            case 2:
                return "medium";
            case 3:
                return "hard";
            default:
                return "fast";
        }
    }


    function getRandomCaloriesValue() {
        const randomFraction = Math.random();
        const randomValue = Math.floor(randomFraction * (1000 - 100 + 1)) + 100;
        return randomValue;
    }

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i < 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    const getYoutubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        return (match && match[1]) ? match[1] : null;

    }

    useEffect(() => {
        getMealData(item.idMeal);
    }, []);

    return (
        <ScrollView
            className='bg-white flex-1 mt-10'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            {/* recipe Image */}
            <View className='flex-row justify-center' >
                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                    sharedTransitionTag={item.strMeal}
                    style={{
                        width: wp(98),
                        height: hp(50),
                        borderRadius: 53,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        marginTop: 4
                    }}

                />
            </View>

            {/* back Button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className='w-full absolute flex-row justify-between items-center pt-7'>
                <TouchableOpacity
                    className='p-2 rounded-full ml-5 bg-white'
                    onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    className='p-2 rounded-full mr-5 bg-white'
                    onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>

            {/* meal Description */}
            {
                loading
                    ? <Loading size="large" className='mt-16' />
                    : (
                        <View className='px-4 flex justify-between space-y-4 pt-8'>

                            {/* name and Area */}
                            <Animated.View
                                entering={FadeInDown.duration(700).springify().damping(12)}
                                className='space-y-2'>
                                <Text
                                    style={{ fontSize: hp(3) }}
                                    className='font-bold flex-1 text-neutral-700'
                                >
                                    {meal?.strMeal}
                                </Text>
                                <Text
                                    style={{ fontSize: hp(2) }}
                                    className='font-medium flex-1 text-neutral-700'
                                >
                                    {meal?.strArea}
                                </Text>
                            </Animated.View>

                            {/* misc */}
                            <Animated.View
                                entering={FadeInDown.delay(100).duration(700).springify().damping(10)}
                                className='flex-row justify-around'>
                                <View className='flex rounded-full bg-amber-300 p-2'>
                                    <View
                                        style={{ height: hp(6.5), width: hp(6.5) }}
                                        className='bg-white rounded-full flex items-center justify-center'
                                    >
                                        <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View className='flex items-center py-2 space-y-1'>
                                        <Text
                                            style={{ fontSize: hp(2) }}
                                            className='font-bold text-neutral-700'>{getRandomMinuteValue()}</Text>
                                        <Text
                                            style={{ fontSize: hp(1.3) }}
                                            className='font-bold text-neutral-700'>Min</Text>
                                    </View>
                                </View>
                                <View className='flex rounded-full bg-amber-300 p-2'>
                                    <View
                                        style={{ height: hp(6.5), width: hp(6.5) }}
                                        className='bg-white rounded-full flex items-center justify-center'
                                    >
                                        <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View className='flex items-center py-2 space-y-1'>
                                        <Text
                                            style={{ fontSize: hp(2) }}
                                            className='font-bold text-neutral-700'>{getRandomPeopleValue()}</Text>
                                        <Text
                                            style={{ fontSize: hp(1.3) }}
                                            className='font-bold text-neutral-700'>Servings</Text>
                                    </View>
                                </View>
                                <View className='flex rounded-full bg-amber-300 p-2'>
                                    <View
                                        style={{ height: hp(6.5), width: hp(6.5) }}
                                        className='bg-white rounded-full flex items-center justify-center'
                                    >
                                        <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View className='flex items-center py-2 space-y-1'>
                                        <Text
                                            style={{ fontSize: hp(2) }}
                                            className='font-bold text-neutral-700'>{getRandomCaloriesValue()}</Text>
                                        <Text
                                            style={{ fontSize: hp(1.3) }}
                                            className='font-bold text-neutral-700'>Cal</Text>
                                    </View>
                                </View>
                                <View className='flex rounded-full bg-amber-300 p-2'>
                                    <View
                                        style={{ height: hp(6.5), width: hp(6.5) }}
                                        className='bg-white rounded-full flex items-center justify-center'
                                    >
                                        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View className='flex items-center py-2 space-y-1'>
                                        <Text
                                            style={{ fontSize: hp(2) }}
                                            className='font-bold text-neutral-700'></Text>
                                        <Text
                                            style={{ fontSize: hp(1.3) }}
                                            className='font-bold text-neutral-700'>{getRandomPreparationValue()}</Text>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* ingredients */}
                            <Animated.View
                                entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-4'>
                                <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700' >
                                    Ingredients
                                </Text>
                                <View className='space-y-2 ml-3'>
                                    {
                                        ingredientsIndexes(meal).map(i => {
                                            return (
                                                <View key={i} className='flex-row space-x-4' >
                                                    <View style={{ height: hp(1.5), width: hp(1.5) }} className='bg-amber-300 rounded-full' />
                                                    <View className='flex-row space-x2'>
                                                        <Text style={{ fontSize: hp(1.7) }} className='font-extrabold text-neutral-700'>{meal['strMeasure' + i]} </Text>
                                                        <Text style={{ fontSize: hp(1.7) }} className='font-medium text-neutral-600'>{meal['strIngredient' + i]}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </Animated.View>

                            {/* instructions */}
                            <Animated.View
                                entering={FadeInDown.delay(250).duration(700).springify().damping(12)} className='space-y-4'>
                                <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-700' >
                                    Instructions
                                </Text>
                                <Text style={{ fontSize: hp(1.6) }} className='text-neutral-600'>
                                    {meal?.strInstructions}
                                </Text>
                            </Animated.View>

                            {/* video Youtube */}
                            {meal?.strYoutube && (
                                <Animated.View
                                    entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='space-y-4'>
                                    <Text style={{ fontSize: hp(2.5) }} className='font-bold flex-1 text-neutral-600'>
                                        Recipe Video
                                    </Text>
                                    <View>
                                        <YoutubeIframe
                                            videoId={getYoutubeVideoId(meal?.strYoutube)}
                                            height={hp(30)}
                                        />
                                    </View>

                                </Animated.View>
                            )}
                        </View>
                    )
            }

        </ScrollView>
    );
}
