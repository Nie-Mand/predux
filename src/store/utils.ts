import produce from 'immer'
import { call, put, takeLatest } from 'redux-saga/effects'
export { push as redirect } from 'redux-first-history'

export type AsyncActionType = {
  failure: string
  success: string
  request: string
  reset: string
}

export type Action = {
  type: string
  payload?: any
}

export const async = (actionName: string) => ({
  failure: `${actionName}_FAILURE`,
  request: `${actionName}_REQUEST`,
  success: `${actionName}_SUCCESS`,
  reset: `${actionName}_RESET`,
})

export class Reducer<State> {
  handlers = new Map<String, (State, Action) => void>()
  constructor(private state: State) {}

  on(type: string, handler: (state: State, action: Action) => void) {
    this.handlers.set(type, handler)
    return this
  }

  get() {
    return (_state = this.state, action: Action) => {
      const handler = this.handlers.get(action.type)
      if (handler) {
        return produce(_state, state => {
          handler(state, action)
        })
      }

      return _state
    }
  }
}

export class Saga {
  private dispatchedOnFail = (err: any) => ({
    type: 'unknown',
  })
  private dispatchedOnSuccess: ((data: any) => Action)[] = []

  private job = (action: Action) => {}
  constructor(private trigger: string) {}

  catch(handler: string | Action | ((err: any) => Action)) {
    if (typeof handler === 'function') this.dispatchedOnFail = handler
    else if (typeof handler === 'string')
      this.dispatchedOnFail = () => ({
        type: handler,
      })
    else this.dispatchedOnFail = () => handler
    return this
  }

  then(handler: string | Action | ((data: any) => Action)) {
    if (typeof handler === 'function') this.dispatchedOnSuccess.push(handler)
    else if (typeof handler === 'string')
      this.dispatchedOnSuccess.push(() => ({ type: handler }))
    else this.dispatchedOnSuccess.push(() => handler)
    return this
  }

  do<Fn extends (...args: any) => any>(
    cb: (action: Action) => [fn: Fn, ...args: Parameters<Fn>]
  ) {
    this.job = function* (action: Action) {
      return yield call(...cb(action))
    }
    return this
  }

  get() {
    const trigger = this.trigger
    const job = this.job
    const dispatchedOnFail = this.dispatchedOnFail
    const handlers = this.dispatchedOnSuccess
    return function* () {
      yield takeLatest(trigger, function* login(action: Action) {
        try {
          console.log({ job })
          const response = yield job(action)
          console.log({ response })
          for (const handler of handlers) {
            yield put(handler(response))
          }
        } catch (e: any) {
          yield put(dispatchedOnFail(e))
        }
      })
    }
  }
}

///////////////////////////

class ActionConstantCreator {
  actionName: string = ''
  isAsync: boolean = false
  constructor(actionName: string) {
    this.actionName = actionName
  }
  async() {
    this.isAsync = true
    return {
      failure: `${this.actionName}_FAILURE`,
      request: `${this.actionName}_REQUEST`,
      success: `${this.actionName}_SUCCESS`,
      reset: `${this.actionName}_RESET`,
    }
  }
  get() {
    return this.actionName
  }
}

type ActionCreator = (...args: any[]) => Action
type AnyFunction = (...args: any[]) => any

const createAsyncAction = (actionName: string) => ({
  failure: `${actionName}_FAILURE`,
  request: `${actionName}_REQUEST`,
  success: `${actionName}_SUCCESS`,
  reset: `${actionName}_RESET`,
})

export class Actions {
  private constants = new Map<String, String | AsyncActionType>()
  private actionCreators = new Map<String, ActionCreator>()
  private prefix: string = ''
  constructor(prefix?: string) {
    if (prefix) this.prefix = `${prefix}_`
  }
  add(actionName: string, getPayload?: AnyFunction) {
    const constant = this.prefix + actionName
    this.constants.set(actionName, constant)
    let creator
    if (getPayload) {
      creator = (...payload: any[]) => ({
        type: constant,
        payload: getPayload(...payload),
      })
    } else {
      creator = () => ({ type: constant })
    }
    this.actionCreators.set(constant, creator)
    return this
  }

  async(actionName: string, getPayload?: AnyFunction) {
    const constant = this.prefix + actionName
    const asyncAction = createAsyncAction(actionName)
    this.constants.set(constant, asyncAction)
    let creator
    if (getPayload) {
      creator = (...payload: any[]) => ({
        type: asyncAction.request,
        payload: getPayload(...payload),
      })
    } else {
      creator = () => ({ type: asyncAction.request })
    }
    this.actionCreators.set(constant, creator)
    return this
  }
}

export const action = (actionName: string) =>
  new ActionConstantCreator(actionName)

const createAsyncActionType = (actionName: string) => ({
  failure: `${actionName}_FAILURE`,
  request: `${actionName}_REQUEST`,
  success: `${actionName}_SUCCESS`,
  reset: `${actionName}_RESET`,
})

const createBasicActionType = (actionName: string) => actionName

export const createActionType = (prefix: string) => {
  return {
    async: (action: string) => createAsyncActionType(`${prefix}:${action}`),
    basic: (action: string) => createBasicActionType(`${prefix}:${action}`),
  }
}

export const actionsCreator = () => {
  const empty = (type: string) => () => ({ type })
  const withPayload =
    <T>(type: string) =>
    (payload: T) => ({ type, payload })

  return {
    empty,
    withPayload,
  }
}

export type AsyncState<T> = {
  data: T
  loading: boolean
  error: string | null
}
