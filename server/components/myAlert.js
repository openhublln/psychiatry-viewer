import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export const MyAlert = function (title, message, onClickFunctionOk = () => {}) {
  return confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: 'OK',
        onClick: onClickFunctionOk,
      },
    ],
    closeOnClickOutside: false,
    closeOnEscape: false,
  })
}
