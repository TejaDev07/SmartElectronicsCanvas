import { exportAsJSON, exportAsSVG, exportAsDrawIO } from "../utils/exportFunctions";
import type { Node, Edge } from "reactflow";

interface ToolbarProps {
  text: string;
  setText: (text: string) => void;
  onGenerate: () => void;
  onClear: () => void;
  onSave: () => void;
  onReload: () => void;
  nodes: Node[];
  edges: Edge[];
  isSaved: boolean;
}

export function Toolbar({
  text,
  setText,
  onGenerate,
  onClear,
  onSave,
  onReload,
  nodes,
  edges,
  isSaved,
}: ToolbarProps) {
  return (
    <div
      style={{
        padding: "12px 16px",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderBottom: "2px solid #5a67d8",
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g., smart doorbell with camera and motion sensor..."
        style={{
          padding: "10px 14px",
          borderRadius: "6px",
          border: "2px solid #e0e7ff",
          minWidth: "350px",
          fontFamily: "inherit",
          fontSize: "14px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.2)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e0e7ff";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
      />

      <button
        onClick={onGenerate}
        style={{
          padding: "10px 18px",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#059669";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#10b981";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        🔄 Generate
      </button>

      <button
        onClick={onSave}
        style={{
          padding: "10px 16px",
          backgroundColor: isSaved ? "#6366f1" : "#f59e0b",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isSaved ? "#4f46e5" : "#d97706";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isSaved ? "#6366f1" : "#f59e0b";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        {isSaved ? "💾 Saved" : "💾 Save"}
      </button>

      <button
        onClick={onReload}
        style={{
          padding: "10px 16px",
          backgroundColor: "#8b5cf6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#7c3aed";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#8b5cf6";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        ♻️ Reload
      </button>

      <button
        onClick={() => exportAsJSON(nodes, edges)}
        style={{
          padding: "10px 16px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#2563eb";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#3b82f6";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        📄 JSON
      </button>

      <button
        onClick={() => exportAsSVG(nodes, edges)}
        style={{
          padding: "10px 16px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#dc2626";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ef4444";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        🎨 SVG
      </button>

      <button
        onClick={() => exportAsDrawIO(nodes, edges)}
        style={{
          padding: "10px 16px",
          backgroundColor: "#f59e0b",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d97706";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#f59e0b";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        📐 DrawIO
      </button>

      <button
        onClick={onClear}
        style={{
          padding: "10px 16px",
          backgroundColor: "#6b7280",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#4b5563";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#6b7280";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        }}
      >
        🗑️ Clear
      </button>

      <span
        style={{
          fontSize: "12px",
          color: "white",
          marginLeft: "auto",
          fontWeight: "500",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        💡 Click nodes to add comments • Right-click to delete • Drag to move
      </span>
    </div>
  );
}
