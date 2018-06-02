// import c3prLOG = require("node-c3pr-logger");
import * as c3prLOG from "node-c3pr-logger";

import express = require('express');
import bodyParser = require('body-parser');

import config from '../config';

const app = express();

app.use(express.static('resources/public'));

app.use(bodyParser.json());

require('./c3prHubListenerController')(app);
require('./webhooksController')(app);

app.get('*', function(req, res){
    // The 404 Route (ALWAYS Keep this as the last route)
    res.status(404).send(`No C3PR endpoint is listening at ${req.url}.`);
});

app.listen(config.c3pr.repoGitlab.c3prRepoGitlabPort, '0.0.0.0', () => {
    console.log(`
c3pr-repo-gitlab now listening at port ${config.c3pr.repoGitlab.c3prRepoGitlabPort}.

c3pr-repo-gitlab webhooks URL will be: ${config.c3pr.repoGitlab.c3prRepoGitlabUrl + config.c3pr.repoGitlab.webhooksUrl}

c3pr's git username and email are: '${config.c3pr.repoGitlab.gitlab.botUserName.replace(/'/g, '')}' <'${config.c3pr.repoGitlab.gitlab.botUserEmail.replace(/'/g, '')}'>
`);
    c3prLOG(`C-3PR Github Repo is up at ${config.c3pr.repoGitlab.c3prRepoGitlabUrl}.`, {nodeName: 'c3pr-repo-gitlab', correlationIds: 'boot', moduleName: 'express'});
});