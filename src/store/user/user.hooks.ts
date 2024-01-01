import { useSelector, useDispatch } from 'react-redux'

import { actions, UserState } from '.'

export const useUser = () => {
  const dp = useDispatch()

  const logout = () => dp(actions.logout())
  const login = (gender: string) => dp(actions.login(gender))
  const state = useSelector((state: { counter: UserState }) => state.counter)

  return {
    state,
    login,
    logout,
  }
}
