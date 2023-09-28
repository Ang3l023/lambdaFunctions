import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    APIGatewayProxyHandler
} from 'aws-lambda';
import { ValidateToken } from '../jwt/token.jwt';
import { Conexion } from '../redis/conexion';

export const handler: APIGatewayProxyHandler = async (
    evt: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const authorizationBearer = evt.headers.Authorization;
        if (!authorizationBearer) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'forbidden Request' })
            };
        }
        const authorization = authorizationBearer.replace('Bearer ', '');

        if (!ValidateToken(authorization)) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'forbidden Request' })
            };
        }

        const conexion = new Conexion();

        await conexion.Connect();

        const cardInfo = await conexion.GetHGetAll(authorization);

        delete cardInfo.cvv;
        delete cardInfo.token;
        delete cardInfo.email;

        await conexion.CloseConexion();

        return {
            statusCode: 200,
            body: JSON.stringify({ ...cardInfo })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'An error ocurred'
        };
    }
};
