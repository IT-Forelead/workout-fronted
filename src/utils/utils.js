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

export function paymentTypeTranslate(type) {
  switch (type) {
    case 'daily':
      return "Kunlik to'lov"
    case 'monthly':
      return "Oylik to'lov"
    default:
      return ''
  }
}

export function paymentStatusTranslate(type) {
  switch (type) {
    case 'not_paid':
      return "To'lanmagan"
    case 'partially_paid':
      return "Qisman to'langan"
    case 'fully_paid':
      return "To'liq to'langan"
    case 'canceled':
      return "Bekor qilingan"
  }
}

export function paymentStatusClass(type) {
  switch (type) {
    case 'not_paid':
      return 'bg-red-500 text-white'
    case 'partially_paid':
      return 'bg-yellow-300 text-black'
    case 'fully_paid':
      return 'bg-green-500 text-white'
    case 'canceled':
      return 'bg-teal-500 text-white'
  }
}

export function cleanObjectEmptyFields(obj) {
  for (let propName in obj) {
    if (!obj[propName]) {
      delete obj[propName]
    }
  }
  return obj
}

export function phoneStyle(phone) {
  return `${phone.slice(0, 4)} (${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(9, 11)}-${phone.slice(11, 13)}`
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

export function formatDateTime(date) {
  date = new Date(date)
  return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/') + ' ' + [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
}

export function formatDate(date) {
  date = new Date(date)
  return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/')
}
