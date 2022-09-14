const User = require ("./user.model");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({id: user._id, email: user.email},
    "405da4efc202abf8cea2f4f966417c4efb7a0e83f47b8c1d62a7a70b4e68dfec9baffc604ce793f222c1133fad14dc85dc5f40112d7bbba9912e28a1814d5cc2",
   {
     expiresIn: "1h",
   }
 );

 return {
   token,
   user,
 };
}

exports.register = async (req, res) => {
   const {email, password} = req.body;

   // checking if email exists
   const emailExists = await User.findOne({email});
   if (emailExists){
    return res.status(400).json({error: "Email already in used."});
   }

   const hashedPassword = await bcrypt.hash(password, 12)

  const user = await User.create({...req.body, password: hashedPassword});

  //generate token
  const token = generateToken(user)
  

  res.status(201).json({token});

};

exports.login = async (req, res) => {
  const {email, password} = req.body;

  let user = await User.findOne({email});
  if (!user){
    return res.status(400).json({msg: "Invalid credential."});
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    return res.status(400).json({msg: "Invalid credential."});
  }

    //generate token
    const token = generateToken(user)

  res.status(200).json({token});
};

