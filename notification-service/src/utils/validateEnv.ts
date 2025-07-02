export const ENV = {
    get PORT() {
        return process.env.PORT;
    }
}

export const validateEnv = () => {
    if(!ENV.PORT) {
        throw new Error('PORT is not provided in the env');
    }
}