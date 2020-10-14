const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;

class ResponseModel {
    constructor(statusCode,body) {
        console.log('ALLOW_ORIGIN', ALLOW_ORIGIN);
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
        this.headers = {
            'Access-Control-Allow-Origin': ALLOW_ORIGIN
        };
      }
}

module.exports = ResponseModel;