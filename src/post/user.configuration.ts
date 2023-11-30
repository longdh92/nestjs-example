import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
    requiredRole: 'admin',
}));
