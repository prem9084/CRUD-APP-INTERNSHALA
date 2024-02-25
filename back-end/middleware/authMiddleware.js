import JWT from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const decod = JWT.verify(req.headers.authorization, process.env.JWT);
    req.user = decod;
    next();
  } catch (error) {
    console.log(error);
  }
};
