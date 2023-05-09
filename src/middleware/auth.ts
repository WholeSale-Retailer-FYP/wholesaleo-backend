import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const SECRET_KEY: Secret = process.env.SECRET_KEY as Secret;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  data: any;
}

export const auth = (roles: number[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) throw new Error("No JWT token found");

      const decoded = jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) throw new Error("Invalid JWT token");
        else return decoded;
      }) as unknown as CustomRequest;

      if (!roles.includes(decoded.data.role))
        throw new Error(
          "You do not have necessary permissions to perform this action!"
        );
      (req as CustomRequest).token = decoded;

      next();
    } catch (error) {
      if (error instanceof Error)
        res.status(401).send({ message: error.message });
    }
  };
};
