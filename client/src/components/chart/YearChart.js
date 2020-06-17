import React, {useEffect} from 'react'
import Chart from 'react-google-charts'
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import {getChartByYear} from '../../actions/chart'

const YearChart = ({year, getChartByYear, chart: {chart, loading}}) => {
  useEffect(() => {
    getChartByYear(year)
  }, [year])
  console.log('chart', chart)
  const data = [
    ['Element', 'Количество поверок', {role: 'style'}],
    ['Январь', chart[0], '#007BFF'],
    ['Февраль', chart[1], '#007BFF'],
    ['Март', chart[2], '#007BFF'],
    ['Апрель', chart[3], '#007BFF'],
    ['Май', chart[4], '#007BFF'],
    ['Июнь', chart[5], '#007BFF'],
    ['Июль', chart[6], '#007BFF'],
    ['Август', chart[7], '#007BFF'],
    ['Сентябрь', chart[8], '#007BFF'],
    ['Октябрь', chart[9], '#007BFF'],
    ['Ноябрь', chart[10], '#007BFF'],
    ['Декабрь', chart[11], '#007BFF'],
  ]

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  chart: state.chart,
})

export default connect(mapStateToProps, {getChartByYear})(YearChart)
