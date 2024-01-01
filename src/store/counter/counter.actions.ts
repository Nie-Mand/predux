export const constants = {
  RESET: 'RESET',
  INCREMENT: 'INCREMENT',
  ADD: 'ADD',
}

export const reset = () => {
  return { type: constants.RESET }
}

export const increment = () => {
  return { type: constants.INCREMENT }
}

export const add = (amount: number) => {
  return { type: constants.ADD, payload: { amount } }
}
