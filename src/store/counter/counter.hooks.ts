import { useSelector, useDispatch } from 'react-redux'

import { actions, CounterState } from '.'

export const useCounter = () => {
  const dp = useDispatch()

  const reset = () => dp(actions.reset())
  const increment = () => dp(actions.increment())
  const add = (amount: number) => dp(actions.add(amount))
  const state = useSelector((state: { counter: CounterState }) => state.counter)

  return {
    state,
    reset,
    increment,
    add,
  }
}
