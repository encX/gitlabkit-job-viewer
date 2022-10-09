import { Job } from "../models";

interface JobRowProps {
  job: Job;
}

export default function JobRow({ job }: JobRowProps) {
  const classNames = [
    "my-4 px-4 py-2",
    "flex flex-row flex-wrap gap-2",
    "rounded shadow-xl",
  ];

  if (job.status === "success")
    classNames.push("bg-success text-success-content");
  else if (job.status === "failed")
    classNames.push("bg-error text-error-content");
  else if (job.status === "running")
    classNames.push("bg-warning text-warning-content");
  else if (job.status === "manual")
    classNames.push("bg-accent text-accent-content");
  else classNames.push("bg-base-100 text-base-content");

  return (
    <div className={classNames.join(" ")}>
      <span className="w-32">#{job.id}</span>
      <span className="w-32">{job.name}</span>
      <span>Q: {job.queued_duration}</span>
      <span>D: {job.duration}</span>
      <span>{job.status}</span>
      <span>{job.pipeline.ref}</span>
      <span>{job.pipeline.source}</span>
      <span className="grow" />
      <a href={job.web_url} className="btn btn-xs">
        View
      </a>
    </div>
  );
}
