import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function echartInit (node, xData, sData, title) {
    const myChart = echarts.init(node);
    // 绘制图表
    myChart.setOption({
        title: {
            text: title
        },
        tooltip: {},
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: sData
            }
        ]
    })
}

function Bar ({ style, xData, sData, title}) {
    // 先不考虑传参，直接在页面中渲染静态数据
    // 把用户可能定制的参数，抽象 props （ 1. 定制大小； 2. data 及说明文字）
    const nodeRef = useRef(null);
    useEffect(() => {
        echartInit(nodeRef.current, xData, sData, title)
    }, [xData, sData]);
    return (
        <div ref={nodeRef} style={style}></div>
    ) 
}

export default Bar;