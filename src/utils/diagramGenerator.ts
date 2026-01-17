import type { Edge } from "reactflow";
import { mapping, baseNodes, type BlockNode, type FixedId } from "../types";

export interface GeneratedDiagram {
  nodes: BlockNode[];
  edges: Edge[];
}

export function generateDiagramFromText(text: string): GeneratedDiagram {
  const words = text
    .toLowerCase()
    .split(/[\s,;.]+/)
    .map((w) => w.trim())
    .filter(Boolean)
    .filter((w) => w.length > 1);

  const newNodes: BlockNode[] = [...baseNodes];
  const blockCounts: Record<FixedId, number> = {
    power: 0,
    inputs: 0,
    control: 0,
    outputs: 0,
    other: 0,
  };

  const basePositions: Record<FixedId, { x: number; y: number }> = {
    power: { x: 100, y: 100 },
    inputs: { x: 350, y: 100 },
    control: { x: 650, y: 100 },
    outputs: { x: 950, y: 100 },
    other: { x: 1250, y: 100 },
  };

  const used = new Set<string>();
  let nodeId = 100;

  words.forEach((word) => {
    const group = mapping[word];
    if (!group || used.has(word)) return;

    used.add(word);
    blockCounts[group]++;

    const basePos = basePositions[group];
    const count = blockCounts[group];
    const position = {
      x: basePos.x - 80 + (count - 1) * 40,
      y: basePos.y + 180 + (count - 1) * 80,
    };

    newNodes.push({
      id: `${group}-${nodeId++}`,
      position,
      data: { label: word, blockType: group },
      type: "custom",
    });
  });

  // Auto-connect logic: connect blocks sequentially within each group, then between groups
  const newEdges: Edge[] = [];
  const blockOrder: FixedId[] = ["power", "inputs", "control", "outputs", "other"];
  
  // Connect blocks within each group vertically
  blockOrder.forEach((blockType) => {
    const groupNodes = newNodes.filter(
      (n) => (n.data as any).blockType === blockType && !baseNodes.find(b => b.id === n.id)
    );
    for (let i = 0; i < groupNodes.length - 1; i++) {
      newEdges.push({
        id: `edge-${groupNodes[i].id}-${groupNodes[i + 1].id}`,
        source: groupNodes[i].id,
        target: groupNodes[i + 1].id,
        animated: true,
      });
    }
  });

  // Connect groups sequentially (power → inputs → control → outputs → other)
  for (let i = 0; i < blockOrder.length - 1; i++) {
    const sourceGroup = newNodes.filter(
      (n) => (n.data as any).blockType === blockOrder[i]
    );
    const targetGroup = newNodes.filter(
      (n) => (n.data as any).blockType === blockOrder[i + 1]
    );
    
    if (sourceGroup.length > 0 && targetGroup.length > 0) {
      const sourceNode = sourceGroup[sourceGroup.length - 1];
      const targetNode = targetGroup[0];
      newEdges.push({
        id: `edge-group-${blockOrder[i]}-${blockOrder[i + 1]}`,
        source: sourceNode.id,
        target: targetNode.id,
        animated: true,
      });
    }
  }

  return { nodes: newNodes, edges: newEdges };
}
