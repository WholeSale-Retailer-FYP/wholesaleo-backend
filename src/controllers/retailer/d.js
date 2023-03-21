item = [{
    "id": 1,
}, {
    "id": 2,
}, {
    "id": 3,
}]

// add age field to each item in array
item.forEach(function(item) {
    item.age = 10;
})

console.log(item);