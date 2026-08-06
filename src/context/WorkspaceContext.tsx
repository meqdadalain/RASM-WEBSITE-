import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type AnalysisStatus =
  | "idle"
  | "uploading"
  | "analyzing"
  | "completed";

interface WorkspaceContextType {
  file: File | null;
  status: AnalysisStatus;
  report: any;

  setFile: (file: File | null) => void;
  setStatus: (status: AnalysisStatus) => void;
  setReport: (report: any) => void;
  startAnalysisSimulation: (file: File) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

// Rapport par défaut au cas où le fetch échoue
const FALLBACK_REPORT = {
  summary: "Analyse automatisée de la maquette IFC réalisée par RASM AI Engine.",
  statistics: {
    totalElements: 142,
    issuesFound: 3,
    clashCount: 1,
    complianceCount: 1,
    materialCount: 1,
  },
  confidenceScore: 0.94,
  detectedIssues: [
    {
      id: "ISSUE-01",
      type: "Clash",
      severity: "High",
      title: "Collision Réseau / Poutre",
      description: "Poutre B-12 en collision directe avec la gaine de ventilation HVAC-04.",
    },
    {
      id: "ISSUE-02",
      type: "Compliance",
      severity: "Medium",
      title: "Non-conformité thermique",
      description: "Épaisseur de dalle sous-dimensionnée par rapport aux exigences RE2020.",
    },
    {
      id: "ISSUE-03",
      type: "Material",
      severity: "Low",
      title: "Spécification Béton",
      description: "Qualité du béton C30/37 recommandée pour le poteau P-04.",
    },
  ],
  details: [
    { type: "Clash", description: "Poutre B-12 en collision avec gaine de ventilation" },
    { type: "Compliance", description: "Épaisseur de dalle non conforme aux normes RE2020" },
    { type: "Material", description: "Qualité du béton C30/37 recommandée pour poteau P-04" },
  ],
  recommendations: [
    "Ajuster l'altimétrie du réseau de ventilation au niveau N1.",
    "Revoir le dimensionnement de l'isolant de la dalle basse.",
    "Mettre à jour la fiche matériau du poteau P-04.",
  ],
};

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [report, setReport] = useState<any>(null);

  const startAnalysisSimulation = async (selectedFile: File) => {
    setFile(selectedFile);
    setStatus("uploading");
    setReport(null);

    // Étape 1 : Upload (1 sec)
    setTimeout(async () => {
      setStatus("analyzing");

      // Étape 2 : Analyse (2 sec)
      setTimeout(async () => {
        try {
          const response = await fetch("/demo/report.json");
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          setReport(data);
        } catch (error) {
          console.warn("Rapport local introuvable ou invalide, utilisation du fallback:", error);
          setReport(FALLBACK_REPORT);
        } finally {
          setStatus("completed");
        }
      }, 2000);
    }, 1000);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        file,
        status,
        report,
        setFile,
        setStatus,
        setReport,
        startAnalysisSimulation,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }
  return context;
}