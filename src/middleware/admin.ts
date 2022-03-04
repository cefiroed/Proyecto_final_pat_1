import {Request, Response , NextFunction} from 'express';

const admin = true;

export const checkAdmin = (req: Request, res : Response, next: NextFunction) => {
  console.log("Running middleware")
  if(admin)
    next();
  else{
    res.status(401).json({
      msg: "You are not authorized"
    })
  }
}