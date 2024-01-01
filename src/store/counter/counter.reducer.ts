import { Reducer } from '~/store/utils'
import { constants, CounterState } from '.'

const initialState: CounterState = {
  count: 69,
}

export const counterReducer = new Reducer(initialState)
  .on(constants.RESET, state => {
    state.count = 0
  })
  .on(constants.INCREMENT, state => {
    state.count++
  })
  .on(constants.ADD, (state, action) => {
    state.count += action.payload.amount
  })
  .get()
