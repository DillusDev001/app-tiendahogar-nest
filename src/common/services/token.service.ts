import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
    private secretKey = process.env.TOKEN_KEY;  // Cambia esto por algo más seguro

    // Método para generar un token
    generateToken(obj: any) {
        //const payload = { obj };  // Puedes agregar más datos si es necesario
        const token = jwt.sign(obj, this.secretKey, { expiresIn: '1h' }); // El token expirará en 1 hora
        return token;
    }
}