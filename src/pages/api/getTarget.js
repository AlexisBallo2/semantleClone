// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import {getTargetWord} from "../../lib/backend/database-utils.js"

import {parse} from "csv-parse"
// import dt from "./wordList.txt"
import { promises as fs } from 'fs';

const handler = async (req, res) => {
  try {

    const fileContents = await fs.readFile("../../lib/backend/wordList1.txt", 'utf8');
    const list = fileContents.split(",")
    // console.log("testing:", list)

    let word = list[Math.floor(Math.random()*list.length)];    // return String.toString(list[0]) 
    // let word = await getTargetWord()
    // console.log("success?",  word)
    let ret = {}
    ret["body"] = word
    res.status(200).end(JSON.stringify(ret));

  } catch (e) {
    console.log(e);
    res.status(500).end("Something went wrong");
  }
};

export default handler;
