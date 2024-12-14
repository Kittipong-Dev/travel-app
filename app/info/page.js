"use client"

import styles from './page.module.css';
import {useState, useEffect} from "react"

export default function MyApp () {
  const [count, setCount] = useState(20)
  const [svgContent, setSvgContent] = useState("")
  const [data, setData] = useState({})
  const [description, setDescription] = useState("placeholder")
  const [date, setDate] = useState("description")
    
  useEffect(() => {
    fetch("/thailand.svg")
    .then((response) => response.text())
    .then((data) => setSvgContent(data))
    .catch((err) => console.error("Error loading SVG:", err))
  })

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error loading JSON:", err));
  });

  function handleLocationClick (event) {
    const target = event.target
    if (target.tagName === "path") {
      const provinceName = target.getAttribute("name") || "Unknown"
      console.log("Clicked on province:", provinceName)
      
      setDescription(data[provinceName].description)
      setDate(data[provinceName].date)

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
    <div>{description}</div>
    <div>{date}</div>
    </>
  )
}