export const getBricks = (scene: Phaser.Scene, conf: any) => {
  const repeat = 4
  const x = 80

  return [
    scene.physics.add.group({
      key: 'brick1',
      repeat,
      immovable: true,
      setXY: {
        x,
        y: 40,
        stepX: 70,
      },
    }),
    scene.physics.add.group({
      key: 'brick2',
      repeat,
      immovable: true,
      setXY: {
        x,
        y: 90,
        stepX: 70,
      },
    }),
    scene.physics.add.group({
      key: 'brick3',
      repeat,
      immovable: true,
      setXY: {
        x,
        y: 140,
        stepX: 70,
      },
    }),
    // scene.physics.add.group({
    //   key: 'brick1',
    //   repeat: 9,
    //   immovable: true,
    //   setXY: {
    //     x: 80,
    //     y: 190,
    //     stepX: 70,
    //   },
    // }),
  ]
}
