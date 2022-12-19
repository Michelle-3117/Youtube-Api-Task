"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// router.post('/register', createUser);
router.get('/login', userController_1.signinUser);
router.get('/oauth2callback', userController_1.oauth2);
router.get('/numOfLikes', userController_1.numOfLikes);
exports.default = router;
// import { Router, Request, Response, NextFunction } from 'express';
// var router = Router();
// /* GET home page. */
// router.get('/', function (req: Request, res:Response, next:NextFunction) {
//   res.render('index');
// });
// export default router;
