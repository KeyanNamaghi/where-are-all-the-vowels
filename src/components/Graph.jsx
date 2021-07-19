import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useSelector } from 'react-redux'
import { averageFromData } from '../utils/utils'

const MyResponsiveLine = () => {
  const { translations } = useSelector((state) => state)
  const dataEn = []
  const dataCy = []

  translations.forEach((value, index) => {
    dataEn.push({
      x: index + 1,
      y: value.enPercentage
    })
    dataCy.push({
      x: index + 1,
      y: value.cyPercentage
    })
  })

  const data = [
    {
      id: 'English',
      data: dataEn
    },
    {
      id: 'Welsh',
      data: dataCy
    }
  ]

  return (
    <>
      <div
        style={{
          height: 300,
          width: '100%',
          color: 'black',
          fontSize: '12px'
        }}
      >
        <ResponsiveLine
          data={data}
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: '#3f51b5'
                },
                text: {
                  fill: 'white'
                }
              },
              legend: {
                text: {
                  fill: 'white'
                }
              }
            },
            grid: {
              line: {
                stroke: 'red',
                strokeWidth: 2,
                strokeDasharray: '4 4'
              }
            },
            legends: {
              text: {
                fill: '#333333'
              }
            }
          }}
          margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
          xScale={{ type: 'linear', min: 1 }}
          yScale={{ type: 'linear', min: 0, max: 100 }}
          curve="monotoneX"
          axisTop={null}
          axisRight={{
            tickValues: [0, 20, 40, 60, 80, 100],
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: '.2s',
            legend: '',
            legendOffset: 0
          }}
          axisLeft={{
            tickValues: [0, 20, 40, 60, 80, 100],
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: '.2s',
            legend: 'percentage',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          axisBottom={{
            format: (e) => Math.floor(e) === e && e
          }}
          enableGridX={false}
          colors={['#ffffff', '#f00000']}
          lineWidth={1}
          pointSize={4}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          pointBorderColor={{ from: 'serieColor' }}
          enablePointLabel={false}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          gridXValues={[0, 20, 40, 60, 80, 100, 120]}
          gridYValues={[]}
          legends={[
            {
              itemTextColor: '#ffffff',
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 140,
              translateY: 0,
              itemsSpacing: 10,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 12,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
      <div
        style={{
          fontSize: '12px'
        }}
      >
        <p>
          Using {dataEn.length} word{dataEn.length > 1 ? 's' : ''}:
        </p>
        <p>English average: {averageFromData(dataEn)}%</p>
        <p>Welsh average: {averageFromData(dataCy)}%</p>
      </div>
    </>
  )
}

export default MyResponsiveLine
