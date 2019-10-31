const process = require('process')
//
const utils = require('../utils/argscheck')
const cache = require('../cache/connect')
const app = require('../routes/app')
//
async function connections(options) {
    return new Promise(async (resolve, reject) => {
        try {
            let p = await Promise.all([cache.connect(options.cache)])
            resolve({
                cacheClient: p[0].cacheClient
            })
        } catch (e) {
            reject(e)
        }
        //
    })
}
//
async function run() {
    return new Promise(async (resolve, reject) => {
        console.log('Starting demo.')
        let validation = utils.validateArgs()
        if (validation.argcheck) {
            console.log('Good configuration received.')
            //
            try {
                let c = await connections(validation.options)
                app.launchServer({
                    server: validation.options.server,
                    connObject: {
                        cacheClient: c.cacheClient
                    }
                })
                resolve()
            } catch (err) {
                console.log('Server launch failed. Exiting.')
                reject()
            }
        } else {
            console.log('Bad configuration recieved. Exiting.')
            reject()
        }
    })
}
//
run().catch(() => {
    console.log('Demo is exiting.')
    process.exit(8)
})