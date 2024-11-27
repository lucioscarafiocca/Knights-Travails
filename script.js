function between(x, min, max) {
  min = 0
  max = 7
  return x >= min && x <= max
}
function NextMove(array) {
  let ver = array[0]
  let hor = array[1]

  let one = [ver + 2, hor + 1]
  let two = [ver + 2, hor - 1]
  let three = [ver + 1, hor - 2]
  let four = [ver + 1, hor + 2]
  let five = [ver - 1, hor - 2]
  let six = [ver - 1, hor + 2]
  let seven = [ver - 2, hor - 1]
  let eight = [ver - 2, hor + 1]
  preArray = [one, two, three, four, five, six, seven, eight]
  array = []
  preArray.forEach((element) => {
    if (between(element[0]) && between(element[1])) {
      array.push(element)
    }
  })
  return array
}

function GetMoves(start, end) {
  let answer = { key: start }
  //let answer = 0
  for (let queue = [start]; end; ) {
    if (JSON.stringify(NextMove(queue[0])).includes(end)) {
      let key = Path(answer, answer, queue[0], [], start)
      key.unshift(end)
      return message(key)
    }
    let array = NextMove(queue[0])
    array.forEach((element) => {
      queue.push(element)
    })
    add(answer, array, queue[0])
    queue.shift()
  }
  return answer
}

function add(answer, array, child) {
  if (answer.next == undefined) {
    answer.parent = child
    answer.children = array
    return (answer.next = {})
  }

  add(answer.next, array, child)
}

function Path(og, obj, start, answer, end) {
  if (JSON.stringify(og.key).includes(start)) {
    answer.push(og.key)
    return answer
  } else if (JSON.stringify(obj.children).includes(start)) {
    answer.push(start)
    parent = obj.parent
    obj = og
    Path(og, obj, parent, answer, end)
  } else {
    Path(og, obj.next, start, answer, end)
  }
  return answer
}

function message(array) {
  let rev = []
  array.forEach((element) => {
    rev.unshift(element)
  })
  let message = `You made it in ${rev.length - 1} moves! Here's your path: \n`
  rev.forEach((element) => {
    message += `${rev[rev.indexOf(element)]} \n`
  })
  return message
}
console.log(GetMoves([0, 0], [1, 6]))
