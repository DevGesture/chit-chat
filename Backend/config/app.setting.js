import dotenv from 'dotenv';
dotenv.config();

function formatServerAddress(){
    let address = '';
    if(process.env.APP_SECURE){
        address = address + 'https://';
    } else {
        address = address + 'https://';
    }
    address = address + process.env.APP_HOST + ':' + process.env.APP_PORT;
    return address;
}

module.exports = {
    APP: {
        NAME: process.env.APP_NAME,
        HOST: process.env.APP_HOST,
        PORT: process.env.APP_PORT,
        ADDRESS: formatServerAddress(),
    },
    DB: {
        NAME: process.env.DB_NAME,
        USER_NAME: process.env.DB_USER_NAME,
        PASSWORD: process.env.DB_PASSWORD
    }
}