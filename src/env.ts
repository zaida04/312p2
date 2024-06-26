export const IsProd = process.env.NODE_ENV === 'production';
export const IsDev = !IsProd;

export const dbUrl = process.env.DB_URL!;
export const wsApiUrl = process.env.WS_API_URL!;
export const wsPublicUrl = process.env.NEXT_PUBLIC_WS_PUBLIC_URL!;
export const apiUrl = process.env.NEXT_PUBLIC_API_URL!;