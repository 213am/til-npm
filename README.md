# Nivo chart

- [Nivo Git](https://github.com/plouc/nivo#readme)
- [Nivo](https://nivo.rocks/)

## 설치

- `npm i @nivo/core`

## 사이트에서 원하는 차트의 모양을 보고 별도의 설치 추가

- 만약 Line 차트라면 `npm i @nivo/line` 추가
- 만약 Bar 차트라면 `npm i @nivo/bar` 추가

## Line 차트 실습

```jsx
import { ResponsiveLine } from "@nivo/line";

const getData = [
  {
    id: "japan",
    color: "hsl(21, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 207,
      },
      {
        x: "helicopter",
        y: 13,
      },
      {
        x: "boat",
        y: 90,
      },
      {
        x: "train",
        y: 118,
      },
      {
        x: "subway",
        y: 98,
      },
      {
        x: "bus",
        y: 260,
      },
      {
        x: "car",
        y: 35,
      },
      {
        x: "moto",
        y: 31,
      },
      {
        x: "bicycle",
        y: 211,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 96,
      },
      {
        x: "others",
        y: 281,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(20, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 197,
      },
      {
        x: "helicopter",
        y: 188,
      },
      {
        x: "boat",
        y: 220,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 227,
      },
      {
        x: "bus",
        y: 1,
      },
      {
        x: "car",
        y: 235,
      },
      {
        x: "moto",
        y: 190,
      },
      {
        x: "bicycle",
        y: 98,
      },
      {
        x: "horse",
        y: 111,
      },
      {
        x: "skateboard",
        y: 185,
      },
      {
        x: "others",
        y: 42,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(72, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 114,
      },
      {
        x: "helicopter",
        y: 36,
      },
      {
        x: "boat",
        y: 67,
      },
      {
        x: "train",
        y: 75,
      },
      {
        x: "subway",
        y: 183,
      },
      {
        x: "bus",
        y: 297,
      },
      {
        x: "car",
        y: 230,
      },
      {
        x: "moto",
        y: 157,
      },
      {
        x: "bicycle",
        y: 92,
      },
      {
        x: "horse",
        y: 168,
      },
      {
        x: "skateboard",
        y: 90,
      },
      {
        x: "others",
        y: 229,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(24, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 75,
      },
      {
        x: "helicopter",
        y: 96,
      },
      {
        x: "boat",
        y: 37,
      },
      {
        x: "train",
        y: 74,
      },
      {
        x: "subway",
        y: 220,
      },
      {
        x: "bus",
        y: 36,
      },
      {
        x: "car",
        y: 165,
      },
      {
        x: "moto",
        y: 59,
      },
      {
        x: "bicycle",
        y: 277,
      },
      {
        x: "horse",
        y: 274,
      },
      {
        x: "skateboard",
        y: 287,
      },
      {
        x: "others",
        y: 4,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(271, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 28,
      },
      {
        x: "helicopter",
        y: 159,
      },
      {
        x: "boat",
        y: 190,
      },
      {
        x: "train",
        y: 244,
      },
      {
        x: "subway",
        y: 36,
      },
      {
        x: "bus",
        y: 257,
      },
      {
        x: "car",
        y: 125,
      },
      {
        x: "moto",
        y: 107,
      },
      {
        x: "bicycle",
        y: 168,
      },
      {
        x: "horse",
        y: 130,
      },
      {
        x: "skateboard",
        y: 209,
      },
      {
        x: "others",
        y: 295,
      },
    ],
  },
];

function App() {
  return (
    <div style={{ width: "80%", height: 500, margin: "0 auto" }}>
      <ResponsiveLine
        data={getData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={false}
      />
    </div>
  );
}
export default App;
```
