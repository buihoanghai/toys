const _ = require('lodash');
const firebase = require('../firebase');

function getVariantTypeByID(id) {
    const variantTypePromise = firebase.getPath('/variantTypes/' + id);
    return variantTypePromise.once('value').then(snapshot => {
        return snapshot.val() || {};
    });
}
function getVariantTypes() {
    const variantTypesPromise = firebase.getPath('/variantTypes');
    return variantTypesPromise.once('value').then(snapshot => {
        return parseVariantTypes(snapshot.val());
    });
}
function parseVariantTypes(variantTypes){
    var results= [];
    _.each(variantTypes, (item, key) => {
        item.id= key;
        results.push(item);
    });
    return results;
}
function saveVariantType(updateData) {
    return getVariantTypeByID(updateData.id).then(currentData => {
        let updates = {};
        updateData.dateModified = new Date();
        updateData.dateCreated = currentData.dateCreated ? new Date(currentData.dateCreated) : new Date();
        updates['/variantTypes/' + updateData.id] = updateData;

        return firebase.getPath().update(updates).then(updateData => {
            return updateData;
        });
    });
}
// getVariantTypes().then(function (data) {
//     console.log(data);
// })
const variantTypes = {
    getVariantTypeByID : getVariantTypeByID,
    getVariantTypes : getVariantTypes,
    saveVariantType: saveVariantType
};
module.exports = variantTypes;
