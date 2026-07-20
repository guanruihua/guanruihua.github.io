import * as BABYLON from '@babylonjs/core'
import { GridMaterial } from '@babylonjs/materials/Grid'

const genCamera = (canvas: HTMLCanvasElement, scene: BABYLON.Scene) => {
  // 创建一个摄像机，并将其放置在场景中
  const camera = new BABYLON.FreeCamera(
    'camera1',
    new BABYLON.Vector3(0, 3, -10),
    scene,
  )
  // 摄像机指向场景的原点
  camera.setTarget(BABYLON.Vector3.Zero())
  // 使摄像机响应鼠标和键盘事件
  camera.attachControl(canvas, true)
}

export const load = () => {
  // 获取 canvas 元素
  const canvas: HTMLCanvasElement | null =
    document.querySelector('.renderCanvas')
  if (!canvas) return
  // 初始化 Babylon.js 引擎
  const engine = new BABYLON.Engine(canvas, true)

  const createScene = function () {
    // 创建一个场景
    const scene = new BABYLON.Scene(engine)
    // const box = BABYLON.MeshBuilder.CreateBox('box', {})
    // scene.createDefaultCameraOrLight(true, true, true)
    // scene.createDefaultEnvironment()

    genCamera(canvas, scene)

    // 创建一个简单的环境光源
    const light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(0, 1, 0),
      scene,
    )
    // 设置光源的强度
    light.intensity = 0.9

    // 1. 创建一个地面
    const ground = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 100, height: 100 },
      scene,
    )

    // 2. 创建网格材质并应用到地面
    const gridMat = new GridMaterial('gridMaterial', scene)
    gridMat.mainColor = new BABYLON.Color3(0.2, 0.2, 0.3) // 深蓝灰色背景
    // gridMat.lineColor = new BABYLON.Color3(1, 1, 0) // 亮黄色线条
    gridMat.gridRatio = 0.5 // 更密集的网格
    gridMat.majorUnitFrequency = 5 // 每5条线一条主线
    ground.material = gridMat

    // 创建一个立方体
    // const box = BABYLON.MeshBuilder.CreateBox('box', { size: 1 }, scene)
    // 将立方体移动到场景的 (0, 1, 0) 位置
    // box.position.y = 1
    // 创建一个材质，并将其应用到球体上
    const material = new BABYLON.StandardMaterial('material', scene)
    material.diffuseColor = new BABYLON.Color3(0, 1, 0)
    // box.material = material

    const sphere = BABYLON.MeshBuilder.CreateSphere(
      'sphere',
      { segments: 8, diameter: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
      scene,
    )
    sphere.position.x = 2.5

    const sphere2 = BABYLON.MeshBuilder.CreateSphere(
      'sphere',
      { segments: 32, diameter: 1 },
      scene,
    )
    sphere2.position.x = 5.5

    const sphere3 = BABYLON.MeshBuilder.CreateSphere(
      'sphere',
      {
        arc: 0.25,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        // segments: 32, diameter: 1
      },
      scene,
    )

    // const sphere = BABYLON.MeshBuilder.CreateSphere(
    //   'sphere',
    //   { segments: 32, diameterX: 2 },
    //   scene,
    // )

    // const sphere = BABYLON.MeshBuilder.CreateSphere(
    //   'sphere',
    //   { segments: 32, diameterY: 2 },
    //   scene,
    // )

    // const sphere = BABYLON.MeshBuilder.CreateSphere(
    //   'sphere',
    //   { segments: 32, diameter: 2 },
    //   scene,
    // )

    return scene
  }
  // 创建场景
  const scene = createScene()
  // 注册一个渲染循环，以便在每一帧都渲染场景
  engine.runRenderLoop(function () {
    scene.render()
  })
  // 监听窗口大小变化，调整引擎的大小
  window.addEventListener('resize', function () {
    engine.resize()
  })
}
