import { useCounter, useUser } from '~/store/hooks'

const Home = () => {
  const { state, reset, increment, add } = useCounter()

  const submit = e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    add(Number(formData.get('amount')))
  }

  const { login } = useUser()

  return (
    <div>
      <h1>Count: {state.count}</h1>

      <button onClick={reset}>reset</button>
      <button onClick={increment}>+</button>

      <form action="post" onSubmit={submit}>
        <input type="number" name="amount" />
        <button type="submit">add</button>
      </form>

      <button onClick={() => login('male')}>login</button>
    </div>
  )
}

export default Home
