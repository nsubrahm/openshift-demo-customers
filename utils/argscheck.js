const process = require('process')
//
function validateArgs() {
    let argcheck = true
    let options = {}
    if (process.env.CUSTDEMO_CONFIG) {
        try {
            let j = JSON.parse(process.env.CUSTDEMO_CONFIG)
            if (j.server) {
                // TODO : Detailed checks for server configuration
                options.server = j.server
            } else {
                argcheck = false
                console.log('Server configuration not found.')
            }
            //
            if (j.cache) {
                // TODO : Detailed checks for cache configuration
                options.cache = {
                    host: process.env.CUSTDEMO_EXT_CACHE_SERVICE_HOST,
                    port: process.env.CUSTDEMO_EXT_CACHE_SERVICE_PORT,
                    db: j.cache.db
                }
            } else {
                argcheck = false
                console.log('Cache configuration not found.')
            }
        } catch (e) {
            argcheck = false
            console.log('Invalid configuration for Demo.')
        }
    } else {
        argcheck = false
        console.log('Configuration for Demo not received.')
    }
    return {
        options: options,
        argcheck: argcheck
    }
}
//
module.exports = { validateArgs }