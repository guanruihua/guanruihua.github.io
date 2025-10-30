import { useLoadMultipleCSS, useLoadMultipleJS } from '@/hook'
import { Grid } from 'aurad'
import React from 'react'
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel'
// import BpmnJS from 'bpmn-js'

export const BpmnViewer = ({ xml }: any) => {
  const containerRef = React.useRef<any>(undefined)
  const propertiesPanelRef = React.useRef<any>(undefined)
  const viewerRef = React.useRef<any>(undefined)

  const init = () => {
    if (!xml || !containerRef.current || !propertiesPanelRef.current) return

    const modeler = new (window as any).BpmnJS({
      container: containerRef.current,
      propertiesPanel: {
        parent: propertiesPanelRef.current,
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
      ],
    })

    modeler.on('*', (event: any) => {
      console.log('事件触发:', event.type, event)
    })

    viewerRef.current = modeler
    modeler
      .importXML(xml)
      .then(() => {
        modeler.get('canvas').zoom('fit-viewport')
      })
      .catch((err: any) => {
        console.error('加载 BPMN 图表失败:', err)
      })

    // 事件监听
    // modeler.on('import.done', (event: any) => {
    //   console.log('图表导入完成', event)
    // })

    // modeler.on('element.click', (event) => {
    //   const element = event.element
    //   console.log('点击元素:', element)
    // })
  }

  useLoadMultipleJS(
    [
      // '/js/bpmn/18.8.0/bpmn-viewer.development.js'
      // '/js/bpmn/18.8.0/bpmn-modeler.development.js'
      '/js/bpmn/18.8.0/bpmn-modeler.production.min.js',
    ],
    init,
    () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    },
  )

  useLoadMultipleCSS([
    '/js/bpmn/18.8.0/css/bpmn.css',
    '/js/bpmn/18.8.0/css/bpmn-js.css',
    '/js/bpmn/18.8.0/css/diagram-js.css',
    '/js/bpmn-js-properties-panel/5.13.0/css/element-templates.css',
    '/js/bpmn-js-properties-panel/5.13.0/css/properties-panel.css',
  ])

  return (
    <Grid
      style={{
        height: 'calc(100vh - 68px)',
        gridTemplateColumns: '3fr 1fr',
      }}
    >
      <div
        ref={containerRef}
        style={{
          height: '100%',
        }}
      />
      <div
        ref={propertiesPanelRef}
        style={{
          height: '100%',
        }}
      ></div>
    </Grid>
  )
}
