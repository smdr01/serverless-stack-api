export default function handler(lambda){
    return function (event,context){
        return Promise.resolve()
        // Run the Lamda
        .then(() => lambda(event,context))
        // On Success
        .then((responseBody) => [200,responseBody])
        // On Failure
        .catch((e) => { return [500,{ error: e.message }]; })
        //Return Http Response
        .then(([statusCode,body]) => ({
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(body),
        }));
    };
}