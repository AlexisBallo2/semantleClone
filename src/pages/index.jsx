import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Head from "next/head";
import Select from "react-select";
import styles from "../styles/Home.module.scss";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import SymChart from "../components/SymChart"


function Home() {

  const [targetWord, setTargetWord] = useState("") 
  const [guess, setGuess] = useState("") 
  const [guessList, setGuessList] = useState([])
  const [symList, setSymList] = useState([])
  const [maxSym, setMaxSym] = useState(0)
  const [bestWord, setBestWord] = useState("")
  
  

  useEffect(() => {
    // console.log("calling")
    getTarget()
  }, [])
  
  const getTarget = async () => {
    const response = await fetch("/api/getTarget", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    // console.log("target word", data)
    setTargetWord(data.body)
    return data;
  }


  function reset() {
    getTarget()
    setGuessList([])
    setSymList([])
    setMaxSym(0)
    setBestWord("")
    setGuess("")

  }

  const guessEntered = async () => {
    const response = await fetch("/api/makeGuess", {
      method: "POST",
      body: JSON.stringify({
        target: {targetWord},
        guess: {guess},
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    let newGuessList = guessList
    if(data != "-1"){
      newGuessList.unshift(guess)
      setGuessList(newGuessList)

      let newSymList = symList 
      newSymList.unshift(parseFloat(String(data).slice(0,5)))
      // console.log("sym",  String(data).slice(0,5))
      setSymList(newSymList)

      setGuessList(oldArray => [...oldArray]);
      setSymList(oldArray => [...oldArray]);
      // console.log("guessList:", guessList, "symList", symList)


      if (data == "1") {
        Swal.fire({
          title: 'You win!',
          text: 'The correct word was: ' + targetWord,
          confirmButtonText: 'Play Again',
        })
        reset()
      }
    } else {
      // console.log("doesnt exist")
    }
    return data;

  };


  function handleInputChange(e) {
    setGuess(e.target.value)
  }

  const onFormSubmit = e => {
    setGuess("")
    e.preventDefault();
    guessEntered()
  }

  function giveup() {
    Swal.fire({
      title: 'Game Over!',
      text: 'The correct word was: ' + targetWord,
      confirmButtonText: 'Cool'
    })
    reset()

  }


  return (
    <div className={styles.main}>
      <div className = {styles.chartHolder}>
        <SymChart sym = {symList} />
      </div>
      <div className={styles.headerHolder}>
        <h1>Semantle</h1>
      </div>
      <form onSubmit={onFormSubmit}>
        {/* <input onChange={handleInputChange}> */}
        {/* </input> */}

        <TextField id="outlined-basic" label="guess" variant="outlined" value = {guess} onChange = {handleInputChange} />
        <Button variant="outlined" sx = {{height:56}} onClick = {onFormSubmit}>Make Guess</Button>
        {/* <button className={styles.submitButton} type = "submit">Make Guess</button> */}
      </form>
      <br/>
      <div>
        <Button variant="outlined" onClick = {giveup}>Give up</Button>
      </div>
      <div>
        <div className={styles.titleHolder}>
          <div className={styles.titleGuess}>Guess</div> <div className={styles.titleGuess}>Sym</div>
        </div>
        {guessList.map((indivGuess, i) => {
          return (
            <div className={styles.guessBox} key = {i} >
              <div className={styles.gHolder}>{indivGuess}</div> <div className={styles.gHolder}>{symList[i]}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Home;
