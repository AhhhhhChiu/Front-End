new Promise((resolve, reject) => {
    resolve(new Promise((success, fail) => {
        success(1);
    }))
}).then(res => {
    console.log(res);
})