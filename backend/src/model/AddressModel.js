const { db_open } = require('../database/initDB.js');


async function insertAddress(address) {
    try {
        var db = await db_open();
        try {
          const adressResult = await db.run(
            "INSERT INTO Endereco (CEP, numero, complemento, UF, logradouro, bairro, localidade, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?)",
            [
                address.CEP,
                address.numero,
                address.complemento,
                address.UF,
                address.logradouro,
                address.bairro,
                address.localidade,
                address.latitude,
                address.longitude
            ]
          );
          return {
            adress: adressResult,
          };
        } catch (e) {
          return {
            address: address,
            message: "Something went wrong, could not insert into database",
            error: e,
          };
        }
    } catch (e) {
    return DB_ERROR_OBJ(e);
    } finally {
    db.close();
    }
}

async function deleteAddress(address) {
    try {
        var db = await db_open();
        try {
          const addressResult = await db.get("SELECT * FROM Endereco WHERE id=?", [address.id]);
          await db.get("DELETE FROM Endereco WHERE id=?", [address.id]);
          return addressResult;
        } catch (e) {
          return {
            address,
            message: "Something went wrong",
            error: e,
          };
        }
    } catch (e) {
    DB_ERROR_OBJ(e);
    } finally {
    db.close();
    }
}

async function updateAddress(address) {
  try {
    var db = await db_open();
    try {
      const addressOld = await db.get("SELECT * FROM Endereco WHERE id=?", [
        address.id,
      ]);

      await db.run(
        "UPDATE Endereco SET CEP=?, numero=?, complemento=?, UF=?, logradouro=?, localidade=?, latitude=?, longitude=?  WHERE id=?",
        [
          address.CEP,
          address.numero,
          address.complemento,
          address.UF,
          address.logradouro,
          address.localidade,
          address.latitude,
          address.longitude,
          address.id
        ]
      );

      const addressNew = await db.get("SELECT * FROM Endereco WHERE id=?", [
        address.id
      ]);

      return {
        address_old: addressOld,
        address_new: addressNew,
      };
    } catch (e) {
      return {
        address: {},
        message: "Could not update the entry in database",
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function getAllAddresses() {
  try {
    var db = await db_open();
    try {
      const adresses = await db.all("SELECT * FROM Endereco");
      return adresses;
    } catch (e) {
      return {
        adresses: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function getAddressByNeighborhood(address) {
  try {
    var db = await db_open();
    try {
      const addressReturn = await db.all("SELECT * FROM Endereco WHERE bairro=?", [address.neighborhood]);
      return addressReturn;
    } catch (e) {
      return {
        address: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

module.exports = {
    insertAddress,
    deleteAddress,
    updateAddress,
    getAllAddresses,
    getAddressByNeighborhood
}
