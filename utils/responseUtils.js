exports.buildErrorMessage = function(message) {
    return { success: false, message: message };
};

exports.buildSuccessResponse = function(responseObjects) {
    responseObjects.success = true;
    return responseObjects;
};

exports.forbidden = function(res, message) {
    res.status(403).json({ success: false, message: message });
};