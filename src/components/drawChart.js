import React from 'react'
import dbResult from '../'

const drawChart = () => {

    let dbData = []

    for (let i = 0; i <= dbResult.length-1; i++) {
        dbData.push([])
        dbData[i].push(dbResult[i].Kön)
        dbData[i].push(dbResult[i].Startsumma)
        
    }

    // initialize the echarts instance
    var myChart = Echarts.init(document.getElementById('mainStats'));
    // Draw the chart
    myChart.setOption({
        title: {
            text: 'Age'
        },
        tooltip: {},
        xAxis: {
            data: ['v', 'h', 's'],
            dbData
        },
        yAxis: {},
        series: [{
            name: 'Ålder',
            type: 'scatter',
            data: dbData
        }]
    });

    return (
        <div>
            
        </div>
    )
}

export default drawChart
