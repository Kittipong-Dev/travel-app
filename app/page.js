"use client"

import styles from './page.module.css';
import {useState, useEffect} from "react"
import MyButton from './MyButton';

export default function MyApp () {
  const [count, setCount] = useState(20)
  const [svgContent, setSvgContent] = useState("")
    
  useEffect(() => {
    fetch("/thailand.svg")
    .then((response) => response.text())
    .then((data) => setSvgContent(data))
    .catch((err) => console.error("Error loading SVG:", err))
  })

  function handleClick () {
      setCount(count+1);
  }

  function handleLocationClick (event) {
    const target = event.target
    if (target.tagName === "path") {
      const provinceName = target.getAttribute("name") || "Unknown"
      console.log("Clicked on province:", provinceName)
      if (target.classList.contains(styles.selectedProvince)) {
        target.classList.add(styles.deselectedProvince);
        target.classList.remove(styles.selectedProvince);
      }
      else {
        target.classList.add(styles.selectedProvince);
        target.classList.remove(styles.deselectedProvince);
      }
    }
  }

  return (
    <>
    <div
      dangerouslySetInnerHTML={{ __html: svgContent}}
      onClick={handleLocationClick}
    ></div>
    <div className={styles.div}>
      <MyButton count={count} handleClick={handleClick}/>
    </div>
      <MyButton count={count} handleClick={handleClick}/>
    </>
  )
}