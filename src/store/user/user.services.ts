import axios from 'axios'

export const getUser = (gender: string) =>
  axios
    .get('https://randomuser.me/api?gender=' + gender)
    .then(({ data }) => data)
