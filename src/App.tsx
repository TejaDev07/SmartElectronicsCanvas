import { useState, useEffect } from "react";
import { Toolbar } from "./components/Toolbar";
import { DiagramCanvas } from "./components/DiagramCanvas";
import { generateDiagramFromText } from "./utils/diagramGenerator";
import { baseNodes, type BlockNode } from "./types";
import type { Edge } from "reactflow";
import "reactflow/dist/style.css";

const STORAGE_KEY = "blockDiagramState";

interface DiagramState {
  text: string;
  nodes: BlockNode[];
  edges: Edge[];
}

export default function App() {
  const [text, setText] = useState("");
  const [nodes, setNodes] = useState<BlockNode[]>(baseNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isSaved, setIsSaved] = useState(true);

  // Load diagram from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const state: DiagramState = JSON.parse(saved);
        setText(state.text);
        setNodes(state.nodes);
        setEdges(state.edges);
        setIsSaved(true);
      } catch (error) {
        console.error("Failed to load diagram:", error);
      }
    }
  }, []);

  // Mark as unsaved when diagram changes
  const handleNodesChange = (newNodes: BlockNode[] | ((prev: BlockNode[]) => BlockNode[])) => {
    if (typeof newNodes === "function") {
      setNodes(newNodes);
    } else {
      setNodes(newNodes);
    }
    setIsSaved(false);
  };

  const handleEdgesChange = (newEdges: Edge[] | ((prev: Edge[]) => Edge[])) => {
    if (typeof newEdges === "function") {
      setEdges(newEdges);
    } else {
      setEdges(newEdges);
    }
    setIsSaved(false);
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    setIsSaved(false);
  };

  // Save diagram to localStorage
  const handleSave = () => {
    const state: DiagramState = { text, nodes, edges };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setIsSaved(true);
  };

  const handleGenerate = () => {
    const { nodes: newNodes, edges: newEdges } = generateDiagramFromText(text);
    setNodes(newNodes);
    setEdges(newEdges);
    setIsSaved(false);
  };

  const handleClear = () => {
    if (window.confirm("Clear all custom blocks and connections?")) {
      setNodes(baseNodes);
      setEdges([]);
      setText("");
      localStorage.removeItem(STORAGE_KEY);
      setIsSaved(true);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#000000",
      }}
    >
      <Toolbar
        text={text}
        setText={handleTextChange}
        onGenerate={handleGenerate}
        onClear={handleClear}
        onSave={handleSave}
        onReload={() => window.location.reload()}
        nodes={nodes}
        edges={edges}
        isSaved={isSaved}
      />

      <DiagramCanvas
        nodes={nodes}
        setNodes={handleNodesChange}
        edges={edges}
        setEdges={handleEdgesChange}
      />
    </div>
  );
}
