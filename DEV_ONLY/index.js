import Highcharts from 'highcharts/highstock';
import React from 'react';
import {render} from 'react-dom';

import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

import App from './App';

HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
HighchartsHeatmap(Highcharts);
HighchartsSolidGauge(Highcharts);

const div = document.createElement('div');

document.body.appendChild(div);

document.body.style.boxSizing = 'border-box';
document.body.style.margin = 0;
document.body.style.padding = '0 15px';

render(<App />, div);
