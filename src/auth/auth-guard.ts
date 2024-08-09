import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token missing");
    }

    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;

      if (!decoded || !decoded.exp) {
        throw new UnauthorizedException("Invalid token");
      }

      // Check if the token is expired
      const isValid = this.validateToken(decoded);
      if (!isValid) {
        throw new UnauthorizedException("Token is expired");
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  validateToken(decodedToken: jwt.JwtPayload): boolean {
    try {
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        console.log("Token is expired");
        return false;
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
