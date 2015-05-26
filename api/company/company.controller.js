// Company Service
var companyService = require('./company.service');

// Contributor Service
var contributionService = require('../contribution/contribution.service');

exports.getCompanyInformation = function(req, res) {
  companyService
    .findCompany(req.params.id)
    .then(function(company){
      res.send(company);
    });
}

exports.getTopContributingCompanies = function(req, res) {
  contributionService
    .findTopContributingCompanies(req.params.limit)
    .then(function(companies){
      res.send(companies);
    });
}
