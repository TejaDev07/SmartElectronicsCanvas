import type { Edge, Node } from "reactflow";
import { blockColors } from "../types";
import type { FixedId } from "../types";

export function exportAsJSON(nodes: Node[], edges: Edge[]) {
  const data = JSON.stringify({ nodes, edges }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  downloadFile(blob, "block-diagram.json");
}

export function exportAsSVG(nodes: Node[], edges: Edge[]) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "1400");
  svg.setAttribute("height", "800");
  svg.setAttribute("viewBox", "0 0 1400 800");
  svg.style.backgroundColor = "#f0f0f0";

  // Draw edges
  edges.forEach((edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);
    if (!sourceNode || !targetNode) return;

    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", String(sourceNode.position.x + 75));
    line.setAttribute("y1", String(sourceNode.position.y + 25));
    line.setAttribute("x2", String(targetNode.position.x));
    line.setAttribute("y2", String(targetNode.position.y + 25));
    line.setAttribute("stroke", "#999");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("marker-end", "url(#arrowhead)");
    svg.appendChild(line);
  });

  // Arrow marker
  const defs = document.createElementNS(svgNS, "defs");
  const marker = document.createElementNS(svgNS, "marker");
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "10");
  marker.setAttribute("refX", "9");
  marker.setAttribute("refY", "3");
  marker.setAttribute("orient", "auto");
  const polygon = document.createElementNS(svgNS, "polygon");
  polygon.setAttribute("points", "0 0, 10 3, 0 6");
  polygon.setAttribute("fill", "#999");
  marker.appendChild(polygon);
  defs.appendChild(marker);
  svg.appendChild(defs);

  // Draw nodes
  nodes.forEach((node) => {
    const isBase = ["power", "inputs", "control", "outputs", "other"].includes(node.id);
    const blockType = node.id as FixedId;
    const color = isBase ? blockColors[blockType] : "#FFF";
    const borderColor = isBase ? "#333" : "#666";

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", String(node.position.x));
    rect.setAttribute("y", String(node.position.y));
    rect.setAttribute("width", "150");
    rect.setAttribute("height", "50");
    rect.setAttribute("fill", color);
    rect.setAttribute("stroke", borderColor);
    rect.setAttribute("stroke-width", "2");
    rect.setAttribute("rx", "4");
    svg.appendChild(rect);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", String(node.position.x + 75));
    text.setAttribute("y", String(node.position.y + 30));
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "12");
    text.setAttribute("font-weight", "bold");
    text.textContent = node.data.label;
    svg.appendChild(text);
  });

  const svgString = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  downloadFile(blob, "block-diagram.svg");
}

export function exportAsDrawIO(nodes: Node[], edges: Edge[]) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" type="device" version="24.0">
  <diagram id="diagram1" name="Block Diagram">
    <mxGraphModel dx="600" dy="400" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${nodes
          .map(
            (node, idx) => `
        <mxCell id="node${idx}" value="${(node.data as any).label}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff;" vertex="1" parent="1">
          <mxGeometry x="${node.position.x}" y="${node.position.y}" width="150" height="50" as="geometry"/>
        </mxCell>`
          )
          .join("")}
        ${edges
          .map(
            (edge, idx) => `
        <mxCell id="edge${idx}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" edge="1" parent="1" source="${edge.source}" target="${edge.target}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>`
          )
          .join("")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  const blob = new Blob([xml], { type: "application/xml" });
  downloadFile(blob, "block-diagram.drawio");
}

function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
