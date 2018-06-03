import {GitLabMergeRequestCreated} from "../../ports/types/GitLabMergeRequestCreated";
import {Event} from '../../ports/types/Event';


export function createPullRequestCreated(pullRequestRequestedEvent: Event<any>, createMrResult: GitLabMergeRequestCreated) {
    return {
        parent: {
            event_type: "PullRequestRequested",
            uuid: pullRequestRequestedEvent.uuid
        },
        repository: pullRequestRequestedEvent.payload.repository,
        pr_id: createMrResult.iid,
        pr_url: createMrResult.web_url
    }
}