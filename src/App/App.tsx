import React, { useState, useEffect, FC } from 'react'
import { getShoutouts, postShoutout, deleteShoutout } from '../services'
import Shoutout from '../Shoutout'

import './App.css'

interface ShoutoutProps {
  shoutout: Shoutout
  del: () => void
}
const ShoutoutComponent: FC<ShoutoutProps> = ({ shoutout, del }) => (
  <div className='shoutout'>
    <h3>Shout out to {shoutout.to}</h3>
    <div>- from {shoutout.from}</div>
    <div>{shoutout.text}</div>
    <button onClick={del}>Delete</button>
  </div>
)

const App = () => {
  const [shoutouts, updateShoutouts] = useState<Shoutout[]>([])
  const [newShoutout, updateNewShoutout] = useState<Shoutout>({
    to: '',
    from: '',
    text: ''
  })

  useEffect(() => {
    getShoutouts().then(shoutouts => updateShoutouts(shoutouts))
  }, [])

  const addShoutout = async () => {
    const savedShoutout = await postShoutout(newShoutout)
    updateShoutouts(shoutouts => [...shoutouts, savedShoutout])
    updateNewShoutout({
      to: '',
      from: '',
      text: ''
    })
  }

  const delShoutout = (id: string | undefined) => {
    if (id === undefined) return
    const index = shoutouts.findIndex(shoutout => shoutout.id === id)
    updateShoutouts(shoutouts => [
      ...shoutouts.slice(0, index),
      ...shoutouts.slice(index + 1)
    ])
    deleteShoutout
  }

  return (
    <div className='app'>
      <header>
        <h2>Shoutouts</h2>
      </header>
      <div className='form-container'>
        <h3>Leave a shout out</h3>
          <label>To</label>
          <input
            type="text"
            value={newShoutout.to}
            onChange={e =>
              updateNewShoutout(i => ({ ...i, to: e.target.value }))
            }
          />
          <label>From</label>
          <input
            type="text"
            value={newShoutout.from}
            onChange={e =>
              updateNewShoutout(i => ({
                ...i,
                from: e.target.value
              }))
            }
          />
        <label>Shout Out</label>
        <textarea
          value={newShoutout.text}
          onChange={e =>
            updateNewShoutout(i => ({ ...i, text: e.target.value }))
          }
        />
        <button onClick={addShoutout}>Submit Shout Out!</button>
      </div>
      <div className='shoutout-list'>
      {shoutouts.map(shoutout => (
        <ShoutoutComponent
          shoutout={shoutout}
          key={shoutout.id}
          del={() => delShoutout(shoutout.id)}
        />
        ))}
      </div>
    </div>
  )
}

export default App
