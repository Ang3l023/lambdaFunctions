import { createClient, RedisClientType } from 'redis';
import { ICardRedis } from '../interfaces/card.interface';
import { pksAvaible } from '../jwt/token.jwt';

export class Conexion {
    client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL
        });
    }

    async Connect() {
        this.client.on('error', (err) =>
            console.log('Redis Client Error', err)
        );

        await this.client.connect();
    }

    async SetHSet(key: string, value: ICardRedis) {
        try {
            pksAvaible.map((pk) => {
                if (key.includes(pk)) {
                    key = key.replace(pk, '');
                }
            });
            await this.client.hSet(`jwt:${key}`, { ...value });
        } catch (error) {
            throw error;
        }
    }

    async GetHGetAll(key: string) {
        try {
            pksAvaible.map((pk) => {
                if (key.includes(pk)) {
                    key = key.replace(pk, '');
                }
            });
            const val = await this.client.hGetAll(`jwt:${key}`);
            return val;
        } catch (error) {
            throw error;
        }
    }

    async CloseConexion() {
        await this.client.quit();
    }
}
