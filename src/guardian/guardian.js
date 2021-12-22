const { verify } = require("jsonwebtoken");

const guardian = (req, res, next) => {
    const autorization = req.header.autorization;
    if(!autorization) {
        next(JSON.stringify({estado:"Error",msg:"No autorizado"}));
        try {
            const t = autorization.split(' ')[1];
            const payload = verify(t,"misecreto");
            if (payload.rol !== "admin") {
                next(JSON.stringify({estado:"Error",msg:"No autorizado"}));
            }
        } catch (error) {
            console.log(error);
        }
        return next();
    }
}

exports.guardian = guardian;