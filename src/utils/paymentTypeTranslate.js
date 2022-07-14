export function paymentTypeTranslate(type) {
    switch (type) {
      case 'daily':
        return 'Kunlik to\'lov'
      case 'monthly':
        return 'Oylik to\'lov'
      default:
        return ''
    }
  }