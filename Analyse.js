import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import { StackedBarChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    graphStyle: {
        borderRadius: 16,
        marginVertical: 8,
    }
})

export default function Analyse ({navigation}) {
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }
    const data = {
        labels: ["Test1", "Test2"],
        legend: ["L1", "L2", "L3"],
        data: [
          [60, 60, 60],
          [30, 30, 60]
        ],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
      };
      
      return (
          <View style={styles.container}>
            <StackedBarChart
              style={styles.graphStyle}
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
            
        </View>
    )
}