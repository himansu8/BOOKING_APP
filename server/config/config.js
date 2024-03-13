import 'dotenv/config'
const config = {
    MONGODB_URI : process.env.MONGODB_URI,
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    JWT :process.env.JWT
}
export default config;