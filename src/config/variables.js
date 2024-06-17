require('dotenv').config();

const getEnvVariable = (key, defaultValue) => {
    const value = process.env[key];
    if (value === undefined) {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        console.log(`Environment variable ${key} is not defined`);
        process.exit(1);
    }
    return value;
};

const variables = {
    port: getEnvVariable('PORT', 3000),
    secret: getEnvVariable('SECRET'),
    modelUrl: getEnvVariable('MODEL_URL'),
    dataset: getEnvVariable('DATASET_PATH')
};

module.exports = variables;
