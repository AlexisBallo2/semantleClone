// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { promises as fs } from 'fs';


const handler = async (req, res) => {
  try {


    let guess = req.body.guess.guess
    let target = req.body.target.targetWord
    console.log("got:", guess,target)
    const fileContents = await fs.readFile("/Users/desktop/school/dl/fp/semantle/src/lib/backend/symMatrix.txt", 'utf8');
    let matrixList = fileContents.split("], [")
    let matrix = []
    for(let i = 0; i<matrixList.length; i++){
      matrix.push(matrixList[i].split(","))
    }
    matrix[0][0] = matrix[0][0].slice(5) 
    matrix[matrix.length-1][matrix[0].length-1] = matrix[matrix.length-1][matrix[0].length-1].substring(0,matrix[0].length-4) 
    console.log("matrixList", matrix)

    // console.log(data)
    console.log("first", matrix[0][0], "last", matrix[matrix.length-1][matrix[0].length-1].substring(0,matrix[matrix.length-1][matrix[0].length-1].length-5) )
    console.log("matrix", matrix.length, "by" , matrix[0].length)

    
    const wordList = await fs.readFile("/Users/desktop/school/dl/fp/semantle/src/lib/backend/wordList.txt", 'utf8');
    const list = wordList.split(",")
    console.log("target: ", target, "targetID", list.indexOf(target) )
    console.log("guess: ", guess, "guessID", list.indexOf(guess) )
    let maxSym = 0
    if(list.indexOf(guess) == -1){
      maxSym= -1 
    } else if (guess == target) {
      maxSym = 1
    } else {
      // maxSym = 100
      if(matrix[list.indexOf(target)][list.indexOf(guess)] == 0) {
        maxSym = matrix[list.indexOf(guess)][list.indexOf(target)] 
      } else {
        maxSym = matrix[list.indexOf(target)][list.indexOf(guess)]
      }
    }
//     // #https://stackoverflow.com/questions/51362252/javascript-cosine-similarity-function
//   function cosinesim(A,B){
//     var dotproduct=0;
//     var mA=0;
//     var mB=0;
//     for(let i = 0; i < A.length; i++){ // here you missed the i++
//         dotproduct += (A[i] * B[i]);
//         mA += (A[i]*A[i]);
//         mB += (B[i]*B[i]);
//     }
//     mA = Math.sqrt(mA);
//     mB = Math.sqrt(mB);
//     var similarity = (dotproduct)/((mA)*(mB)) // here you needed extra brackets
//     return similarity;
// }


//   var array1 = data[target];
//   var array2 = data[guess]

//   console.log("target", target, data[target])
//   console.log("b", guess, data[guess])

//   let max_sym = 0;
//   for(let i = 0; i<array1.length; i++) {
//       for (let j = 0; j<array2.length; j++){
//         var p = cosinesim(array1[i],array2[j]);
//         if(p>max_sym){
//           max_sym = p
//         }
//       }
//     }

//   console.log("max:",max_sym)
//     



    res.status(200).end(JSON.stringify(maxSym));
  } catch (e) {
    console.log(e);
    res.status(500).end("Something went wrong");
  }
};

export default handler;
