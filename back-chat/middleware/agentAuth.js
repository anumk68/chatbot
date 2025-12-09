import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'SECRET_KEY');
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default protect;
