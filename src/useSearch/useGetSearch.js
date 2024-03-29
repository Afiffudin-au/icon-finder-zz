import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { addIconSearchResult } from '../features/iconSlice'
export function useGetSearch() {
  const dispatch = useDispatch()
  const getSearch = (
    query,
    catagory,
    style,
    offsetPage,
    premiumVal,
    vectorVal
  ) => {
    dispatch(
      addIconSearchResult({
        loading: true,
      })
    )
    Axios({
      url: process.env.REACT_APP_PROXY + '/icons/search',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      params: {
        query: query,
        count: 100,
        category: catagory,
        style: style,
        offset: offsetPage,
        premium: premiumVal,
        vector: vectorVal,
      },
    })
      .then((res) => {
        dispatch(
          addIconSearchResult({
            loading: false,
            dataIconResults: res.data,
          })
        )
      })
      .catch((err) => {
        dispatch(
          addIconSearchResult({
            loading: false,
          })
        )
        alert(err)
      })
  }
  return { getSearch }
}
