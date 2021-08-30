import express from 'express';
import { list, create, productById, read, remove, update, photo } from '../controllers/product';
const router = express.Router();
//Đường link

router.post('/products', create);
router.get('/products', list);
router.put('/product/:productId', update);
router.get('/product/:productId', read);
router.get("/product/photo/:productId", photo);
router.delete('/product/:productId', remove);
router.param('productId', productById);
module.exports = router;