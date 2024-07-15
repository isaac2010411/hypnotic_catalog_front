export const formatNumber = (number) => {
    return number.toLocaleString('es-ar', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    })
  }


