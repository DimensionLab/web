export function generateMockData(points: number) {
  const data = []
  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - (5 * 365 * 24 * 60 * 60 * 1000)) // 5 years back
  const timeStep = (endDate.getTime() - startDate.getTime()) / points

  for (let i = 0; i < points; i++) {
    const timestamp = startDate.getTime() + (i * timeStep)
    data.push({
      timestamp,
      voltage: 10 + Math.random() * 2,
      current: 5 + Math.random() * 1,
      temperature: 25 + Math.random() * 5
    })
  }

  return data
}
