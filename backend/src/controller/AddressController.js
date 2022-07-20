const AddressModel = require("../model/AddressModel.js");

async function addAddress(req, res) {
    const addressReturn = await AddressModel.insertAddress(req.body);
    if(!addressReturn.error) {
        return res.json({
            statusCode: 200,
            address: addressReturn
        });
    }
    return res.json({
        statusCode: 400,
        message: "Address could not be inserted into database!"
    });
}

async function deleteAddress(req, res) {
    const addressReturn = await AddressModel.deleteAddress(req.body);
    if(!addressReturn.error) {
        return res.json({
            statusCode: 200,
            address: addressReturn
        });
    }
    return res.json({
        statusCode: 400,
        message: "Address not found!"
    });
}

async function getAllAddresses(req, res) {
    const addressReturn = await AddressModel.getAllAddresses();
    if(!addressReturn.error) {
        return res.json({
            statusCode: 200,
            addresses: addressReturn
        });
    }
    return res.json({
        statusCode: 400,
        message: "Address not found!"
    });
}

async function getAddressByNeighborhood(req, res) {
    const addressReturn = await AddressModel.getAddressByNeighborhood(req.body);
    if(!addressReturn.error) {
        return res.json({
            statusCode: 200,
            addresses: addressReturn
        });
    }
    return res.json({
        statusCode: 400,
        message: "Address not found!"
    });
}

async function updateAddress(req, res) {
    const addressReturn = await AddressModel.updateAddress(req.body);
    if(!addressReturn.error) {
        return res.json({
            statusCode: 200,
            address: addressReturn
        });
    }
    return res.json({
        statusCode: 400,
        message: "Address not found!"
    });
}

module.exports = {
    addAddress,
    deleteAddress,
    getAllAddresses,
    getAddressByNeighborhood,
    updateAddress
}