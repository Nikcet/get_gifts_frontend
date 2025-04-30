class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
        this.statusCode = 401;
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 409;
        this.message = message;
    }
}

class DefaultError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DefaultError';
        this.statusCode = 500;
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
        this.statusCode = 403;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class ValueError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValueError';
        this.statusCode = 400;
    }
}

export { AuthError, BadRequestError, DefaultError, ForbiddenError, NotFoundError, ValueError };