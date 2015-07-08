// Restify
var restify = require('restify');
var server = restify.createServer({name: 'dc-campaign-finance'});
server.use(restify.queryParser());

//Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dc-campaign-finance-new');

// Candidate
var candidateController = require('./api/candidate/candidate.controller');
server.get('/dc-campaign-finance/api/candidate/:id', candidateController.getCandidateById);
server.get('/dc-campaign-finance/api/electedOfficials/:year', candidateController.getElectedOfficials);
server.get('/dc-campaign-finance/api/search/candidate', candidateController.searchForCandidate);

// Company
var companyController = require('./api/company/company.controller');
server.get('/dc-campaign-finance/api/company/:id', companyController.getCompanyInformation);
server.get('/dc-campaign-finance/api/company/contributors/:limit', companyController.getTopContributingCompanies);
server.get('/dc-campaign-finance/api/search/company', companyController.searchForCompany);

// Election
var electionController = require('./api/election/election.controller');
server.get('/dc-campaign-finance/api/electionCountdown', electionController.getNextElection);

// Contribution
var contributionController = require('./api/contribution/contribution.controller');
server.get('/dc-campaign-finance/api/individual/contributors/:limit', contributionController.getTopIndividaulContributors);

server.listen(process.env.PORT || 3000, function(){
    console.log('%s listening at %s', server.name, server.url);
});
