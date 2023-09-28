import jwt from 'jsonwebtoken';
import { ICard, IPayload } from '../interfaces/card.interface';

export const pksAvaible = ['pk_test_'];

export function GenerateToken(card: ICard): string {
    try {
        const secretkey: string = process.env.privateKey || '';
        delete card.cvv;
        const token = jwt.sign({ email: card.email }, secretkey, {
            expiresIn: '15m'
        });
        return token;
    } catch (error) {
        throw error;
    }
}

export function ValidateToken(token: string): boolean {
    try {
        if (!pksAvaible.some((pk) => token.includes(pk))) {
            return false;
        }
        pksAvaible.map((pk) => {
            if (token.includes(pk)) {
                token = token.replace(pk, '');
            }
        });
        const secretkey: string = process.env.privateKey || '';
        jwt.verify(token, secretkey);
        return true;
    } catch (error) {
        return false;
    }
}

export function DecodeToken(token: string): IPayload {
    try {
        const decoded = jwt.decode(token, { complete: true });
        return decoded?.payload as IPayload;
    } catch (error) {
        throw error;
    }
}
