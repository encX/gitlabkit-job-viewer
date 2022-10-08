import { GitLabHost, GitLabKey } from "./constants";
import { Job, Pipeline, Project } from "./models";

async function fetchGitLab<T>(path: string): Promise<T> {
  const resp = await fetch(`${GitLabHost}/${path}`, {
    headers: { "PRIVATE-TOKEN": GitLabKey },
  });

  if (resp.status === 404) {
    throw new Error("not found");
  }

  if (resp.status !== 200) {
    throw new Error(`Gitlab returned status ${resp.status};`);
  }

  return await resp.json() as T;
}

export async function fetchProject(projectId: number): Promise<Project> {
  return await fetchGitLab<Project>(`api/v4/projects/${projectId}`);
}

export async function fetchPipelines(projectId: number): Promise<Pipeline[]> {
  return await fetchGitLab<Pipeline[]>(`api/v4/projects/${projectId}/pipelines`);
}

export async function fetchJobs(projectId: number): Promise<Job[]> {
  return await fetchGitLab<Job[]>(`api/v4/projects/${projectId}/jobs`);
}
