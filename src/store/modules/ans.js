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
  while (hasNextPermutation(operatorArr)) {
    let k = ""
    for (let i = 1; i < 10; i++) {
      k = k.concat(i.toString())
      k = k.concat(changeBackToOperator(operatorArr, i))
    }


    count++;
  }

  return count
}

function changeBackToOperator(arr, index) {
  if (i < 9) {
    switch (arr[index]) {
      case 1:
        return "+"
      case 2:
        return "-"
      default:
        return ""
    }
  } else return ""

}

function loop(arr) {
  let count = 0
  for (var i = arr.length; i >= 0; i--) {

    if (arr[i] === 1) {
      arr[i] = 2
      count += literAllPossible(arr)
    }
  }
  return count
}

function checkDegree(num) {
  return num.toString().length
}

function isValidDegree(deg, numDeg) {
  return (!(Math.floor(9 / deg) + 1 > numDeg + 2 || Math.floor(9 / deg) + 1 < numDeg - 2))
}

function answer(input) {
  var count = 0
  for (var i = 1; i < 10; i++) {
    let arr = []
    arr = new Array(9 - i + 1).join('0').split('').map(parseFloat)
    for (var k = 1; k < i; k++) {
      arr.push(1)
    }
    console.log(arr)
    count += loop(arr)
  }
  console.log("-----")
  console.log(count)
}

answer(100)
