declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;

    AUTH_SECRET_KEY: string;

    RESEND_API_KEY: string;
    RESEND_FROM: string;

    STRIPE_SECRET_KEY: string;
    STRIPE_PRODUCT_ID: string;
    STRIPE_PROMO_ID: string;

    SERV_URL: string;
  }
}
