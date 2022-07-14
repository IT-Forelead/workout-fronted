export function arrivalTypeTranslate(type) {
    switch (type) {
      case 'come_in':
        return 'Keldi'
      case 'go_out':
        return 'Ketti'
      default:
        return ''
    }
  }