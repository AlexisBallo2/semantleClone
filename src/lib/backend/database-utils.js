/**
 * Backend databse utililty functions
 */

import {parse} from "csv-parse"
import dt from "./wordList.txt"
import { promises as fs } from 'fs';


export async function getTargetWord(param1) {
// let data = []
// fs.createReadStream("/Users/desktop/school/dl/fp/semantle/src/lib/backend/wordList.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", function (row) {
//     console.log(row);
//     data.push(row)
//   })
//   .on("end", function () {
//     console.log("finished");
//     return
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   });
  // var list = dt.split(",")
  const fileContents = await fs.readFile("/Users/desktop/school/dl/fp/semantle/src/lib/backend/wordList.csv", 'utf8');
  console.log("testing:", fileContents)

  // return String.toString(list[0]) 
  
  // return "hello"
  // let text = fs.readFileSync("/Users/desktop/school/dl/fp/semantle/src/lib/backend/wordList.csv")

  // let data = parse(text)
  // return text 
//     .pipe(parse({ delimiter: ',' }))
//     .on('data', (r) => {
//       // console.log(r);
//       data.push(r);        
//     })
//     .on('end', () => {
//     })
}
