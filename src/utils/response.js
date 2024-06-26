const sendResponse = (res, statusCode, message = '', data = null) => {
    if (res.headersSent) {
        return;
    }
    let response = {status: statusCode < 300 ? 'success' : 'error', message};
    if (data !== null) response.data = data;
    return statusCode === 204 ? res.status(statusCode).send() : res.status(statusCode).json(response);
};

const response = {
    Success: (res, message = 'Ok', data) => sendResponse(res, 200, message, data),
    Created: (res, message = 'Created', data) => sendResponse(res, 201, message, data),
    Accepted: (res, message = 'Accepted', data) => sendResponse(res, 202, message, data),
    NoContent: (res) => sendResponse(res, 204, 'No Content'),
    BadRequest: (res, message = 'Bad Request') => sendResponse(res, 400, message),
    Unauthorized: (res, message = 'Unauthorized') => sendResponse(res, 401, message),
    PaymentRequired: (res, message = 'Payment Required') => sendResponse(res, 402, message),
    Forbidden: (res, message = 'Forbidden') => sendResponse(res, 403, message),
    NotFound: (res, message = 'Not Found') => sendResponse(res, 404, message),
    MethodNotAllowed: (res, message = 'Method Not Allowed') => sendResponse(res, 405, message),
    NotAcceptable: (res, message = 'Not Acceptable') => sendResponse(res, 406, message),
    ProxyAuthenticationRequired: (res, message = 'Proxy Authentication Required') => sendResponse(res, 407, message),
    RequestTimeout: (res, message = 'Request Timeout') => sendResponse(res, 408, message),
    Conflict: (res, message = 'Conflict') => sendResponse(res, 409, message),
    Gone: (res, message = 'Gone') => sendResponse(res, 410, message),
    LengthRequired: (res, message = 'Length Required') => sendResponse(res, 411, message),
    PreconditionFailed: (res, message = 'Precondition Failed') => sendResponse(res, 412, message),
    PayloadTooLarge: (res, message = 'Payload Too Large') => sendResponse(res, 413, message),
    URITooLong: (res, message = 'URI Too Long') => sendResponse(res, 414, message),
    UnsupportedMediaType: (res, message = 'Unsupported Media Type') => sendResponse(res, 415, message),
    RangeNotSatisfiable: (res, message = 'Range Not Satisfiable') => sendResponse(res, 416, message),
    ExpectationFailed: (res, message = 'Expectation Failed') => sendResponse(res, 417, message),
    ImATeapot: (res, message = "'I'm a teapot'") => sendResponse(res, 418, message),
    MisdirectedRequest: (res, message = 'Misdirected Request') => sendResponse(res, 421, message),
    UnprocessableEntity: (res, message = 'Unprocessable Entity') => sendResponse(res, 422, message),
    Locked: (res, message = 'Locked') => sendResponse(res, 423, message),
    FailedDependency: (res, message = 'Failed Dependency') => sendResponse(res, 424, message),
    TooEarly: (res, message = 'Too Early') => sendResponse(res, 425, message),
    UpgradeRequired: (res, message = 'Upgrade Required') => sendResponse(res, 426, message),
    PreconditionRequired: (res, message = 'Precondition Required') => sendResponse(res, 428, message),
    TooManyRequests: (res, message = 'Too Many Requests') => sendResponse(res, 429, message),
    RequestHeaderFieldsTooLarge: (res, message = 'Request Header Fields Too Large') => sendResponse(res, 431, message),
    UnavailableForLegalReasons: (res, message = 'Unavailable For Legal Reasons') => sendResponse(res, 451, message),
    InternalServerError: (res, message = 'Internal Server Error') => sendResponse(res, 500, message),
    NotImplemented: (res, message = 'Not Implemented') => sendResponse(res, 501, message),
    BadGateway: (res, message = 'Bad Gateway') => sendResponse(res, 502, message),
    ServiceUnavailable: (res, message = 'Service Unavailable') => sendResponse(res, 503, message),
    GatewayTimeout: (res, message = 'Gateway Timeout') => sendResponse(res, 504, message),
    HTTPVersionNotSupported: (res, message = 'HTTP Version Not Supported') => sendResponse(res, 505, message),
    VariantAlsoNegotiates: (res, message = 'Variant Also Negotiates') => sendResponse(res, 506, message),
    InsufficientStorage: (res, message = 'Insufficient Storage') => sendResponse(res, 507, message),
    LoopDetected: (res, message = 'Loop Detected') => sendResponse(res, 508, message),
    NotExtended: (res, message = 'Not Extended') => sendResponse(res, 510, message),
    NetworkAuthenticationRequired: (res, message = 'Network Authentication Required') => sendResponse(res, 511, message),
};

module.exports = response;
