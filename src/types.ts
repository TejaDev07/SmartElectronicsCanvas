import type { Node as RFNode } from "reactflow";

/* Types for Block Data */
export type BlockData = {
  label: string;
  comment?: string;
  blockType?: string;
};

export type BlockNode = RFNode<BlockData>;

/* Block Definitions */
export const fixedIds = ["power", "inputs", "control", "outputs", "other"] as const;
export type FixedId = (typeof fixedIds)[number];

/* Component to Block Mapping */
export type Mapping = Record<string, FixedId>;

export const mapping: Mapping = {
  // Power Components
  battery: "power",
  "power supply": "power",
  charger: "power",
  adapter: "power",
  psu: "power",
  
  // Input Components
  camera: "inputs",
  sensor: "inputs",
  microphone: "inputs",
  mic: "inputs",
  button: "inputs",
  touch: "inputs",
  "motion detector": "inputs",
  accelerometer: "inputs",
  gyroscope: "inputs",
  thermometer: "inputs",
  "temperature sensor": "inputs",
  
  // Output Components
  motor: "outputs",
  speaker: "outputs",
  led: "outputs",
  display: "outputs",
  screen: "outputs",
  buzzer: "outputs",
  light: "outputs",
  
  // Control Components
  cpu: "control",
  processor: "control",
  microcontroller: "control",
  mcu: "control",
  fpga: "control",
  memory: "control",
  
  // Peripheral Components
  wifi: "other",
  bluetooth: "other",
  ble: "other",
  rf: "other",
  "rf module": "other",
  gsm: "other",
  antenna: "other",
  clock: "other",
  rtc: "other",
};

/* Block Colors */
export const blockColors: Record<FixedId, string> = {
  power: "#FFE5B4",
  inputs: "#B4E5FF",
  control: "#D4FFB4",
  outputs: "#FFB4D4",
  other: "#E5D4FF",
};

/* Block Styles */
export const blockStyles: Record<FixedId, React.CSSProperties> = {
  power: {
    backgroundColor: blockColors.power,
    border: "2px solid #FF8C00",
    borderRadius: "8px",
    padding: "16px",
    fontWeight: "bold",
    minWidth: "150px",
    textAlign: "center",
  },
  inputs: {
    backgroundColor: blockColors.inputs,
    border: "2px solid #0088FF",
    borderRadius: "8px",
    padding: "16px",
    fontWeight: "bold",
    minWidth: "150px",
    textAlign: "center",
  },
  control: {
    backgroundColor: blockColors.control,
    border: "2px solid #00AA00",
    borderRadius: "8px",
    padding: "16px",
    fontWeight: "bold",
    minWidth: "150px",
    textAlign: "center",
  },
  outputs: {
    backgroundColor: blockColors.outputs,
    border: "2px solid #FF1493",
    borderRadius: "8px",
    padding: "16px",
    fontWeight: "bold",
    minWidth: "150px",
    textAlign: "center",
  },
  other: {
    backgroundColor: blockColors.other,
    border: "2px solid #9932CC",
    borderRadius: "8px",
    padding: "16px",
    fontWeight: "bold",
    minWidth: "150px",
    textAlign: "center",
  },
};

/* Base Nodes */
export const baseNodes: BlockNode[] = [
  {
    id: "power",
    position: { x: 50, y: 50 },
    data: { label: "⚡ Power Supply" },
    type: "custom",
  },
  {
    id: "inputs",
    position: { x: 250, y: 50 },
    data: { label: "📥 Inputs Block" },
    type: "custom",
  },
  {
    id: "control",
    position: { x: 450, y: 50 },
    data: { label: "🧠 Control & Processing" },
    type: "custom",
  },
  {
    id: "outputs",
    position: { x: 700, y: 50 },
    data: { label: "📤 Outputs Block" },
    type: "custom",
  },
  {
    id: "other",
    position: { x: 950, y: 50 },
    data: { label: "🔌 Other Peripherals" },
    type: "custom",
  },
];
