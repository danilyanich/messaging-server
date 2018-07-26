const Joi = require('joi');
const uuid = require('uuid/v1');
const firebase = require('firebase');

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const genId = serviceName => `${serviceName}-${uuid()}`;

const validate = (document, schema) => {
  const { value, error } = Joi.validate(document, schema);
  if (error) throw new Error(error);
  return value;
};

module.exports.createService = (serviceName, schema) => {
  const service = db.collection(serviceName);

  service.applyQuery = (query = []) => {
    return query.reduce((queryAcc, options) => queryAcc.where(...options), service);
  };

  service.create = async (document) => {
    const data = validate(document, schema);
    const id = genId(serviceName);

    data._id = id;
    data.createdOn = new Date();

    await service.doc(id).set(data);
    return data;
  };

  service.find = async (query) => {
    const querySnapshot = await service.applyQuery(query).get();
    return querySnapshot.docs.map(doc => doc.data());
  };

  service.findOne = async (query = []) => {
    if (typeof query === 'string') {
      const doc = await service.doc(query).get();
      return doc.data();
    } else {
      const querySnapshot = await service.applyQuery(query).get();

      if (querySnapshot.empty) return null;
      if (querySnapshot.size !== 1) throw new Error('Returned multiple docs for query');

      return querySnapshot.docs[0].data();
    }
  };

  return service;
};

module.exports.firestore = db;
