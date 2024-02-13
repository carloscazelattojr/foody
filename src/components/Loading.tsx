import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';

type LoadingProps = ActivityIndicatorProps & {

}

export default function Loading({ ...rest }: LoadingProps) {
    return (
        <View className='flex-1 justify-center items-center' >
            <ActivityIndicator {...rest} />
        </View>
    );
}