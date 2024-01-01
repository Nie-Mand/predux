import { redirect, Saga } from '~/store/utils'
import { constants } from '.'
import * as api from './user.services'

export const loginSaga = new Saga(constants.LOGIN.request)
  .do(action => [api.getUser, action.payload.gender])
  .then(response => {
    return {
      type: constants.LOGIN.success,
      payload: response.results[0],
    }
  })
  .then(redirect('/bye'))
  .catch(constants.LOGIN.failure)
  .get()
