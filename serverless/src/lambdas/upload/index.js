const ResponseModel = require('../../commons/ResponseModel');
const AWS = require("aws-sdk");
AWS.config.update({region: 'ap-southeast-1'});
const S3 = new AWS.S3();

const FILE_BUCKET = process.env.FILE_BUCKET;
console.log(`FILE_BUCKET : ${FILE_BUCKET}`);

exports.handler = async (event) => {
    console.log(event);
    let fileName = event.queryStringParameters['file-name'];
    let gd = event.queryStringParameters['gd'];
    if( !fileName || !gd ) {
        return new ResponseModel(400,{message: 'Missing file name or GD'});
    } else {

        fileName = `${gd}__${Date.now()}_${fileName}`;
    }

    let date = new Date();
    const objectKey = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}/${gd}/${fileName}`;

    const param = {
        Bucket: FILE_BUCKET,
        Key: objectKey,
        Expires: 15 * 60,
        ContentType: 'binary/octet-stream'
    }
    const url = S3.getSignedUrl('putObject', param);
    return new ResponseModel(200,{url});
}