import './App.css'
import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import logo from './logo.svg'

export default function App({ router }) {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello ViteSSR + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>

        <nav>
          <ul>
            {router.routes.map(({ name, path }) => {
              return (
                <li key={path}>
                  <Link to={path}>{name}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
      <Switch>
        {router.routes.map((route) => {
          return (
            <Route exact key={route.path} path={route.path}>
              <route.component />
            </Route>
          )
        })}
      </Switch>
    </div>
  )
}
