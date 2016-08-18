import { colors } from '../components/constants'

export const getFillColor = (type, value) => {
  const typeColor = colors[type]

  switch (type) {
    case 'boolean':
      const valueColor = colors[value]
      return value && valueColor ? valueColor : typeColor
    default:
      return typeColor
  }
}
