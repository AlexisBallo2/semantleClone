
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import {getTargetWord} from "../../lib/backend/database-utils.js"

import {parse} from "csv-parse"
// import dt from "./wordList.txt"
import { promises as fs } from 'fs';
import path from "path"

const handler = async (req, res) => {
  try {

    const fileContents = await fs.readFile( path.join(process.cwd(),"./public/data/wordList1.txt"), 'utf8');
    const list = fileContents.split(",")
    // console.log("testing:", list)
    res.status(200).end(JSON.stringify(list));

  } catch (e) {
    console.log(e);
    res.status(500).end("Something went wrong");
  }
};

export default handler;
