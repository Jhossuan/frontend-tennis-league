"use client"
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

type GraphicsProps = {
    data: any
    title?: string
    isLoading:boolean
    type?: 'bar' | 'line'
    horizontal?: boolean
    style?: any
    width?: any
    component?: any
    secondTitle?: string
    includeCard?: boolean
}

const BarChart = ({data, title, isLoading, type, horizontal, style, width, component, secondTitle, includeCard}: GraphicsProps) => {
const dataChart = () => {
    const Data = data?.filter((item: any) => item?._id !== null && item?._id !== "" && item._id !== undefined)
    const chart = Data?.map((charts: any) => ({
    x: (charts?._id).toUpperCase(),
    y: charts?.count
    }))
    return chart
}

const options: ApexOptions = {
    chart: {
    stacked: true,
    },
    plotOptions: {
        bar: {
        horizontal: horizontal
        }
    }
};

const series = [{
    data: dataChart()
}]

const Data = (
    <>
        {
            isLoading
            ? 'Cargando ...'
            : <Chart options={options} series={series} type={type || 'bar'} width='100%' height='200%' />
        }
    </>
)


    return (
            <div style={{ width:'100%' }}>
                { Data }
            </div>
    )
}

export default BarChart