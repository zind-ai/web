export const today = new Date()
export const tomorrow = new Date(new Date().setDate(today.getDate() + 1))
export const yesterday = new Date(new Date().setDate(today.getDate() - 1))
