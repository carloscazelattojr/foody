import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';

import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { ListCategories } from '@/components/ListCategories';
import { Recipes } from '@/components/Recipes';


export function HomeScreen() {

    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state variable for the search term


    const getCategories = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            if (response && response.data) {
                setCategories(response.data.categories);
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    const getRecipes = async (category = "Beef") => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if (response && response.data) {
                setMeals(response.data.meals);
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    const handleChangeCategory = async (category: string) => {
        await getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    }

    const getSearchResults = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            if (response && response.data) {
                setMeals(response.data?.meals ?? []);
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getCategories();
                await getRecipes();
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            getSearchResults();
        }
    }, [searchTerm]);

    return (
        <View className='flex-1 bg-white'>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
                className='space-y-6 pt-14'
            >
                {/* Avatar e Icon */}
                <View className='mx-4 flex-row justify-between items-center mb-2'>
                    <Image source={require("../assets/avatar.png")} style={{ height: hp(5), width: hp(5) }} />
                    <BellIcon size={hp(4)} color="gray" />
                </View>

                {/* greetings and punchline */}
                <View className='mx-4 space-y-2 mb-2'>
                    <Text style={{ fontSize: hp(1.7) }} className='text-neutral-600'> Hello, Carlos</Text>
                    <View>
                        <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-600'>Make your own food,</Text>
                    </View>
                    <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-600'>stay at <Text className='text-amber-400'>home</Text></Text>
                </View>

                {/* search bar */}
                <View className='mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]'>
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        className='flex-1 text-base mb-1 pl-3 tracking-wide'
                        onChangeText={text => setSearchTerm(text)}
                    />
                    <View className='bg-white rounded-full p-3'>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={'gray'} />
                    </View>
                </View>

                {/* Categories */}
                <View>
                    {
                        categories.length > 0 &&
                        <ListCategories
                            categories={categories}
                            activeCategory={activeCategory}
                            handleChangeCategory={handleChangeCategory}
                        />
                    }
                </View>

                {/* recpies */}
                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>

            </ScrollView>

        </View>
    );
}
