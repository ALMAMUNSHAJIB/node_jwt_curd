const jwt =  require('jsonwebtoken');
exports.checkLogin = (req, res, next) => {
  try{
      console.log(req.headers);
      const {authorization} = req.headers;
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const {username, userId} = decoded;
      req.username = username;
      req.userId = userId;

      next();

  }catch(err){
      console.log(err);
    next("Authnication failed!!")
  }
};