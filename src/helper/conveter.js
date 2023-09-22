function getDispName(fullname) {
    var result;
    if (fullname) {
        result = fullname.split('-').map(string => (string.charAt(0).toUpperCase() + string.slice(1)))
        result = result.join(' ')
    }
    return result;
}

export {getDispName}