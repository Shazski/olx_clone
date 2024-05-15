import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Context} from './store/fireBaseContext.tsx' 
import { FirebaseContext } from './store/fireBaseContext.tsx'
import firebase from './config/firebase.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebase}}>
      <Context>
    <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
)
