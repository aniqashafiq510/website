import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './framer/App'
import store from './framer/Redux/store'
import {Provider} from 'react-redux'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
    </Provider>
  
  
)
