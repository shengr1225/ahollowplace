import React from 'react'
var chartSize = 450
const numberOfScales = 4
const captionOffsetX = -15
const scale = (value) => (
  <circle
    key={`scale-${value}`}
    cx={0}
    cy={0}
    r={((value / numberOfScales) * chartSize) / 2}
    fill="#FAFAFA"
    stroke="#999"
    strokeWidth="0.2"
  />
)
const polarToX = (angle, distance) => Math.cos(angle - Math.PI / 2) * distance
const polarToY = (angle, distance) => Math.sin(angle - Math.PI / 2) * distance
const pathDefinition = (points) => {
  let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4)
  for (let i = 1; i < points.length; i++) {
    d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4)
  }
  return d + 'z'
}
const shape = (columns) => (chartData, i) => {
  const data = chartData
  return (
    <path
      key={`shape-${i}`}
      d={pathDefinition(
        columns.map((col) => {
          const value = data[col.key]
          return [
            polarToX(col.angle, (value * chartSize) / 2),
            polarToY(col.angle, (value * chartSize) / 2),
          ]
        })
      )}
      stroke={`#edc951`}
      fill={`#edc951`}
      fillOpacity=".5"
    />
  )
}
const points = (points) => {
  return points
    .map((point) => point[0].toFixed(4) + ',' + point[1].toFixed(4))
    .join(' ')
}
const axis = () => (col, i) =>
  (
    <polyline
      key={`poly-axis-${i}`}
      points={points([
        [0, 0],
        [
          polarToX(col.angle, chartSize / 2),
          polarToY(col.angle, chartSize / 2),
        ],
      ])}
      stroke="#555"
      strokeWidth=".2"
    />
  )
const caption = () => (col) =>
  (
    <text
      key={`caption-of-${col.key}`}
      x={(polarToX(col.angle, chartSize / 2 + 15) + captionOffsetX).toFixed(4)}
      y={polarToY(col.angle, (chartSize / 2 + 15) * 0.95).toFixed(4)}
      dy={10 / 2}
      fill="#444"
      fontWeight="bold"
      textshadow="1px 1px 0 #fff"
    >
      {col.key}
    </text>
  )
const RadarChart = (props) => {
  chartSize = props.size
  const data = props.data
  const groups = []
  const scales = []
  for (let i = numberOfScales; i > 0; i--) {
    scales.push(scale(i))
  }
  groups.push(<g key={`scales`}>{scales}</g>)
  const middleOfChart = (chartSize / 2).toFixed(4)
  const captions = Object.keys(data[0])
  const columns = captions.map((key, i, all) => {
    return {
      key,
      angle: (Math.PI * 2 * i) / all.length,
    }
  })
  groups.push(<g key={`group-captions`}>{columns.map(caption())}</g>)
  groups.push(<g key={`group-axes`}>{columns.map(axis())}</g>)
  groups.push(<g key={`groups}`}>{data.map(shape(columns))}</g>)

  return (
    <svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={chartSize}
      height={chartSize}
      viewBox={`-25 -25 ${chartSize + 50} ${chartSize + 50}`}
      className="mx-auto"
    >
      <g transform={`translate(${middleOfChart},${middleOfChart})`}>{groups}</g>
    </svg>
  )
}
export default RadarChart
