export class ErrorHandler {
    static handleError(err, req, res, next) {
        if (!err.statusCode) {
            console.log(err);
        }
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
}
