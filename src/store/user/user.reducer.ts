import { Reducer } from '~/store/utils'
import { constants, UserState } from '.'

const initialState: UserState = {
  isAuthenticated: null,
  user: {
    data: null,
    loading: false,
  },
}

export const userReducer = new Reducer(initialState)
  .on(constants.LOGOUT, state => {
    state.isAuthenticated = false
    state.user.data = null
  })
  .on(constants.LOGIN.request, state => {
    state.user.loading = true
    state.user.data = null
  })
  .on(constants.LOGIN.success, (state, action) => {
    state.user.loading = false
    state.user.data = action.payload
  })
  .on(constants.LOGIN.failure, (state, action) => {
    state.user.loading = false
    state.user.data = null
  })
  .get()
