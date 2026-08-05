type Report = {
  project: string;
  score: number;
  issues: {
    id: number;
    severity: string;
    title: string;
    description: string;
    confidence: number;
  }[];
};

type AnalysisReportProps = {
  report: Report | null;
};

export default function AnalysisReport({
  report,
}: AnalysisReportProps) {
  if (!report) {
    return (
      <div className="rounded-xl border border-cyan-500/20 bg-black/40 p-6 text-gray-400">
        Waiting for analysis...
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-cyan-500/30 bg-black/40 p-6">
      <h2 className="text-2xl font-bold text-cyan-400">
        RASM AI REPORT
      </h2>

      <p className="mt-4 text-white">
        <strong>Project :</strong> {report.project}
      </p>

      <p className="mt-2 text-white">
        <strong>AI Score :</strong> {report.score}/100
      </p>

      <p className="mt-2 text-white">
        <strong>Detected issues :</strong> {report.issues.length}
      </p>

      <div className="mt-6 space-y-3">
        {report.issues.map((issue) => (
          <div
            key={issue.id}
            className="rounded-lg border border-gray-700 p-3"
          >
            <p className="font-semibold text-red-400">
              {issue.title}
            </p>

            <p className="text-sm text-gray-300">
              {issue.description}
            </p>

            <p className="mt-2 text-xs text-cyan-300">
              Confidence : {issue.confidence}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}