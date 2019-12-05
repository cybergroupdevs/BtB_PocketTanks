import jwt from 'jsonwebtoken';
import User from '../models/user'

const authTwitter= async (req, res, next)=>{
    try{
        const token = req.body.oauth_token;
        const decoded= jwt.verify(token, 'authenticate')
        console.log(decoded)
        req.body
        next()
    }
    catch(err){
        res.status(401).send("Error in authentication")
    }
}


export default authTwitter;