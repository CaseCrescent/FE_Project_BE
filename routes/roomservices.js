const express = require("express");
// routes/roomservices.js
// routes/roomservices.js
const {
  createRoomService,
  getRoomServicesByHotel,
  getRoomServicesByBooking,
  getRoomServiceById,
  updateRoomService,
  deleteRoomService,
} = require("../controllers/roomservices");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

// POST /api/v1/roomservices - Create a new room service
router.post("/", protect, authorize('admin'), createRoomService);

// GET /api/v1/roomservices/hotel/:hotelId - Get all services for a hotel
router.get("/hotel/:hotelId", getRoomServicesByHotel);

// GET /api/v1/roomservices/booking/:bookingId - Get all services for a booking
router.get("/booking/:bookingId", getRoomServicesByBooking);

router.get("/:id", getRoomServiceById);
router.put("/:id", protect, authorize('admin'), updateRoomService);
router.delete("/:id", protect, authorize('admin'), deleteRoomService);

module.exports = router;