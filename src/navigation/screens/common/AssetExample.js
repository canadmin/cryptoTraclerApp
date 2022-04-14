import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const {width,height} = Dimensions.get('window');
export default class LineChartExample extends React.PureComponent {
  render() {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

    return (
      <View style={styles.page}>
        <View style={styles.row}>
            <LineChart
              style={{ height: 60,width: 70,backgroundColor:'black' }}
              data={data}
              svg={{ stroke: 'red',elevation:5 }}
              contentInset={{ top: 20, bottom: 20 }}
            >
              <Grid />
            </LineChart>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  row:{
    alignItems:'center',
    width:width*0.9,
    alignSelf:'center',
  }
})
