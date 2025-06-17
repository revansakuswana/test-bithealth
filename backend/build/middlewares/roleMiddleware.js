"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = roleMiddleware;
function roleMiddleware(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        next();
    };
}
