import { useState } from "preact/hooks";

export default function Counter() {
  let [num,setNum] = useState(0);
  return (
    <div>
      <p>The count is {num}.</p>
      <button className="btn mr-6" onClick={() => setNum(num + 1)}>Count + 1</button>
      <button className="btn" onClick={() => setNum(0)}>Reset</button>
    </div>
  )
}