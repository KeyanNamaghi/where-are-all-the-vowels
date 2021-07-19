import { vowelPercentage } from './utils/utils'

test('Yn tywynnu', () => {
  const cy = vowelPercentage('Yn tywynnu', true)
  const en = vowelPercentage('Yn tywynnu')
  expect(cy).toBe(55.56)
  expect(en).toBe(11.11)
})

test('Wy', () => {
  const cy = vowelPercentage('Wy', true)
  const en = vowelPercentage('Wy')
  expect(cy).toBe(100)
  expect(en).toBe(0)
})
