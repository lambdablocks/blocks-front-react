import fetch from 'isomorphic-fetch'

export const REQUEST_LIBRARY = 'REQUEST_LIBRARY'
export const RECEIVE_LIBRARY = 'RECEIVE_LIBRARY'
export const INVALIDATE_LIBRARY = 'INVALIDATE_LIBRARY'

export const invalidateLibrary = () => {
  return {
    type: INVALIDATE_LIBRARY
  }
}

const requestLibrary = () => {
  return {
    type: REQUEST_LIBRARY
  }
}

const receiveLibrary = (items) => {
  return {
    type: RECEIVE_LIBRARY,
    payload: {
      items
    }
  }
}

const fetchLibrary = (id) => {
  return dispatch => {
    dispatch(requestLibrary())
    return fetch(`http://demo5895613.mockable.io/library/js/${id}`)
      .then(response => response.json())
      .then(items => dispatch(receiveLibrary(items)))
  }
}

const shouldFetchLibrary = (state) => {
  // const posts = state.postsByReddit[reddit]
  // if (!posts) {
  //   return true
  // }
  // if (posts.isFetching) {
  //   return false
  // }
  // return posts.didInvalidate
  return true
}

export const fetchLibraryIfNeeded = (id) => {
  return (dispatch, getState) => {
    const { library } = getState()

    if (shouldFetchLibrary(library)) {
      return dispatch(fetchLibrary(id))
    }
  }
}
