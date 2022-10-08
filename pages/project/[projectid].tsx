import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import JobRow from "../../components/jobRow";
import PipelineRow from "../../components/pipelineRow";
import { fetchJobs, fetchPipelines, fetchProject } from "../../fetch";
import { Job, Pipeline, Project } from "../../models";

interface ProjectPageVM {
  project: Project;
  pipelines: Pipeline[];
  jobs: Job[];
}

const ProjectPage: NextPage<ProjectPageVM> = ({ project, pipelines, jobs }) => {

  const pipelinesList = () =>
    pipelines.map((p) => <PipelineRow key={p.id} pipeline={p} />);

  const jobsList = () =>
    jobs.map((j) => <JobRow key={j.id} job={j} />);

  return (
    <>
      Project page where it infinite-load pipelines for project{" "}
      <a href={project.web_url} className="font-bold">{project.name}</a>
      <div className="my-8">{pipelinesList()}</div>
      <div className="my-8">{jobsList()}</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProjectPageVM> = async ({
  params,
}) => {
  if (!params) throw new Error();
  const { projectid: _projectid } = params;
  if (!_projectid || Array.isArray(_projectid)) throw new Error();

  const projectId = Number.parseInt(_projectid);

  const project = await fetchProject(projectId);
  const pipelines = await fetchPipelines(projectId);
  const jobs = await fetchJobs(projectId);

  return { props: { project, pipelines, jobs } };
};

export default ProjectPage;
