const axios = require('axios');
const config = require('../../config');

const encodeGroupProjectPath = require('./encodeGroupProjectPath');

async function getGitLabProject(projectId) {
    let {data: getProject} = await axios.get(
        `${config.c3pr.repoGitlab.gitlab.url}/api/v4/projects/${encodeGroupProjectPath(projectId)}`,
        {headers: {"PRIVATE-TOKEN": config.c3pr.repoGitlab.gitlab.apiToken}}
    );
    return getProject;
}

module.exports = getGitLabProject;