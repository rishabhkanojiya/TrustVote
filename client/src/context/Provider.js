import { values } from 'lodash'
import React, { useState } from 'react'
import { LoginContext, ShowPopupContext, VotingContext } from '.'
import { apiError, apiErrorAPi } from '../constant/errors'

export const ShowPopupProvider = (props) => {
  let [messageObj, setMessage] = useState({})
  let [showPopup, setShowPopup] = useState(false)

  const setPopupMessageObjKey = (sKey, errorCodeP, callback) => {
    const val = apiError(sKey, errorCodeP)
    setMessage(val)
    setShowPopup(true)

    if (showPopup) {
      if (callback) {
        callback()
      }
    }
  }

  const setPopupMessageObj = (res, state) => {
    let msg
    setShowPopup(true)
    switch (state) {
      case 'error':
        if (res?.meta?.errors) {
          msg = values(res.meta.errors)[0]
        } else {
          msg = apiErrorAPi(res)
        }

        setMessage({ state, msg })
        break

      case 'success':
        msg = apiErrorAPi(res)
        setMessage({ state, msg })
        break

      default:
        break
    }
  }

  return (
    <ShowPopupContext.Provider
      value={{
        data: messageObj,
        showPopup,
        setPopupMessageObjKey,
        setPopupMessageObj,
        setShowPopup,
      }}
    >
      {props.children}
    </ShowPopupContext.Provider>
  )
}

export const LoginProvider = (props) => {
  const [user, setUser] = useState(null)
  const [dataLength, setDataLength] = useState(0)

  function setUserObj(userVal) {
    setUser(userVal)

    return userVal
  }

  const delUserObj = () => {
    setUser(null)
  }

  return (
    <LoginContext.Provider
      value={{
        data: user,
        setUserObj,
        delUserObj,
        dataLength,
        setDataLength,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  )
}

export const VotingProvider = (props) => {
  const [group, setVoting] = useState({})

  const setVotingFunc = (group) => {
    setVoting(group)

    return group
  }

  return (
    <VotingContext.Provider
      value={{
        group,
        setVoting: setVotingFunc,
      }}
    >
      {props.children}
    </VotingContext.Provider>
  )
}
