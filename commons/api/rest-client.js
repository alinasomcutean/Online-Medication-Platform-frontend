function performRequest(request, callback) {
    fetch(request) /*inbuilt JavaScript method for getting resources from a server endpoint*/
        .then(
            function (response) {
                if(response.ok) {
                    response.json().then(json => callback(json, response.status, null));
                } else{
                    response.json().then(err => callback(null, response.status, err));
                }
            })
        .catch(function(err) {
            callback(null, 1, err)
        });
}

module.exports = {
    performRequest
}