type Point = { x: number; y: number }

export const getAngle = (
  pointFirst: Point,
  pointSecond: Point
) => {
  const dY: number = pointSecond.y > pointFirst.y
    ? Math.abs(pointSecond.y - pointFirst.y)
    : Math.abs(pointFirst.y - pointSecond.y)
  const dX: number = pointSecond.x > pointFirst.x
    ? Math.abs(pointSecond.x - pointFirst.x)
    : Math.abs(pointFirst.x - pointSecond.x)

  console.log(dY, 'dy')
  console.log(dX, 'dx')
}

export const getRelativePositionPoints = (
  pointFirst: Point,
  pointSecond: Point
) => {
  return pointFirst.x > pointSecond.x
}

