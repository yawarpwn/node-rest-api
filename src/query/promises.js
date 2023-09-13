function fetchSome(cb) {
  setTimeout(() => {
    const result = [1, 2, 3, 4, 5]
    cb(null, result)
  }, 2000)
}

function getResult(callback) {
  fetchSome((error, result) => {
    if (error) {
      console.log('hay erro')
    }

    callback(result)

  })

}

getResult((result) => {
  console.log(result)
})

