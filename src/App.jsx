import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [Password, setPassword] = useState("");
  const [text, setText] = useState('Copy')
  const [bgClass, setBGClass] = useState('bg-blue-700')

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (characters) str += "!@#$%^&*-_+=[]{}~``";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, characters, setPassword]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, number, characters, PasswordGenerator]);

  const copyText = useCallback(()=>{
    navigator.clipboard.writeText(Password)
    setText('Copied')
    setBGClass('bg-green-600')
  },[Password])

  useEffect(() => {
    setText('Copy');
    setBGClass('bg-blue-600')
  }, [length, number, characters, Password]);

  return (
    <div>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-green-400">
        <h1 className="text-2xl text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3 text-gray-700 font-semibold"
            value={Password}
            placeholder="Password"
            readOnly
          />
          <button onClick={copyText} className={`outline-none ${bgClass} text-white px-3 py-0.5 shrink-0 border-r-2 border-white rounded-s-lg`}>
          {text}
          </button>
          <button
            onClick={PasswordGenerator}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Generate
          </button>
        </div>
        <div className="flex justify-center text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={80}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characters}
              id="charactersInput"
              onChange={() => {
                setCharacters((prev) => !prev )
            }}
            />
            <label htmlFor="charactersInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
