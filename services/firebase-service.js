const admin = require('firebase-admin');

admin.initializeApp({
    apiKey: "AIzaSyDwiwaKPwG8AUqQ84gNOXl_wyzWqvo_y5U",
    authDomain: "social-project-da4c7.firebaseapp.com",
    projectId: "social-project-da4c7",
    storageBucket: "social-project-da4c7.appspot.com",
    messagingSenderId: "197332785691",
    appId: "1:197332785691:web:d4ebaeb110219ca64976be",
    measurementId: "G-MDMRR431DD"
});

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};

const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin
                .auth()
                .verifyIdToken(authToken);
            req.authId = userInfo.uid;
            return next();
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
};


module.exports = {
    checkIfAuthenticated
}