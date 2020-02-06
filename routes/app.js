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
            console.log('Body: ' + JSON.stringify(req.body))
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
    app.get('/customer/:customerId', async (req, res, next) => {
        try {
            console.log('Req : ' + req.params.customerId)
            let cacheResp = await cache.getCustomer({
                cacheClient: connObject.cacheClient,
                key: req.params.customerId
            })
            if (Object.keys(cacheResp).length > 0) {
                res.status(200).send({
                    message : cacheResp
                })
            } else {
                res.status(404).send({
                    message : 'Customer ID not found'
                })
            }
        } catch(e) {
            res.status(500).send({
                message: 'Internal error ' + e
            })
        }
    })
    //
    app.put('/customer/:customerId', async (req, res, next) => {
        try {
            let cacheResp = await cache.editCustomer({
                cacheClient: connObject.cacheClient,
                payload: req.body,
                key: req.params.customerId
            })
            if (Object.keys(cacheResp).length > 0) {
                res.status(200).send({
                    message : 'Customer Id updated'
                })
            } else {
                res.status(404).send({
                    message : 'Customer ID not found'
                })
            }
        } catch(e) {
            res.status(500).send({
                message: 'Internal error ' + e
            })
        }
    })
    //
    app.delete('/customer/:customerId', async (req, res, next) => {
        try {
            let cacheResp = await cache.removeCustomer({
                cacheClient: connObject.cacheClient,
                key: req.params.customerId
            })
            if (Object.keys(cacheResp).length > 0) {
                res.status(200).send({
                    message : 'Customer Id deleted'
                })
            } else {
                res.status(404).send({
                    message : 'Customer ID not found'
                })
            }
        } catch(e) {
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