import { async } from '~/store/utils'

export const constants = {
  LOGIN: async('LOGIN'),
  LOGOUT: 'LOGOUT',
}

export const login = (gender: string) => {
  return {
    type: constants.LOGIN.request,
    payload: {
      gender,
    },
  }
}

export const logout = () => {
  return {
    type: constants.LOGOUT,
  }
}
