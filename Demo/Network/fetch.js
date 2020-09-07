const fetch = require('node-fetch')

fetch("http://127.0.0.1:8000/test/").then(res => res.json().then(data => console.log(typeof data)));