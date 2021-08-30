import express from 'express';
const router = express.Router();
import { categoryById, create, list, read, update, remove } from '../controllers/category';
//Đường link
import { requireSignin, isAdmin, isAuth } from '../controllers/auth';
import { userById } from '../controllers/user';
router.post('/category', create);
router.get('/categories', list);
router.get("/category/:categoryId", read);
router.put("/category/:categoryId", update);
router.delete("/category/:categoryId", remove);

router.param('categoryId', categoryById);
router.param("userId", userById);
module.exports = router;