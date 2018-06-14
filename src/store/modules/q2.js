// function rFact(num) {
//   if (num === 0) {
//     return 1;
//   }
//   else {
//     return num * rFact(num - 1);
//   }
// }
//
// function arrange(num, total) {
//   return (num + 1) * (rFact(total) / (rFact(total - num)))
//
// }

var total = 0;








//narrow for loop
function isValidDegree(deg, numDeg) {
  return (!(Math.floor(9 / deg) + 1 > numDeg + 2 || Math.floor(9 / deg) + 1 < numDeg - 2))
}

  const operatorSet = ['+', '-']

function final (num){

  for (var i = 1; i < 9; i++) {
answer(num)
  }
}
function answer(num) {
  let degree = checkDegree(num)

  for (var i = 0; i < 9; i++) {
    if (isValidDegree(i, degree)) {
      let arr = []
      for (let a = i; a < 9; a++) {
        arr.push(0)
      }
      for (var k = 1; k < i; k++) {
        arr.push(1)
      }
      loop(arr)

    }
  }
}

//liter for one operator set
function loop(arr) {
  console.log(arr)
  for (var i = arr.length; i>=0; i--) {

    if (arr[i] === 1) {
      arr[i] = 2
      console.log("--------------------")
      literAllPossible(arr)

    }
  }
}
function literAllPossible(arr){
  let cloneArr = arr.slice(0)
  while (hasNextPermutation(cloneArr)) {
    let k = ""



    for(let i = 1;i < 10; i ++){
      k =k.concat(i.toString())
      k = k.concat(changeBackToOperator(cloneArr,i))
    }
    console.log(k)
  }
}
function changeBackToOperator(arr,index){
  if(i < 9){
    switch (arr[index]){
      case 1: return "+"
      case 2: return "-"
      default: return ""
    }}}
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
function checkDegree(num) {
  return num.toString().length
}

