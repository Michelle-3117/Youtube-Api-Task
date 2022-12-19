import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/database.config';
import cors from 'cors';
import userRouter from './routes/users';

const app = express()
db.sync()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected successfully');
  })
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

//set up views
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use('/user', userRouter);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
