const redis = require('redis')
//
async function clientOperations(options) {
    let connObject = {}
    let redisClient = redis.createClient(options)
    return new Promise((resolve, reject) => {
        redisClient.on('error', (err) => {
            console.log('Redis client connection error. %s', err)
            connObject = {
                cacheClient: {},
                connected: false
            }
            reject(connObject)
        })
        //
        redisClient.on('connect', () => {
            console.log('Redis client is connected.')
            connObject = {
                cacheClient: redisClient,
                connected: true
            }
            resolve(connObject)
        })
        //
        redisClient.on('ready', () => {
            console.log('Redis client is ready.')
            connObject = {
                cacheClient: redisClient,
                connected: true
            }
            resolve(connObject)
        })
        //
        redisClient.on('reconnecting', (err) => {
            console.log('Redis client reconnecting. %s', err ? err : '')
            connObject = {
                cacheClient: {},
                connected: false
            }
            redisClient.quit()
            reject(connObject)
        })
        //
        redisClient.on('end', (err) => {
            console.log('Redis client ended. %s', err ? err : '')
            connObject = {
                cacheClient: {},
                connected: false
            }
            redisClient.quit()
            reject(connObject)
        })
    })
}
//
async function connect(options) {
    return new Promise(async (resolve, reject) => {
        try {
            let p = await clientOperations(options)
            resolve(p)
        } catch(e) {
            reject(e)
        }
    })
}
//
module.exports = { connect }