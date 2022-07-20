const { Router } = require("express");

const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/PersonController.js");

const {
  addCourt,
  getAllCourts,
  getCourtById,
  deleteCourt,
  updateCourt,
} = require("../controller/CourtController.js");
const {
  getSport,
  insertSport,
  getAllSports,
  deleteSport,
  updateSport,
} = require("../controller/SportController.js");
const {
  insertCourtSport,
  deleteCourtSport,
} = require("../controller/CourtSportController.js");
const {
  insertSchedule,
  deleteSchedule,
  getAllSchedules,
} = require("../controller/ScheduleController.js");
const {
  insertInterest,
  deleteInterest,
  getInterestByCPF,
  getAllInterested,
} = require("../controller/InterestController");
const {
  createGame,
  deleteGame,
  getAllGames,
} = require("../controller/GameController.js");
const {
  insertPersonGame,
  deletePersonGame,
  getAllPersonGame
} = require("../controller/PersonGameController.js");
const {
  addAddress,
  deleteAddress,
  getAllAddresses,
  getAddressByNeighborhood,
  updateAddress
}= require('../controller/AddressController.js');

const router = Router();

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    message: "Server is Running!",
  });
});

// User
router.get("/user", getUser);
router.get("/users", getAllUsers);
router.post("/user", createUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

// Court
router.post("/court", addCourt);
router.get("/courts", getAllCourts);
router.get("/court", getCourtById);
router.delete("/court", deleteCourt);
router.put("/court", updateCourt);

// Sport
router.get("/sport", getSport);
router.post("/sport", insertSport);
router.get("/sports", getAllSports);
router.delete("/sport", deleteSport);
router.put("/sport", updateSport);

// CourtSports
router.post("/courtsport", insertCourtSport);
router.delete("/courtsport", deleteCourtSport);

// Schedule
router.post("/schedule", insertSchedule);
router.delete("/schedule", deleteSchedule);
router.get("/schedules", getAllSchedules);

// Interest
router.post("/interest", insertInterest);
router.delete("/interest", deleteInterest);
router.get("/interestbycpf", getInterestByCPF);
router.get("/allinterested", getAllInterested);

// Game
router.post("/game", createGame);
router.delete("/game", deleteGame);
router.get("/games", getAllGames);

// PersonGame
router.post("/persongame", insertPersonGame);
router.delete("/persongame", deletePersonGame);
router.get("/persongame", getAllPersonGame);

// Address
router.post("/address", addAddress);
router.delete("/address", deleteAddress);
router.get("/addresses", getAllAddresses);
router.get("/addressesbyneighborhood", getAddressByNeighborhood);
router.put("/address", updateAddress);


module.exports = router;
