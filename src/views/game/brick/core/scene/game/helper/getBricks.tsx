export const getBricks = (scene: Phaser.Scene) => {
  return [
    scene.physics.add.group({
      key: 'brick1',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 40,
        stepX: 70,
      },
    }),
    scene.physics.add.group({
      key: 'brick2',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 90,
        stepX: 70,
      },
    }),
    scene.physics.add.group({
      key: 'brick3',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
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