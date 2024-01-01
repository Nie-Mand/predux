import * as _actions from './counter.actions'

const { constants, ...actions } = _actions

export { constants, actions }

export interface CounterState {
  count
}
