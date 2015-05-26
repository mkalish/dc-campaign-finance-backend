// Bluebird
var Promise = require('bluebird');

var _ = require('lodash');


//

// Contribution Model
var Contribution = require('../../models/contribution');
Promise.promisifyAll(Contribution);

//Company model
var Company = require('../../models/company');
Promise.promisifyAll(Company);

// Company service
var companyService = require('../company/company.service');

exports.findTopContributingCompanies = function(limit, year) {
  return Contribution
      .aggregateAsync(
        {$match: {contributorType: "Corporate"}},
        {$group: {_id: '$contributorName', amount: { $sum: '$amount'} }},
        {$sort: {'amount': -1}},
        {$limit: 10})
      .then(function(results){
        var populatedCompanies = _.map(results, function(result){
          return companyService
            .findCompanyDetails(result._id)
            .then(function(company){
              result.company = company;
              return result;
            })
        });
        return Promise.all(populatedCompanies);
      });
}

exports.findTopIndividualContributors = function(year) {
  return Contribution
    .aggregateAsync(
      {$match: {contributorType: 'Individual'}},
      {$group: {_id: '$contributorName', amount: {$sum: '$amount'}}},
      {$sort: {'amount': -1}},
      {$limit: 10}
    )
    .then(function(results){
      return results;
    });
}

exports.addContribution = function(contribution) {

}

function populateCompanyPromise(id, amount) {
  return companyService
    .findCompanyDetails(id)
    .then(function(company) {
      var data = {};
      data.company = company;
      data.amount = amount;
      return data;
    });
}
