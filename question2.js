const async = require('async')

const data = [1, 2, 3, 4, 5]

function processItem(item, callback) {
  setTimeout(() => {
    console.log(`Processed item: ${item}`)
    callback(null, item * 2)
  }, 1000)
}

async.mapSeries(data, processItem, (error, results) => {
  if (error) {
    console.log('Error:', error)
  } else {
    console.log('All items processed succesfully')
    console.log('Results:', results)
  }
})