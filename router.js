import Router from 'express';
const router = new Router();
import controller from './controller.js';

router.post('/shorter', controller.createShortUrl);
router.get('/:shortId', controller.getFullUrl);

export default router;