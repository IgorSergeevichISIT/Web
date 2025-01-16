import express from 'express'
import controller from '../controllers/controller.js'
const router = express.Router();

router.get("/", controller.getAll)
router.get("/admins", controller.getAdmins)
router.get("/friends", controller.getFriends)
router.get("/:id", controller.getUser)

export default router