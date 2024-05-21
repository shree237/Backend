import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;

    console.log(decoded);
    
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;