import {toast,Flip} from 'react-toastify'

const props = {
position: "bottom-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Flip,
}

const errorToast =(msg)=> {toast.error(msg, props)}
const successToast =(msg)=> {toast.success(msg, props)}
const warnToast =(msg)=> {toast.warn(msg, props)}
const infoToast =(msg)=> {toast.info(msg, props)}

export { errorToast,infoToast,successToast,warnToast}