import React from 'react';
import {Text, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import {
    RecipeCard,
    RecipeItemProp
} from './RecipeCard';
import Loading from './Loading';
import {useNavigation} from '@react-navigation/native';

export function Recipes({categories, meals}: { categories: any[], meals: RecipeItemProp[] }) {
    const navigation = useNavigation();

    return (
        <View className='mx-4 space-y-3'>
            <Text style={{fontSize: hp(3)}} className='font-semibold text-neutral-600'>Recipes</Text>
            <View>
                {
                    (categories.length === 0 && meals.length === 0)
                        ? (<Loading size={"large"} className='mt-20'/>)
                        : (
                            <MasonryList<RecipeItemProp>
                                data={meals}
                                keyExtractor={(item: RecipeItemProp): string => item.idMeal}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item, i}: { item: RecipeItemProp, i: number }) => <RecipeCard item={item}
                                                                                                            index={i}
                                                                                                            navigation={navigation}/>}
                                onEndReachedThreshold={0.1}
                            />)
                }

            </View>
        </View>
    );
}
