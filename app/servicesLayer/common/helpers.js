


const createPropertiesArrayFromObjectProperties = function(obj){
    let properties = [];
    for(const key in obj){
        let newObj =  obj[key];
        properties.push(newObj);
    }
    return properties;
}


const helpers = Object.freeze({
    createPropertiesArrayFromObjectProperties: createPropertiesArrayFromObjectProperties
});

module.exports = helpers;