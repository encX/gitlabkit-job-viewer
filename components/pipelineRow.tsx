import { Pipeline } from "../models";

interface PipelineRowProps {
  pipeline: Pipeline;
}

export default function PipelineRow({ pipeline }: PipelineRowProps) {
  return (
    <div className="border my-2 p-2 rounded">
      IID: {pipeline.iid} Ref: {pipeline.ref} SHA: {pipeline.sha} Status:{" "}
      {pipeline.status} <a href={pipeline.web_url}>View</a>
    </div>
  );
}
