import * as echarts from 'echarts/core'
// import { echarts } from 'aurad'

import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  EffectScatterSeriesOption,
  MapSeriesOption,
  LinesSeriesOption,
} from 'echarts/charts'
import {
  BarChart,
  LineChart,
  PieChart,
  EffectScatterChart,
  MapChart,
  LinesChart,
  GraphChart,
  ScatterChart,
} from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption,
  VisualMapComponentOption,
} from 'echarts/components'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  VisualMapComponent,
  DataZoomComponent,
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | EffectScatterSeriesOption
  | MapSeriesOption
  | LinesSeriesOption
  | VisualMapComponentOption
>

// Register the required components
echarts.use([
  GraphChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  EffectScatterChart,
  MapChart,
  LineChart,
  LinesChart,
  VisualMapComponent,
  DataZoomComponent,
  ScatterChart,
])

export { echarts }
