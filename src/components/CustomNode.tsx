import { blockStyles, fixedIds, type BlockData } from "../types";
import { Handle, Position } from "reactflow";

interface CustomNodeProps {
  data: BlockData;
  id: string;
}

export function CustomNode({ data, id }: CustomNodeProps) {
  const isBase = fixedIds.includes(id as any);
  const blockType = id as any;
  const style: React.CSSProperties = isBase && blockType in blockStyles
    ? blockStyles[blockType as keyof typeof blockStyles]
    : {
        backgroundColor: "#ffffff",
        border: "2px dashed #666",
        borderRadius: "4px",
        padding: "8px",
        minWidth: "100px",
        textAlign: "center",
        fontSize: "25px",
      };

  const handleMouseEnter = () => {
    document.body.style.cursor = "grab";
    const style = document.createElement("style");
    style.innerHTML = `.react-flow__node:hover { cursor: black !important; }`;
    document.head.appendChild(style);
  };

  const handleMouseLeave = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <div style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>{data.label}</div>
      {data.comment && (
        <div style={{ fontSize: "10px", marginTop: "4px", color: "#666" }}>
          📝 {data.comment}
        </div>
      )}
      {!isBase && (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      )}
      {isBase && (
        <>
          <Handle type="source" position={Position.Right} />
        </>
      )}
    </div>
  );
}
