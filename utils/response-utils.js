exports.NO_DATA = 400
exports.FORBIDDEN = 403
exports.NOT_FOUND = 404
exports.CONFLICT = 409
exports.OK = 200
exports.ERROR = 500

exports.buildError = (message) => {
    var err = {}
    err['error'] = message
    return err
}