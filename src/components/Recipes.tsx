import React from 'react';
import { Text, View } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { RecipleCard } from './RecipleCard';

import Loading from './Loading';

import { useNavigation } from '@react-navigation/native';


export function Recipes({ categories, meals }) {

    const navigation = useNavigation();

    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
            <View>
                {
                    (categories.length == 0 && meals == 0)
                        ? (<Loading size={"large"} className='mt-20' />)
                        : (
                            <MasonryList
                                data={meals}
                                keyExtractor={(item): string => item.idMeal}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, i }) => <RecipleCard item={item} index={i} navigation={navigation} />}
                                // refreshing={isLoadingNext}
                                // onRefresh={() => refetch({ first: ITEM_CNT })}
                                onEndReachedThreshold={0.1}
                            // onEndReached={() => loadNext(ITEM_CNT)}
                            />)
                }

            </View>
        </View>
    );
}