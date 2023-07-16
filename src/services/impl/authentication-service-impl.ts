import bcryptjs from 'bcryptjs';

import { AuthenticationService } from '../authentication-service';

export class AuthenticationServiceImpl implements AuthenticationService {
  hashPassword(password: string): string {
    return bcryptjs.hashSync(password, 8);
  }
}
