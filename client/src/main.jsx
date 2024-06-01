import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Auth0Provider
      domain='souradeep-dey.jp.auth0.com'
      clientId='O4Uhv7BVZqxFrElQ6SAFBpLiwTJ6OBp1'

      authorizationParams={{
        redirect_uri: "http://localhost:5174/",
        audience: "protectedAPI",
        scope: "openid email profile"
      }}
    >
      <App />
    </Auth0Provider>

  </>
)
