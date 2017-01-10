import Highcharts from 'highcharts/highstock';
import React from 'react';
import {
  render
} from 'react-dom';
import measure from 'remeasure';

import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

import createConfig from '../src/index';

HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
HighchartsHeatmap(Highcharts);
HighchartsSolidGauge(Highcharts);

const BLUE = '#0077be';
const RED = '#d70000';
const GREEN = '#009150';
const YELLOW = '#ffef00';

const TOKYO_TEMPERATURE_DATA = {
  name: 'Tokyo',
  data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
};
const NEW_YORK_TEMPERATURE_DATA = {
  name: 'New York',
  data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
};
const BERLIN_TEMPERATURE_DATA = {
  name: 'Berlin',
  data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
};
const LONDON_TEMPERATURE_DATA = {
  name: 'London',
  data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
};

const FRUIT_CONSUMPTION_VOLUME_DATA = [
  {
    name: 'Jane',
    data: [3, 2, 1, 3, 4]
  }, {
    name: 'John',
    data: [2, 3, 5, 7, 6]
  }, {
    name: 'Joe',
    data: [4, 3, 3, 9, 0]
  }
];
const FRUIT_CONSUMPTION_AVERAGE_DATA = {
  name: 'Average',
  data: [3, 2.67, 3, 6.33, 3.33],
  marker: {
    lineWidth: 2,
    fillColor: 'white'
  }
};
const FRUIT_CONSUMPTION_BREAKDOWN_DATA = {
  name: 'Total consumption',
  data: [
    {
      name: 'Jane',
      y: 13
    }, {
      name: 'John',
      y: 23
    }, {
      name: 'Joe',
      y: 19
    }
  ],
  center: [
    100,
    80
  ],
  size: 100,
  showInLegend: false,
  dataLabels: {
    enabled: false
  }
};
const SPEED_DATA = {
  name: 'Speed',
  data: [80],
  dataLabels: {
    format: '<div style="text-align:center;width:100px"><span style="font-size:36px;color:black">{y}</span><br/>' +
      '<span style="font-size:12px;color:silver">km/h</span></div>'
  },
  tooltip: {
    valueSuffix: ' km/h'
  }
};
const BOX_PLOT_DATA = [
  {
    name: 'Observations',
    data: [
      [760, 801, 848, 895, 965],
      [733, 853, 939, 980, 1080],
      [714, 762, 817, 870, 918],
      [724, 802, 806, 871, 950],
      [834, 836, 864, 882, 910]
    ],
    tooltip: {
      headerFormat: '<em>Experiment No {point.key}</em><br/>'
    }
  }, {
    name: 'Outlier',
    color: Highcharts.getOptions().colors[0],
    type: 'scatter',
    data: [ // x, y positions where 0 is the first category
      [0, 644],
      [4, 718],
      [4, 951],
      [4, 969]
    ],
    marker: {
      fillColor: 'white',
      lineWidth: 1,
      lineColor: Highcharts.getOptions().colors[0]
    },
    tooltip: {
      pointFormat: 'Observation: {point.y}'
    }
  }
];
const EMPLOYEE_SALES_DATA = {
  name: 'Sales per employee',
  borderWidth: 1,
  data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117],
    [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114],
    [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32],
    [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31],
    [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84],
    [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
  dataLabels: {
    enabled: true,
    color: '#000000'
  }
};

const defaultConfig = createConfig()
  .colors([BLUE, RED, GREEN, YELLOW])
  .legend({
    align: 'right',
    borderWidth: 0,
    layout: 'vertical',
    verticalAlign: 'middle'
  });

const splineConfig = defaultConfig
  .remove('colors')
  .title({
    text: 'Monthly Average Temperature',
    x: -20
  })
  .subtitle({
    text: 'Source: WorldClimate.com',
    x: -20
  })
  .xAxis('categories', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
  .yAxis('plotLines[0]', {
    color: '#808080',
    value: 0,
    width: 1
  })
  .yAxis('title.text', 'Temperature (C)')
  .tooltip('valueSuffix', 'C')
  .addChart('spline', TOKYO_TEMPERATURE_DATA)
  .addChart('spline', BERLIN_TEMPERATURE_DATA)
  .addChart('spline', LONDON_TEMPERATURE_DATA)
  .addChart('spline', NEW_YORK_TEMPERATURE_DATA);

const mixtureConfig = defaultConfig
  .title('text', 'Combination chart')
  .xAxis('categories', ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums'])
  .labels('items[0]', {
    html: 'Total fruit consumption',
    style: {
      left: 50,
      top: 18,
      color: 'black'
    }
  })
  .addChart('column', FRUIT_CONSUMPTION_VOLUME_DATA)
  .addChart('spline', FRUIT_CONSUMPTION_AVERAGE_DATA)
  .addChart('pie', FRUIT_CONSUMPTION_BREAKDOWN_DATA);

const gaugeConfig = defaultConfig
  .credits('enabled', false)
  .pane({
    background: {
      backgroundColor: '#eee',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    },
    center: ['50%', '85%'],
    endAngle: 90,
    size: '140%',
    startAngle: -90
  })
  .plotOptions('solidgauge.dataLabels', {
    borderWidth: 0,
    useHTML: true,
    y: 5
  })
  .tooltip('enabled', false)
  .yAxis({
    stops: [
      [0.25, GREEN],
      [0.5, YELLOW],
      [0.75, RED]
    ],
    lineWidth: 0,
    max: 200,
    min: 0,
    minorTickInterval: null,
    tickAmount: 2,
    title: {
      text: 'Speed',
      y: -145
    },
    labels: {
      y: 16
    }
  })
  .addChart('solidgauge', SPEED_DATA);

console.log(gaugeConfig);

const boxplotConfig = defaultConfig
  .title('text', 'Box Plot')
  .legend('enabled', false)
  .xAxis({
    categories: ['1', '2', '3', '4', '5'],
    'title.text': 'Experiment No. '
  })
  .yAxis({
    plotLines: [{
      value: 932,
      color: RED,
      width: 1,
      label: {
        text: 'Theoretical mean: 932',
        align: 'center',
        style: {
          color: 'gray'
        }
      }
    }],
    'title.text': 'Observations'
  })
  .addChart('boxplot', BOX_PLOT_DATA);

const heatmapConfig = defaultConfig
  .chart({
    marginBottom: 40,
    marginTop: 40,
    plotBorderWidth: 1
  })
  .colors([
    '#d5d5d5'
  ])
  .colorAxis({
    min: 0,
    minColor: '#ffffff',
    maxColor: GREEN
  })
  .legend({
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    symbolHeight: 280
  })
  .title('text', 'Sales per employee per weekday')
  .tooltip({
    formatter() {
      return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
        this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
    }
  })
  .xAxis('categories', ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'])
  .yAxis({
    categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  })
  .addChart('heatmap', EMPLOYEE_SALES_DATA);

@measure('width', {flatten: true})
class App extends React.Component {
  componentDidMount() {
    this.configs = {
      boxplot: boxplotConfig,
      gauge: gaugeConfig,
      heatmap: heatmapConfig,
      line: splineConfig,
      mixture: mixtureConfig
    };

    setInterval(() => {
      const random = ~~(Math.random() * 200);

      this.charts.gauge.series[0].points[0].update(random);
    }, 3000);

    this.setCharts();
  }

  componentDidUpdate() {
    this.setCharts();
  }

  charts = {};
  configs = {};

  setCharts = () => {
    const {
      width
    } = this.props;

    Object.keys(this.configs).forEach((ref) => {
      this.configs[ref] = this.configs[ref].chart('width', width);

      this.charts[ref] = Highcharts.chart(this.refs[ref], this.configs[ref].get());
    });
  };

  render() {
    return (
      <div ref="container">
        <h1>
          App
        </h1>

        <h4>
          Multiline
        </h4>

        <div ref="line"/>

        <h4>
          Mixture
        </h4>

        <div ref="mixture"/>

        <h4>
          Gauge
        </h4>

        <div ref="gauge"/>

        <h4>
          Box Plot
        </h4>

        <div ref="boxplot"/>

        <h4>
          Heat Map
        </h4>

        <div ref="heatmap"/>
      </div>
    );
  }
}

const div = document.createElement('div');

render((
  <App/>
), div);

document.body.appendChild(div);

document.body.style.boxSizing = 'border-box';
document.body.style.margin = 0;
document.body.style.padding = '0 15px';
