const operatorSet = ['+', '-']

//check if have more option
function hasNextPermutation(arr) {
  let pos1 = 0
  let pos2 = 0
  let find = false
  for (i = arr.length - 2; i >= 0; i--) {
    if (arr[i] < arr[i + 1]) {
      pos1 = i
      find = true
      break
    }
  }

  if (!find) return false
  let min = arr[pos1]
  for (let j = pos1 + 1; j < arr.length; j++) {
    if (arr[j] > arr[pos1]) {
      min = arr[j]
      pos2 = j
    }
  }

  var temp = arr[pos1]
  arr[pos1] = arr[pos2]
  arr[pos2] = temp
  var y = pos1 + 1
  var z = arr.length - 1
  while (y < z) {
    temp = arr[y]
    arr[y] = arr[z]
    arr[z] = temp
    y++
    z--
  }
  return true
}

function literAllPossible(operatorArr) {
  let cloneArr = operatorArr.slice(0)
  let count = 0
  while (hasNextPermutation(cloneArr)) {
    let k = ""
    for (let i = 1; i < 10; i++) {
      k = k.concat(i.toString())
      k = k.concat(changeBackToOperator(cloneArr, i-1))
    }
    if(eval(k)===100){

      console.log(k)

      count++
    }
  }
  return count
}

function changeBackToOperator(arr, index) {

  switch (arr[index]) {
    case 1:
      return "+"
    case 2:
      return "-"
    default:
      return ""
  }


}

function loop(arr,loopRemain ,count =0) {
  let needLoop = loopRemain>0
  if(needLoop)
  {
    let totalCount = count + literAllPossible(arr)
    loop(arr.map(e=> (arr.findIndex(e)===loopRemain&&e===1)?2:e),loopRemain-1,totalCount)
  }else {
    return count
  }
}

function checkDegree(num) {
  return num.toString().length
}

function isValidDegree(deg, numDeg) {
  return (!(Math.floor(9 / deg) + 1 > numDeg + 2 || Math.floor(9 / deg) + 1 < numDeg - 2))
}

 function answer(count) {

   var operatorSet = [1,1,1,1,1,1,1,1]


   for(var i = 0; i<operatorSet.length;i++){

     console.log(operatorSet)
     count += loop(operatorSet,operatorSet.length)
     operatorSet =  [1,1,1,1,1,1,1,1]
     operatorSet.fill(0,0,i+1)
   }

  console.log("-----")
  console.log(count)
}

answer(0)
