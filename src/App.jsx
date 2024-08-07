import { useState,useCallback,useEffect,useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numberAllowed) str+='0123456789'
    if(charAllowed) str+='!@#$%^&*_'

    for(let i=0; i<length; i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }


    setPassword(pass)
    
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,30)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>passwordGenerator(),[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className='bg-gray-700 text-orange-600 h-screen w-full max-w-md mx-auto py-8 px-3 shadow-md' >
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <input type="text" value={password} placeholder='password' ref={passwordRef} readOnly className='w-full py-1 px-3' />
      <button onClick={copyPasswordToClip} className='px-3 py-0.5 shrink-0'>Copy</button>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" name='input' min={8} max={25} value={length} className='cursor-pointer ' onChange={(e)=>{setLength(e.target.value)}}/>
          <label htmlFor="input">Length : {length}</label>
        </div>
      </div>

      <div>
        <input type="checkbox" name='checkbox' defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev) => !prev)}} />
        <label htmlFor="checkbox">Numbers</label>
      </div>

      <div>
        <input type="checkbox" name='checkbox2' defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev) => !prev)}} />
        <label htmlFor="checkbox2">Characters</label>
      </div>

    </div>
  )
}

export default App
