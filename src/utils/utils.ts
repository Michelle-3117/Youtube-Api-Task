import Joi from 'joi';
import jwt from 'jsonwebtoken';


export const createUserSchema = Joi.object()
  .keys({
    fullname: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    phonenumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref('password'))

      .required()

      .label('Confirm password')

      .messages({ 'any.only': '{{#label}} does not match' }),
  })
    .with('password', 'confirmPassword');
    
  export const loginUserSchema = Joi.object().keys({
    userInfo: Joi.string().trim().lowercase().required(),
    password: Joi.string().required(),
  });

  export const generateToken = (user: Record<string, unknown>): unknown => {
    const passPhrase = process.env.JWT_SECRETE as string;
    return jwt.sign(user, passPhrase, { expiresIn: '7d' });
  };

  export const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: '',
      },
    },
  };