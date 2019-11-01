const express = require('express')
const bp = require('body-parser')
//
const cache = require('../cache/ops')
//
function serverSetup(connObject) {
    const app = express()
    app.use((req, res, next) => {
        bp.json()(req, res, err => {
            if (err) {
                res.status(405).send({
                    message: 'Invalid input'
                })
            } else {
                next()
            }
        })
    })
    //    
    app.post('/customers', async (req, res, next) => {
        try {
            let cacheResp = await cache.addCustomer({
                cacheClient: connObject.cacheClient,
                payload: req.body
            })
            res.status(201).send({
                message: {
                    key: cacheResp.key
                }
            })
        } catch (e) {
            res.status(500).send({
                message: 'Internal error ' + e
            })
        }
    })
    //
    return app
}
//
function launchServer(options) {
    serverSetup(options.connObject).listen(options.server.port, (err, res) => {
        if (err) {
            // TODO: Handle EADDRINUSE error.
            console.log('Demo did not launch. %s', err)
        } else {
            console.log('Demo listening at %d', options.server.port)
        }
    })
}
//
module.exports = { launchServer }