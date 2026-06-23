import { useState } from 'react'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='main'>
        <div className='floors'>
          <div className='floor floor-2' onClick={() => setIsOpen(true)}></div>
          <div className='floor floor-1'>

          </div>
        </div>
      </div>

      {isOpen && (
        <div className="hiden-info" onClick={() => setIsOpen(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p className='floor-title'>4 Этаж</p>
            <button className='button-exit' onClick={() => setIsOpen(false)}>
              Закрыть
            </button>
            <div className='floor-main'></div>
            
          </div>
        </div>
      )}
    </>
  )
}

export default App
