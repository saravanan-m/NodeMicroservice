const formatYupErrors = validationError => {
    if (!validationError.inner) {
        throw new Error('invalid.input');
    }

    if (validationError.inner.length === 0) {
        if (validationError.path === undefined) return validationError.errors;
        return { [validationError.path]: validationError.errors };
    }

    return validationError.inner.reduce((acc, err) => {
        acc[err.path] = err.errors;
        return acc;
    }, {});
};


module.exports = {
    formatYupErrors
}