import 'dotenv/config'

export const dev = {
  app: {
    port: Number(process.env.PORT),
    defaultImagePath: process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.png',
    jwtUserKey: process.env.JWT_SECRET || 'shhhhh',
    smtpUsername: process.env.SMTP_USERNAME || 'amlalgamdi.80@gmail.com',
    smtpPassword: process.env.SMTP_PASSWORD || 'noxo hymh pees teql',
    braintreeMerchantId: process.env.BRAINTREE_MERCHANT_ID,
    braintreePublicKey: process.env.BRAINTREE_PUBLIC_KEY,
    braintreePrivateKey: process.env.BRAINTREE_PRIVATE_KEY,
  },
  db: {
    url: process.env.MONGODB_URL,
  },
}
