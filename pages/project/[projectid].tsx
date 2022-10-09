import { useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import JobRow from "../../components/jobRow";
import { fetchJobs, fetchProject } from "../../fetch";
import { Job, Project } from "../../models";
import ToggleableBtn from "../../components/toggleableBtn";

interface ProjectPageVM {
  project: Project;
  jobs: Job[];
  jobOptions: string[];
}

const ProjectPage: NextPage<ProjectPageVM> = ({
  project,
  jobs,
  jobOptions,
}) => {
  const [job, selectJob] = useState(jobOptions[0]);
  const [source, setSource] = useState<string | undefined>();
  const [isDefaultBranch, setIsDefaultBranch] = useState<boolean | undefined>();

  const jobsList = () =>
    jobs
      .filter((j) => j.name === job)
      .filter(
        (j) =>
          !source ||
          j.pipeline.source === source ||
          (source === "other" &&
            !/push|schedule|merge_request_event/.test(j.pipeline.source))
      )
      .filter(
        (j) =>
          isDefaultBranch === undefined ||
          j.pipeline.ref === project.default_branch
      )
      .map((j) => <JobRow key={j.id} job={j} />);

  const jobOptionToggle = () =>
    jobOptions.map((j) => (
      <button
        key={j}
        className={"btn " + (job === j ? "btn-secondary" : "")}
        onClick={() => selectJob(j)}
      >
        {j}
      </button>
    ));

  return (
    <>
      Project page where it paginated-load pipelines for project{" "}
      <a href={project.web_url} className="font-bold">
        {project.name}
      </a>
      <div className="my-4">Default branch: {project.default_branch}</div>
      <h1 className="text-xl">Job</h1>
      <div className="block btn-group">{jobOptionToggle()}</div>
      <h1 className="text-xl">Event</h1>
      <div className="block btn-group">
        <ToggleableBtn
          currentValue={source}
          desiredValue="push"
          set={setSource}
          text="Push"
        />
        <ToggleableBtn
          currentValue={source}
          desiredValue="merge_request_event"
          set={setSource}
          text="MR"
        />
        <ToggleableBtn
          currentValue={source}
          desiredValue="schedule"
          set={setSource}
          text="Schedule"
        />
        <ToggleableBtn
          currentValue={source}
          desiredValue="other"
          set={setSource}
          text="Other"
        />
      </div>
      <h1 className="text-xl">Branch</h1>
      <div className="block btn-group">
        <ToggleableBtn
          currentValue={isDefaultBranch}
          desiredValue={true}
          set={setIsDefaultBranch}
          text="Default"
        />
        <ToggleableBtn
          currentValue={isDefaultBranch}
          desiredValue={false}
          set={setIsDefaultBranch}
          text="Other"
        />
      </div>
      <div className="my-8">{jobsList()}</div>
      <div>job stat tables</div>
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
  const jobs = await fetchJobs(projectId);

  const jobOptions = [...new Set(jobs.reverse().map((j) => j.name))];

  return { props: { project, jobs, jobOptions } };
};

export default ProjectPage;
