import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';

const TimePeriod = (props) => {

  const [toggleGroup,setToggleGroup] = useState([
    {id:1,periodName: '1d',isActive:true,days:1},
    {id:2,periodName: '7d',isActive:false,days:7},
    {id:3,periodName: '1m',isActive:false,days:31},
    {id:4,periodName: '3m',isActive:false,days:90},
    {id:5,periodName: '6m',isActive:false,days:180},
    {id:6,periodName: '1y',isActive:false,days:365}
  ]);


  const [toggle,setToggle] = useState(0);


  useEffect(()=> {

    let tGroup = [];
    for (let i = 0; i <toggleGroup.length ; i++) {
      let tempPeriod = toggleGroup[i];
       tempPeriod.isActive = false;
      tGroup.push(tempPeriod)

    }
    tGroup[toggle].isActive = true;

    setToggleGroup(tGroup)

  },[toggle])

  return(
    <View>
      <View style={styles.periodArea}>
      {toggleGroup.map((item,index) => (
        <TouchableOpacity onPress={() => setToggle(index)}>
          <View style={item.isActive?styles.activePeriod:styles.passivePeriod}>
            <Text style={item.isActive? styles.periodTextActive:
              styles.periodTextPassive}>{item.periodName}</Text>
          </View>
        </TouchableOpacity>
      ))}
      </View>
    </View>
  );

};

const styles = {
  passivePeriod: {
    width: 45,
    height:30,
    backgroundColor:'transparent',
    borderWidth: 0.2,
    borderColor: "#daa520",
    justifyContent:'center',
    alignItems:'center',
    marginRight:5,
    marginLeft:5,
    borderRadius: 5
  },
  periodArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'center',
    marginTop: -15
  },
  periodTextPassive:{
    color:'#daa520'
  },
  periodTextActive:{
    color:'#000'
  },
  activePeriod:{
    width: 45,
    height:30,
    backgroundColor:'#daa520',
    borderWidth: 0.2,
    borderColor: "#daa520",
    justifyContent:'center',
    alignItems:'center',
    marginRight:5,
    marginLeft:5,
    borderRadius: 5
  }
};
export default TimePeriod;
