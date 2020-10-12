// standard JSON return for all API cal
const jsonReturn = function (json) {
    this.api_name = json.api_name;
    this.correlationId = json.correlationId;
    this.data = json.data;
  };
  
  module.exports = jsonReturn;