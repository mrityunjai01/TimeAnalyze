import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const Grain = ({text}) => {
    return (
        <View>

            <Text>
                {text}
            </Text>

        </View>
    )
}
export default function Home ({navigation}) {
    return (
        <View style={styles.container}>
        </View>
    )
}