const rn = require('random-number')
//
async function addCustomer(options) {
    return new Promise(async (resolve, reject) => {
        resolve({
            key: rn({
                min: 0,
                max: 1000000000,
                integer: true
            })
        })
    })
}
//
async function getCustomer(options) {

}
//
async function editCustomer(options) {

}
//
async function removeCustomer(options) {

}
//
module.exports = { addCustomer, getCustomer, editCustomer, removeCustomer }