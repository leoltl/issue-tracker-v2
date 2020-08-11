import { Request, Response, NextFunction, Router } from "express";


function authorize(roles: string | Array<string> = []) {
  if (typeof roles == 'string') {
    roles = [roles]
  }

  return [
    function roleAuthorization(req: Request, res: Response, next: NextFunction) {
      if (roles.length && roles.includes(req.user?.role)) {
        next();
        return
      }
      throw new Error ('Unauthorized Access.')
    }
  ]
}

export default authorize;