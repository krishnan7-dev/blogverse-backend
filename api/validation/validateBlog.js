function ValidateBlog(title, content) {
    if (title.length < 5) {
        return { valid: false, error: 'Title too short' };
    }

    if (content.split(' ').length < 100) {
        return { valid: false, error: 'Blog too short' };
    }

    return { valid: true };
}

module.exports = ValidateBlog;