// error handler return 400 status + error stack if entries fail validation
exports.error400Handler = (error, res) => {
    console.log('ERROR: ', error.name);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
    } else {
        throw error;
    }
};