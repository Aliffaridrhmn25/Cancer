const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getData = require('../services/getData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const data = {
    id: id,
    result: confidenceScore == 100 ? 'Cancer' : 'Non-cancer',
    explanation: explanation,
    suggestion: suggestion,
    confidenceScore: confidenceScore,
    createdAt: createdAt,
  };

  await storeData(id,data);

  const response = h.response({
    status: 'success',
    message:'Model is predicted successfully',
    data
  })
  response.code(201);
  return response;
}

async function getDataPredictions(request, h) {
 const data =  await getData();
 const response = h.response({
	status: 'success',
	data : data
});
 response.code(200);
 return response;
}

module.exports = {postPredictHandler, getDataPredictions};
