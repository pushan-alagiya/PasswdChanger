import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [passwd, setpasswd] = useState("");

  // useRef hook
  const passwdRef = useRef(null);

  // Password Generator function
  const passwdGnerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // add numbers
    if (numallowed) str += "1234567890";

    // add chars
    if (charallowed) str += "/.,;:}{][|)(*_+=-@#$%^&!~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpasswd(pass);
  }, [length, numallowed, charallowed, setpasswd]);

  // Copy to Clipboard method
  const copyPasswordToClipboard = useCallback(() => {
    passwdRef.current.select();
    window.navigator.clipboard.writeText(passwd);
  }, [passwd]);

  // Running loop in every conditions
  useEffect(() => {
    passwdGnerator();
  }, [length, numallowed, charallowed, passwdGnerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 bg-gray-800 text-orange-500">
        {/* Heading */}
        <h1 className="text-white text-center my-3 ">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          {/* Text Display */}
          <input
            type="text"
            value={passwd}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwdRef}
          />

          {/* Copy button */}
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>

        {/* Selectors : range, charallowed, numsallowed */}
        <div className="flex text-sm gap-x-2">
          {/* Range input */}
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-20 cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label> Length: {length}</label>
          </div>

          {/* Checkbox: numallowed */}
          <div className="flex text-sm gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numallowed}
              id="numinput"
              onChange={() => {
                setnumallowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          {/* Checkbox: charallowed */}
          <div className="flex text-sm gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charinput"
              onChange={() => {
                setcharallowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
