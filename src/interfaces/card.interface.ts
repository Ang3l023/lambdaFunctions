export interface ICard {
    email: string;
    card_number: number;
    cvv?: number;
    expiration_month: string;
    expiration_year: string;
}

export interface IPayload {
    email: string;
}

export interface ICardRedis extends ICard {
    token: string;
}
