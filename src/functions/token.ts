import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    APIGatewayProxyHandler
} from 'aws-lambda';
import { ICard } from '../interfaces/card.interface';
import { GenerateToken } from '../jwt/token.jwt';
import { Conexion } from '../redis/conexion';

export const handler: APIGatewayProxyHandler = async (
    evt: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const authorization = evt.headers.Authorization;
        if (!authorization) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'forbidden Request' })
            };
        }
        const parseBody: ICard = JSON.parse(evt.body || '');
        if (!parseBody) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Card data is required' })
            };
        }

        const { valid, message } = ValidateCreditCard(parseBody);

        if (!valid) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message })
            };
        }

        const token = GenerateToken(parseBody);

        const conexion = new Conexion();

        await conexion.Connect();

        await conexion.SetHSet(token, { token, ...parseBody });

        await conexion.CloseConexion();

        return {
            statusCode: 200,
            body: JSON.stringify({ token })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'An error ocurred'
        };
    }
};

function ValidateCreditCard(card: ICard): {
    valid: boolean;
    message: string | null;
} {
    let message: string | null = null;
    let valid: boolean = true;

    if (!validateCardNumber(card.card_number)) {
        valid = false;
        message = 'Number card is not valid';
    }

    if (!validateCvv(card.cvv?.toString() || '')) {
        valid = false;
        message = 'CVV is not valid';
    }

    if (!validateEmail(card.email)) {
        valid = false;
        message = 'Email is not valid';
    }

    if (!validateMothExpiration(Number(card.expiration_month))) {
        valid = false;
        message = 'Month is not valid';
    }

    if (!validateYearExpiration(card.expiration_year)) {
        valid = false;
        message = 'Year is not valid';
    }

    return { valid, message };
}

function validateCardNumber(card_number: number): boolean {
    let odd = true;
    let sum = 0;
    Array.from(String(card_number))
        .reverse()
        .forEach((num: string) => {
            sum += Array.from(
                String((odd = !odd) ? Number(num) * 2 : Number(num))
            ).reduce((a, b) => Number(a) + Number(b), 0);
        });
    return sum % 10 === 0 && sum !== 0;
}

function validateCvv(cvv: string): boolean {
    return cvv.length === 3 || cvv.length === 4;
}

function validateMothExpiration(month: number) {
    return month > 0 && month < 13;
}

function validateYearExpiration(year: string) {
    const yearNumber = Number(year);
    const yearActual = new Date().getFullYear();
    return year.length === 4 && yearNumber <= yearActual + 5;
}

function validateEmail(email: string) {
    const domainsValids: string[] = ['gmail.com', 'hotmail.com', 'yahoo.es'];
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (
        regex.test(email) &&
        domainsValids.some((domain) => email.includes(`@${domain}`))
    );
}
