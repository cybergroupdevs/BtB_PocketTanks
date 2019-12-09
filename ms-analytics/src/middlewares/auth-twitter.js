import jwt from 'jsonwebtoken';

const authTwitter = {

    checkToken: async function authTwitter(req, res, next) {

        try {

            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (token) {
                jwt.verify(token.split(" ")[1], 'authenticateRegistration', (err, decoded) => {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Token is not valid'
                        });
                    } else {
                        req.decoded = decoded;
                        console.log(req.decoded)
                        next();
                    }
                });
            } else {
                return res.json({
                    success: false,
                    message: 'Auth token is not supplied'
                });
            }
        } catch (err) {
            res.status(401).send("err")
        }
    }
}
export default authTwitter.checkToken;