import * as _actions from './user.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface UserState {
  isAuthenticated: null | boolean
  user: {
    data: null | {
      name: string
      email: string
      password: string
    }
    loading: boolean
  }
}
