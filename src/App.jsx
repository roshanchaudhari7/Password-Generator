import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(false);
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = ""
    if (numberAllowed) str += "0123456789"
    if (upperCaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (lowerCaseAllowed) str += "abcdefghijklmnopqrstuvwxyz"
    if (charAllowed) str += "!@#$%^&*-_+=~[]{}()<>`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, upperCaseAllowed, lowerCaseAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, upperCaseAllowed, lowerCaseAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="m-0 p-0 w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#224262] to-[#236485]">
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8'>
          <h1 className='text-[#111c28] m-3 text-center uppercase text-3xl'>Password Generator</h1>
          <div className=" flex relative justify-between p-5 m-2 bg-[#224262] rounded-[10px]">
            <input
              type="text"
              value={password}
              className="outline-none text-white w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className='outline-none bg-[#13293f] cursor-pointer rounded-lg text-white px-3 py-0.5 shrink-0'
            >copy</button>

          </div>
          <div className='flex flex-col text-white p-5 m-2 bg-[#224262] rounded-[10px] gap-5'>
            <div className="flex justify-between">
              <p>Password Length</p>
              <p>{length}</p>
            </div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='w-full h-3 rounded-full bg-[#444e62] bg-gradient-to-r from-[#29b3ef] to-[#587ab6] bg-no-repeat border-none outline-none'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <div className="flex justify-start gap-2.5">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                className='appearance-none cursor-pointer h-[18px] w-[18px] bg-[#444e62] border border-gray-700 rounded-md flex justify-center items-center checked:bg-[#0EA5E9] relative'
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className='cursor-pointer'>Include Numbers</label>
            </div>
            <div className="flex justify-start gap-2.5">
              <input
                type="checkbox"
                defaultChecked={upperCaseAllowed}
                id="characterInput"
                className='appearance-none cursor-pointer h-[18px] w-[18px] bg-[#444e62] border border-gray-700 rounded-md flex justify-center items-center checked:bg-[#0EA5E9] relative'
                onChange={() => {
                  setUpperCaseAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="characterInput" className='cursor-pointer'>Include Uppercase Letters</label>
            </div>
            <div className="flex justify-start gap-2.5">
              <input
                type="checkbox"
                defaultChecked={lowerCaseAllowed}
                id="characterInput"
                className='appearance-none cursor-pointer h-[18px] w-[18px] bg-[#444e62] border border-gray-700 rounded-md flex justify-center items-center checked:bg-[#0EA5E9] relative'
                onChange={() => {
                  setLowerCaseAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="characterInput" className='cursor-pointer'>Include Lowercase Letters</label>
            </div>
            <div className="flex justify-start gap-2.5">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                className='appearance-none cursor-pointer h-[18px] w-[18px] bg-[#444e62] border border-gray-700 rounded-md flex justify-center items-center checked:bg-[#0EA5E9] relative'
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="characterInput" className='cursor-pointer'>Include Symbols</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
