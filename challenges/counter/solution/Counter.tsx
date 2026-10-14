"use client"
import styles from "./Counter.module.css";
import { useState } from "react";

export default function Counter() {

  const [count, setCount] = useState(0)

  return(
    <>
      <div className={styles.counter}>Counter: {count}</div>
      <button onClick={() => setCount(count + 1)}>
        Increase count by 1
        </button>
    </>
    
  ) 
}
