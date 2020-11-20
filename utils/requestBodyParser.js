
const parseRequestBody = (data) => {
    const update = {};
    for(let key in data) {
        if(data[key] != null){
            update[key] = data[key];
        }
    }

    return update;
}

module.exports = parseRequestBody;