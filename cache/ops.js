const rn = require('random-number')
//
async function addCustomer(options) {
    return new Promise(async (resolve, reject) => {
        let cacheClient = options.cacheClient
        let key = rn({
            min: 0,
            max: 1000000000,
            integer: true
        })
        await cacheClient.set(key, JSON.stringify(options.payload), (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve({
                    key: key
                })
            }
        })
    })
}
//
async function getCustomer(options) {
    return new Promise(async (resolve, reject) => {
        let cacheClient = options.cacheClient
        await cacheClient.get(options.key, (err, res) => {
            if (err) {
                reject(err)
            } else if (res) {
                resolve(JSON.parse(res))
            } else {
                resolve({})
            }
        })
    })
}
//
async function editCustomer(options) {
    return new Promise(async (resolve, reject) => {
        try {
            let resp = await getCustomer(options)
            if (resp) {
                let cacheClient = options.cacheClient
                await cacheClient.set(options.key, JSON.stringify(options.payload), (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            key: options.key
                        })
                    }
                })
            } else {
                resolve({})
            }
        } catch(e) {
            reject(e)
        }
    })
}
//
async function removeCustomer(options) {
    return new Promise (async (resolve, reject) => {
        let cacheClient = options.cacheClient
        cacheClient.delete(options.key, (err, res) => {
            if (err) {
                reject(err)
            } else if (res === 0) {
                resolve({})
            } else {
                resolve({
                    key : options.key
                })
            }
        })
    })
}
//
module.exports = { addCustomer, getCustomer, editCustomer, removeCustomer }