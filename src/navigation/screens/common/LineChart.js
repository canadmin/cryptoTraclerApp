import React, { useRef, useEffect, useState } from "react";
import { View, Dimensions, Animated, Text,Easing,Alert,StyleSheet } from "react-native";
import Svg, { G, Line, Circle, Text as SvgText, Path, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import * as path  from "svg-path-properties";
import { styles } from "./styles";
import { scaleLinear } from "d3-scale";
const window_width = Dimensions.get("window").width;


const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const LineChart = (props) => {

  const {
    line_chart_data = [],
    containerHeight = 250,
    circleColor = "#EFB90B",
    circleRadius = 2,
    checkPointCircleRadius = 5,
    axisColor = "#fff",
    axisWidth = 2,
    axisLabelFontSize= 9,
    lineChartColor = "#70A800",
    lineChartWidth = 6,
    tooltipHeight = 20,
    tooltipWidth=40,
    cursorRadius= 10,
    showGradient = true,
    renderCircleAndRect=true,
    showXAxisText=false,
  } = props;

  const marginFor_x_fromLeft = 10;
  const marginFor_y_fromBottom = 50;
  const padding_from_screenBorder = 20;


  const round = (value) => {
    if (value > 1) {
      return Number(Math.round(value + "e" + 2) + "e-" + 2);
    }else{
      return Number(Math.round(value + "e" + 8) + "e-" + 8);
    }
  };



  const x_axis_x1_point = marginFor_x_fromLeft;
  const x_axis_y1_point = containerHeight - marginFor_y_fromBottom;
  const x_axis_x2_point = window_width - padding_from_screenBorder;
  const x_axis_y2_point = containerHeight - marginFor_y_fromBottom;



  const x_axis_actual_width = window_width - marginFor_x_fromLeft - padding_from_screenBorder;
  const gap_between_x_axis_ticks =
    x_axis_actual_width / (line_chart_data.length - 1);


  const y_axis_x1_point = marginFor_x_fromLeft;
  const y_axis_y1_point = padding_from_screenBorder;
  const y_axis_x2_point = marginFor_x_fromLeft;
  const y_axis_y2_point = containerHeight - marginFor_y_fromBottom;


  const y_min_value = 0;
  const y_max_value = Math.max.apply(
    Math,
    line_chart_data.map((item) => item.value),
  );

  const scaleY= scaleLinear().domain([0,y_max_value]).range([containerHeight,0]);

  const animated_x_axis_width = useRef(new Animated.Value(
    x_axis_x1_point,
  )).current;


  const animated_y_axis_width = useRef(new Animated.Value(
    y_axis_y2_point,
  )).current;

  const animated_circle_radius = useRef(new Animated.Value(
    0,
  )).current;

  const animated_ticks_labels_opacity = useRef(new Animated.Value(
    0,
  )).current;
  const animated_path_length = useRef(new Animated.Value(
    0,
  )).current;

  const animated_path_opacity = useRef(new Animated.Value(
    0
  )).current;


  const animated_field_opacity = useRef(new Animated.Value(
    0
  )).current;

  const gapBetweenYAxisValues = (y_max_value  ) / (line_chart_data.length -2)

  const y_axis_actual_height = y_axis_y2_point - y_axis_y1_point;

  const gap_between_y_axis_ticks = (y_axis_actual_height - y_min_value) / (line_chart_data.length - 1);

  const [yAxisLabels, setYAxisLabels] = useState([]);

  const animated_path_ref = useRef(null);
  const [pathLength,setPathLength] = useState(0);


  useEffect(() => {
    const yAxisData = line_chart_data.map((item, index) => {
      if (index === 0) {
        return round(y_min_value);
      } else {
        return round(y_min_value + gapBetweenYAxisValues * index);
      }
    });
    setYAxisLabels(yAxisData);

    start_axis_circle_animation();
    start_x_y_animation();
    start_x_y_ticks_labels_animation();
  }, []);




  useEffect(() => {
      animated_path_length.setValue(pathLength);
      Animated.timing(animated_path_opacity,{
        toValue:1,
        duration:100,
        useNativeDriver:true,
        easing:Easing.ease
      }).start();
      Animated.timing(animated_path_length,{
        toValue: 0,
        duration: 1500,
        useNativeDriver:true,
        easing:Easing.ease

      }).start();
      Animated.timing(animated_field_opacity,{
        toValue: 1,
        duration: 1500,
        useNativeDriver:true,
        easing:Easing.ease
      }).start();
  },[pathLength])

  const start_x_y_ticks_labels_animation = () => {
    Animated.timing(animated_ticks_labels_opacity, {
      toValue: 1,
      delay : 600,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }
  const start_x_y_animation = () => {
    Animated.timing(animated_x_axis_width, {
      toValue: x_axis_x2_point,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(animated_y_axis_width, {
      toValue: y_axis_y1_point,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
  };

  const start_axis_circle_animation = () => {
    Animated.timing(animated_circle_radius, {
      toValue: checkPointCircleRadius,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };




  const render_x_y_axis = () => {
    return (
      <G key="x-axis y-axis">
        <AnimatedCircle
          key="x-axis x1y1-circle"
          cx={x_axis_x1_point}
          cy={x_axis_y1_point}
          fill={circleColor}
          r={circleRadius}
        />
        <AnimatedCircle
          key="x-axis x2y2-circle"
          cx={x_axis_x2_point}
          cy={x_axis_y2_point}
          fill={circleColor}
          r={circleRadius}
        />
        <AnimatedCircle
          key="y-axis x1y1-circle"
          cx={y_axis_x1_point}
          cy={y_axis_y1_point}
          fill={circleColor}
          r={circleRadius}
        />
        <AnimatedLine key="x-axis"
                      x1={x_axis_x1_point}
                      y1={x_axis_y1_point}
                      x2={animated_x_axis_width}
                      y2={x_axis_y2_point}
                      stroke={axisColor}
                      strokeWidth={1} />

        <AnimatedLine key="y-axis"
                      x1={y_axis_x1_point}
                      y1={animated_y_axis_width}
                      x2={y_axis_x2_point}
                      y2={y_axis_y2_point}
                      stroke={axisColor}
                      strokeWidth={0} />
      </G>);
  };

  const render_x_label_and_ticks = () => {
    return line_chart_data.map((item, index) => {
      let x_point = x_axis_x1_point + gap_between_x_axis_ticks * index;
      return (
        <G key={"x-axis label and ticks" + index}>
          {showXAxisText &&<AnimatedLine
            key={"x-axis-tick" + index}
            x1={x_axis_x1_point + gap_between_x_axis_ticks * index}
            y1={x_axis_y1_point}
            x2={x_axis_x1_point + gap_between_x_axis_ticks * index}
            y2={x_axis_y2_point + 5}
            opacity={animated_ticks_labels_opacity}
            strokeWidth={axisWidth}
            stroke={axisColor} />}
          {showXAxisText &&<SvgText
            x={x_point}
            y={x_axis_y1_point + 20}
            fill={axisColor}
            fontSize={axisLabelFontSize}
            textAnchor={"middle"}
          >
            {item.time}
          </SvgText> }

        </G>
      );
    });
  };


  const render_y_label_and_ticks = () => {
    return yAxisLabels.map((item, index) => {
      let y_point = y_axis_y2_point - gap_between_y_axis_ticks * index;
      return (
        <G key={"y-axis labels and ticks" + index}>
          {showXAxisText && <AnimatedLine
            key={"y-axis tick" + index}
            x1={marginFor_x_fromLeft}
            y1={y_point}
            x2={animated_x_axis_width}
            y2={y_point}
            stroke={axisColor}
            strokeWidth={1}
            opacity={0.2}
          />}
          {showXAxisText && <AnimatedSvgText key={"y-axis label" + index}
                   x={marginFor_x_fromLeft + x_axis_actual_width}
                   y={y_point}
                   textAnchor={"end"}
                   fontSize={axisLabelFontSize}
                   opacity={animated_ticks_labels_opacity}
                   fill={axisColor}>
            {item}
          </AnimatedSvgText>}
        </G>);
    });
  };


  const getDPath = () => {
   const maxValueAtYAxis = yAxisLabels[yAxisLabels.length - 1 ];

   if(maxValueAtYAxis){
     let dPath = '';
     line_chart_data.map((item,index) => {
       let x_point = x_axis_x1_point + gap_between_x_axis_ticks * index;
       let y_point = (maxValueAtYAxis - item.value) * (gap_between_y_axis_ticks / gapBetweenYAxisValues)
         + padding_from_screenBorder;
       if(index === 0){
         dPath += `M${x_point} ${y_point}`
       }else {
         dPath += `L${x_point} ${y_point}`
       }
     })
     return dPath;
   }
  }

  const getDpathGradient = () => {
    const maxValueAtYAxis = yAxisLabels[yAxisLabels.length - 1 ];

    if(maxValueAtYAxis){
      let dPath = '';
      line_chart_data.map((item,index) => {
        let x_point = x_axis_x1_point + gap_between_x_axis_ticks * index ;
        let y_point = (maxValueAtYAxis - item.value) * (gap_between_y_axis_ticks / gapBetweenYAxisValues)
          + padding_from_screenBorder;
        if(index === 0){
          dPath += `M${x_point} ${y_point}`
        }else {
          dPath += `L${x_point} ${y_point}`
        }
      })
      return dPath +` L ${x_axis_actual_width +10} ${y_axis_actual_height + 20} L `+x_axis_x1_point +` ${y_axis_actual_height + 20}` ;
    }
  }

  const cWi = window_width -30;
  const cHei = containerHeight / 2;

  const render_lineChart_path = () => {
    const dPath = getDPath();
    return(
        <AnimatedPath
          d={dPath}
          ref={animated_path_ref}
          strokeWitdh={lineChartWidth}
          stroke={lineChartColor}
          onLayout={() => setPathLength(animated_path_ref?.current.getTotalLength())}
          strokeDasharray={pathLength}
          strokeDashoffset={animated_path_length}
        />

    )
  }


  const render_lineChart_circles = () => {
    const maxValueAtYAxis = yAxisLabels[yAxisLabels.length - 1 ];
      if(maxValueAtYAxis){
       return  line_chart_data.map((item,index) => {
          let x_point = x_axis_x1_point + gap_between_x_axis_ticks * index;
          let y_point = (maxValueAtYAxis - item.value) * (gap_between_y_axis_ticks / gapBetweenYAxisValues)
            + padding_from_screenBorder;
          return(
            <G key={"line chart circles"+index}>
              <AnimatedCircle
              cx={x_point}
              cy={y_point}
              r={animated_circle_radius}
              fill={circleColor}
              />
              <AnimatedLine
              key={`tooltip line${index}`}
              x1={x_point}
              y1={y_point - 10}
              x2={x_point}
              y2={y_point}
              stroke={lineChartColor}
              strokeWidth={lineChartWidth}
              />
              <Rect
                key={`tooltip rect${index}`}
                x={x_point - tooltipWidth / 2}
                y={y_point - tooltipHeight - 10}
                width={tooltipWidth}
                height={tooltipHeight}
                onPress={() => Alert.alert(`${item.time}: ${item.value}`)}
                fill={'#EFB90B'}
              />
              <AnimatedSvgText
                key={`tooltip text${index}`}
                x={x_point}
                dy={3}
                y={y_point - tooltipHeight / 2 - 10}
                fontSize={axisLabelFontSize}
                fontWeight={'400'}
                textAnchor={"middle"}
                fill={'black'}
              >{item.value}</AnimatedSvgText>
            </G>
          )
        })
      }
  }

  const cursor = useRef(null);
  const [xx,setXx] = useState(new Animated.Value(0));

  const moveCursor=(value) => {
    let  lineHeight =path.svgPathProperties(getDPath()).getTotalLength();
    const {x, y} = path.svgPathProperties(getDPath()).getPointAtLength(lineHeight- value);
    cursor.current?.setNativeProps({top:y-cursorRadius, left: x-cursorRadius})
    //console.log(scaleY.invert(y));
  }
  useEffect(()=>{
    xx.addListener(({ value }) =>  moveCursor(value));
    moveCursor(0 )
  },[pathLength])


  return (
    <View style={[styles.swgWrapper, { height: containerHeight}]} >
        <AnimatedSvg height="100%" width="100%" style={styles.svgStyle}>
          {showGradient &&
            <>
              <Defs>
                <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#9dd" />
                  <Stop offset="100%" stopColor="#11161D" />
                </LinearGradient>
              </Defs>
              <AnimatedPath d={getDpathGradient()}
                            opacity={animated_field_opacity}
                            fill={"url(#gradient)"}
                            stroke={"transparent"}/>
            </>
      }


          {render_x_y_axis()}
          {render_x_label_and_ticks()}
          {render_y_label_and_ticks()}

          {render_lineChart_path()}

          {renderCircleAndRect && render_lineChart_circles()}
          <View style={styles.cursor} ref={cursor}></View>
        </AnimatedSvg>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{width: path.svgPathProperties(getDPath()).getTotalLength() * 2}}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset : {
                   x:xx
                },
              },
            },
            ],
            {useNativeDriver : true}
          )}
          horizontal
        />
    </View>
  );
};

export default LineChart;
