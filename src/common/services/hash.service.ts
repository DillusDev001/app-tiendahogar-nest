import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

    async hashText(text: string): Promise<string> {
        const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS);
        return bcrypt.hash(text, saltRounds);
    }

    async compareTexts(plainTextText: string, hashedText: string): Promise<boolean> {
        return bcrypt.compare(plainTextText, hashedText);
    }
}
