import UserModel from '../models/User.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    

    try {
        const { uname, email, password } = req.body;

       
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({"message":"User already exists"});
        }

        const newUser = new UserModel({
            uname,
            email,
            password 
        });

        await newUser.save();
        return res.status(201).send({"message":"User Registered"});
    } catch (error) {
        console.error({"message":"Error registering user:"}, error);
        return res.status(500).send({"message":"Something went wrong!"});
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

      
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({"message":"User not found"});
        }

        if (user.password !== password) {
            return res.status(400).send({"message":"Password is incorrect"});
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            "secretKey",
            { expiresIn: '1h' }
          );
         
          return res.json({"token":token});
      
    } catch (error) {
        console.error({"message":"Error logging in user:"}, error);
        return res.status(500).send({"message":"Something went wrong!"});
    }
};







