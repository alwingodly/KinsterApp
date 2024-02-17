import AdminPass from "../models/adminPassSchema.js";
import jwt from 'jsonwebtoken'
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await AdminPass.findOne({ 'allowedUsers.email': email });
    if (user) {
      console.log("user found");
      const foundUser = user.allowedUsers.find(allowedUser => allowedUser.email === email);
     
      if (foundUser && foundUser.password === password) {
        console.log("valid user");
        const token = jwt.sign({ userId: foundUser._id, email: foundUser.email }, 'your-secret-key', { expiresIn: '1h' });
        
        res.status(200).json({ success: true, tokens:token, user: foundUser });
      } else {
      console.log("invalid email or pass");
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      console.log('no user 2');
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
  
}  

const TsuperAdminId = "super";
const Tpassword = "123";
const Tmessage = "SuperAdminLogged";

export const superAdminAuthentications = async (req, res) => {
  try {
    const { superAdminId, password } = req.body;
    req.session = req.session || {};
    if (TsuperAdminId === superAdminId && Tpassword === password) {
      req.session.admin = TsuperAdminId;
      const token = jwt.sign({ id: TsuperAdminId }, process.env.JWT_SECRET);
      res.cookie('resident', token, { httpOnly: true }).status(200).json({ success: true, message: Tmessage });
    } else {
      return res.status(401).json({ success: false, message: 'invalid admin credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



