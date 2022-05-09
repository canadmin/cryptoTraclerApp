import React, { useEffect, useState } from "react";
import {View,Text,TouchableOpacity} from "react-native";

import { VictoryPie } from "victory-native";
import { priceFormat } from "../../../helper/Utils";


const PieChart = (props) => {

  const {assets,totalValue} = props;
  const [chartData,setChartData] = useState([]);


  let [selectedCoin,setSelectedCoin] = useState();
  let [coinDetail,setCoinDetail] = useState(null);
  let colorScales = assets.map((item) => item.assetColor);

  useEffect(() => {
      let calculateChartData = assets.map((item => {
      let percentage = (((item.price*item.amount).toFixed(0)/totalValue.toFixed(0)) *100).toFixed(0);

      if(percentage >= 1){
        return {
          label: ` `,
          y: Number(item.price*item.amount),
          color: item.assetColor,
          name: item.name,
          id:item.id
        }
      }else{
        return {
          label: ` `,
          y: Number(item.price*item.amount),
          color: item.assetColor,
          name: item.name,
          id:item.id
        }
      }
    }))
    setChartData(calculateChartData);
  },[assets])

  useEffect(() => {
    setCoinDetail(assets.filter(elm => elm.name === selectedCoin)[0]);
  },[selectedCoin])

    return(<View style={{height:300}}>
      <VictoryPie
        radius={({ datum }) => (selectedCoin && selectedCoin === datum.name) ? 110: 105}
        labelRadius={110}
        labels={(datum) => `${datum.y} `}
        innerRadius={70}
        height={300}
        data={chartData}
        colorScale={colorScales}
        style={{
          labels: {fill:'#FFF',fontSize: 25},
        }}
        events={[{
          target:"data",
          eventHandlers:{
            onPressIn: () => {
              console.log("qaa")
              return [{
                target:"labels",
                mutation :(props) => {
                  let coinName = chartData[props.index].name
                  setSelectedCoin(coinName)
                }
              }]
            }
          }
        }]}
      />

      { coinDetail &&
        <>
          <View style={{position:'absolute', top:'47%',left:'45%'}}>
            <Text style={{textAlign:'center', color:'white',fontWeight:"bold"
              ,fontSize:22}}>

              {coinDetail.symbol.toUpperCase()}
            </Text>
          </View>

          <View style={{marginTop:-20}}>
            <Text style={{textAlign:'center',color:coinDetail.assetColor,fontWeight:"bold",fontSize:22}}>
              {(((coinDetail.price*coinDetail.amount).toFixed(0)/totalValue.toFixed(0)) *100).toFixed(0)} %
            </Text>
            <Text style={{textAlign:'center', color:coinDetail.assetColor,fontWeight:"bold"}}>
              {priceFormat(coinDetail.price*coinDetail.amount)}
            </Text>
          </View>
        </>

      }

    </View>)

}

export default PieChart;
