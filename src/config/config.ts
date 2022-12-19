const port = 4500;
const clientSecret = process.env.CLIENT_SECRET;

const baseUrl = `http://localhost:${port}`;

export default {
  JWTsecret: process.env.JWT_SECRETE,
  baseUrl: baseUrl,
  port: port,
  oauth2Credentials: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    project_id: process.env.PROJECT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    redirect_url: process.env.REDIRECT_URL,
    auth_provider_cert: process.env.AUTH_PROVIDER_CERT_URL,
    scopes: ['https://www.googleapis.com/auth/yt-analytics.readonly'],
  },
};
//https://www.googleapis.com/auth/yt-analytics.readonly