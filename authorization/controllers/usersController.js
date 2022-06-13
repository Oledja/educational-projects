 const userService = require('../services/userService'); 

 class UserController {
     async signUp(req, res) {
         try {
            const newUser = req.body;
            await userService.signUp(newUser);
            res.status(200);
            res.send(`Successful registration user with email: ${newUser.email}`);
         } catch (err) {
            res.status(400).json({message: err.message});
         }
     }

     async login(req, res) {
        try {
            const {email, password} = req.body;
            const pairTokens = await userService.login(email, password);
            res.json({ token: pairTokens.token,
                       refreshToken: pairTokens.refreshToken  
                     });
        } catch (err) {
            res.status(400).json({message: err.message});    
        }
    }

    async refresh(req, res) {
        try {
            const refreshToken = req.refreshToken;
            const pairTokens = await userService.refresh(refreshToken);
            res.status(200).json(pairTokens);
        } catch (err) {
            res.status(401).json({message: "Unauthorised"});  
        }
    }

    async getMe(req, res) {
        try {
            const response =  await userService.getMe(req.url, req.user);
            res.send(response);
        } catch (err) {
            res.status(401).json({message: "Unauthorised"});
        }
    }
 }
module.exports = new UserController();