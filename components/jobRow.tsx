import { Job } from "../models";

interface JobRowProps {
  job: Job;
}

export default function JobRow({ job }: JobRowProps) {
  return (
    <div className="border my-2 p-2 rounded">
      ID: {job.id} Pipeline: {job.pipeline.iid} Queued: {job.queued_duration}{" "}
        Duration: {job.duration} <a href={job.web_url}>View</a>
    </div>
  );
}
