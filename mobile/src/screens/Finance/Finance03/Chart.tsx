import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { useTheme } from "@ui-kitten/components";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
// ----------------------------- Components && Elements -----------------------
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryTooltip,
} from "victory-native";
import { Defs, LinearGradient, Stop, Svg } from "react-native-svg";

interface IChartProps {
  data: { x: string; y: number }[];
}

const Chart = React.memo(({ data }: IChartProps) => {
  const theme = useTheme();
  const { height, width, top, bottom } = useLayout();

  return (
    <>
      <Svg height={200 * (height / 812)}>
        <Defs>
          <LinearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={"#3366FF"} stopOpacity={0.7} />
            <Stop offset="100%" stopColor={"#3366FF"} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <VictoryChart
          standalone={false}
          width={width - 54}
          domainPadding={{ x: [0, 0], y: [0, 20] }}
          height={200 * (height / 812)}
          padding={{ top: 20, bottom: 0, left: 0, right: 4 }}
          maxDomain={{ x: 5 }}
        >
          <VictoryArea
            standalone={false}
            height={160}
            style={{
              data: {
                fill: "url(#linear)",
                fillOpacity: 1,
                stroke: "#3366FF",
                strokeWidth: 2,
              },
            }}
            data={data}
            interpolation="natural"
          />
          <VictoryAxis
            domainPadding={{ x: [12, 0], y: [0, 0] }}
            style={{
              axis: { stroke: "transparent" },
              tickLabels: {
                fontSize: 12,
                padding: 6,
                fontWeight: "600",
              },
            }}
          />
          <VictoryScatter
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                dy={-4}
                constrainToVisibleArea
                style={{ fill: theme["text-white-color"] }}
                flyoutStyle={{
                  fill: theme["text-primary-color"],
                  strokeWidth: 0,
                }}
              />
            }
            data={data}
            style={{
              data: { fill: "#3366FF", strokeWidth: 1.4, stroke: "#FFFFFF" },
            }}
            size={5}
          />
        </VictoryChart>
      </Svg>
    </>
  );
});

export default Chart;
