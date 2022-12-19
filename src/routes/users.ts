import { Router } from 'express';
import { numOfLikes, oauth2, signinUser } from '../controllers/userController'

const router = Router();

// router.post('/register', createUser);
router.get('/login', signinUser)
router.get('/oauth2callback', oauth2)
router.get('/numOfLikes', numOfLikes)

export default router;

// import { Router, Request, Response, NextFunction } from 'express';
// var router = Router();

// /* GET home page. */
// router.get('/', function (req: Request, res:Response, next:NextFunction) {
//   res.render('index');
// });

// export default router;