import { Request, Response } from 'express';
import { google } from 'googleapis'
import CONFIG from "../config/config";
import jwt from 'jsonwebtoken';
import axios from 'axios';
const passPhrase = process.env.JWT_SECRETE as string;

interface ResponseData {
  features: any[];
}

const OAuth2 = google.auth.OAuth2

export async function signinUser(req: Request, res: Response){
    try{
        const oauth2Client = new OAuth2(
            CONFIG.oauth2Credentials.client_id,
            CONFIG.oauth2Credentials.client_secret,
            CONFIG.oauth2Credentials.redirect_url
        );

        const loginLink = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: CONFIG.oauth2Credentials.scopes
        })   
        return res.render('index', {loginLink : loginLink});
    }catch(error){
        return res.status(500).json({
          message: `failed to fetch users information:  ${error}`,
          route: '/login',
        });
    }
}

export async function oauth2(req: Request, res: Response) {
    try {
        const oauth2Client = new OAuth2(
          CONFIG.oauth2Credentials.client_id,
          CONFIG.oauth2Credentials.client_secret,
          CONFIG.oauth2Credentials.redirect_url,
        )

        const req1 = req.query.code as any;
        
        if (req.query.error) {
            return res.redirect('/user/login')
        } else {
            oauth2Client.getToken(req1, function (err, token) {
                if (err) console.log("errrrr")
                
                    res.cookie(jwt as any, jwt.sign({token} as any, CONFIG.JWTsecret as any)) as string | any;
                    return res.render('numOfLikes')
                })
        }
    } catch (error) {
        return res.status(500).json({
            message: `an error was encountered ${error}`
        })
    }
}
// const result = axios.get(
//   `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeUser}&key=${youtubeKey}`,
// );

export async function numOfLikes(req: Request, res: Response) {
    try {
        if (!req.cookies.jwt) {
            return res.redirect('/')
        }
        const oauth2client = new OAuth2(
            CONFIG.oauth2Credentials.client_id,
            CONFIG.oauth2Credentials.client_secret,
            CONFIG.oauth2Credentials.redirect_url,
        );
        console.log('happy');
        let newAuth = oauth2client.credentials as any
        newAuth = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret as any);
        
        //call the youtube api
        const service = google.youtube('v3')
        //get list of user liked videos
        service.playlistItems.list({
            auth: newAuth,
            playlistId: "LM",

        })
            .then((response) => {
                console.log(response)
                return res.render('numOfLikes', { numOfLikes: response.data });
            })
    } catch (error) {
        return res.status(500).json({
            message: `an error was encountered ${error}`,
        });
    }
}


// export async function createUser(req: Request, res: Response): Promise<unknown> {
//   try {
//     let newId = uuidv4();
//     const validationResult = createUserSchema.validate(req.body, options);

//     if (validationResult.error) {
//       return res.status(400).json({
//         error: validationResult.error.details[0].message,
//       });
//     }

//     const duplicateEmail = await UserInstance.findOne({
//       where: { email: req.body.email },
//     });
//     if (duplicateEmail) {
//       return res.status(409).json({
//         error: 'email is already taken',
//       });
//     }

//     const duplicatePhoneNumber = await UserInstance.findOne({
//       where: {
//         phonenumber: req.body.phonenumber,
//       },
//     });

//     if (duplicatePhoneNumber) {
//       return res.status(409).json({
//         error: 'phone number already exists',
//       });
//     }

//     const passwordHash = await bcrypt.hash(req.body.password, 8);

//     const record = await UserInstance.create({
//       id: newId,
//       fullname: req.body.fullname,
//       email: req.body.email,
//       password: passwordHash,
//       phonenumber: req.body.phonenumber,
//     });

//     return res.status(201).json({
//       message: 'User created successfully',
//       record,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `an error just occured ${error}`,
//     });
//   }
// }


// export async function signinUser(req: Request, res: Response){
//     try{
//         const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURL);
//         const scopes = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

//         const url = oauth2Client.generateAuthUrl({
//           access_type: 'offline',
//           scope: scopes,
//           state: JSON.stringify({
//             callbackUrl: req.body.callbackUrl,
//             userID: req.body.userID,
//           }),
//           include_granted_scopes: true
//         });
//         return res.status(res.statusCode).send({
//           url
//         });
//     }catch(error){
//         return res.status(500).json({
//           message: `failed to fetch users information:  ${error}`,
//           route: '/login',
//         });
//     }
// }

