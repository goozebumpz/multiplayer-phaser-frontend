type Point = { x: number; y: number }

export const getAngle = (pointFirst: Point, pointSecond: Point) => {
    const dX: number =
        pointSecond.x > pointFirst.x
            ? Math.abs(pointSecond.x - pointFirst.x)
            : Math.abs(pointFirst.x - pointSecond.x)
    const dY: number =
        pointSecond.y > pointFirst.y
            ? Math.abs(pointSecond.y - pointFirst.y)
            : Math.abs(pointFirst.y - pointSecond.y)

    return {
        dX,
        dY,
    }
}

export const getRelativePositionPoints = (
    pointFirstX: Pick<Point, 'x'>,
    pointSecondX: Pick<Point, 'x'>
) => {
    return pointFirstX.x > pointSecondX.x
}
