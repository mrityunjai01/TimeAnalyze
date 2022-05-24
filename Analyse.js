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
    const data_2 = [
        {
            month: new Date(2015, 0, 1),
            apples: 3840,
            bananas: 1920,
            cherries: 960,
            dates: 400,
        },
        {
            month: new Date(2015, 1, 1),
            apples: 1600,
            bananas: 1440,
            cherries: 960,
            dates: 400,
        },
        {
            month: new Date(2015, 2, 1),
            apples: 640,
            bananas: 960,
            cherries: 3640,
            dates: 400,
        },
        {
            month: new Date(2015, 3, 1),
            apples: 3320,
            bananas: 480,
            cherries: 640,
            dates: 400,
        },
    ]
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
            <StackedAreaChart
                style={{ height: 200, paddingVertical: 16 }}
                data={data_2}
                keys={keys}
                colors={colors}
                curve={shape.curveNatural}
                showGrid={false}
                svgs={svgs}
            />
            
        </View>
    )
}