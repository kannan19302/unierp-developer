"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  ArrowLeft,
  Save,
  Play,
  Settings,
  Bell,
  Mail,
  Split,
  CheckSquare,
  Clock,
  Link2,
  BoxSelect,
  Trash2,
  X,
  Sparkles,
  Repeat,
  Check,
  RotateCcw,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/components/builder/ToastProvider";
import { AiCopilotSidebar } from "@/components/builder/AiCopilotSidebar";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    position: { x: 250, y: 50 },
    data: { label: "Trigger: Manual" },
  },
];
const initialEdges: Edge[] = [];

let id = 10;
const getId = () => `dndnode_${id++}`;

const NODE_TYPES = [
  {
    type: "approval",
    label: "Approval Step",
    icon: CheckSquare,
    color: "var(--studio-success)",
  },
  {
    type: "email",
    label: "Send Email",
    icon: Mail,
    color: "var(--studio-accent-bright)",
  },
  {
    type: "notification",
    label: "In-App Alert",
    icon: Bell,
    color: "var(--studio-warning)",
  },
  {
    type: "condition",
    label: "Condition",
    icon: Split,
    color: "var(--studio-violet)",
  },
  {
    type: "delay",
    label: "Wait/Delay",
    icon: Clock,
    color: "var(--studio-500)",
  },
  {
    type: "webhook",
    label: "Webhook",
    icon: Link2,
    color: "var(--studio-pink)",
  },
  {
    type: "loop",
    label: "Loop",
    icon: Repeat,
    color: "var(--studio-cyan)",
  },
];

function CustomNode({ data, isConnectable }: any) {
  const nt = NODE_TYPES.find((n) => n.type === data.nodeType);
  const Icon = nt?.icon || BoxSelect;
  const color = nt?.color || "var(--studio-400)";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        background: "white",
        border: `1px solid ${color}`,
        borderRadius: "8px",
        minWidth: "180px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: color, width: "8px", height: "8px" }}
      />
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "6px",
          background: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={16} color={color} />
      </div>
      <div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: "bold",
            color,
            textTransform: "uppercase",
          }}
        >
          {nt?.label || "Node"}
        </div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--studio-800)",
          }}
        >
          {data.label}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: color, width: "8px", height: "8px" }}
      />
    </div>
  );
}

const customNodeTypes = { custom: CustomNode };

export interface WorkflowEditorWorkspaceProps {
  workflowId: string;
  onBack?: () => void;
  onSaved?: (workflow: { id: string; name: string }) => void;
  embedded?: boolean;
  defaultName?: string;
}

function WorkflowEditorInner({
  workflowId,
  onBack,
  onSaved,
  embedded = false,
  defaultName,
}: WorkflowEditorWorkspaceProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [currentId, setCurrentId] = useState(workflowId);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [workflow, setWorkflow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [showCopilot, setShowCopilot] = useState(false);

  useEffect(() => {
    setCurrentId(workflowId);
  }, [workflowId]);

  useEffect(() => {
    let isMounted = true;
    async function loadWorkflow() {
      if (currentId === "new") {
        setWorkflow({
          name: defaultName || "New Workflow",
          status: "DRAFT",
          trigger: "Manual",
        });
        setNodes([
          {
            id: "trigger-1",
            type: "input",
            position: { x: 250, y: 50 },
            data: { label: "Trigger: Manual" },
            style: {
              border: "2px solid var(--studio-accent-bright)",
              borderRadius: "8px",
              padding: "10px",
            },
          },
        ]);
        setEdges([]);
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token") || "";
        const res = await fetch(`/api/v1/builder/workflows/${currentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!isMounted) return;
        if (res.ok) {
          const data = await res.json();
          setWorkflow(data);
          if (data.nodes && data.nodes.length > 0) {
            setNodes(data.nodes);
            setEdges(data.edges || []);
          } else
            setNodes([
              {
                id: "trigger-1",
                type: "input",
                position: { x: 250, y: 50 },
                data: { label: `Trigger: ${data.trigger}` },
                style: {
                  border: "2px solid var(--studio-accent-bright)",
                  borderRadius: "8px",
                  padding: "10px",
                },
              },
            ]);
        } else {
          showToast("Failed to load workflow", "error");
        }
      } catch {
        if (isMounted) showToast("Network error loading workflow", "error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadWorkflow();
    return () => {
      isMounted = false;
    };
  }, [currentId, setNodes, setEdges, showToast, defaultName]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            label: "",
            data: { errorPath: false },
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    label: string,
  ) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: nodeType, label }),
    );
    event.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const nodeDataStr = event.dataTransfer.getData("application/reactflow");
      if (!nodeDataStr || !reactFlowBounds || !reactFlowInstance) return;
      const nodeData = JSON.parse(nodeDataStr);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node = {
        id: getId(),
        type: "custom",
        position,
        data: { label: nodeData.label, nodeType: nodeData.type, config: {} },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const onSelectionChange = useCallback(
    (params: any) => {
      if (params.nodes.length > 0)
        setSelectedNode(nodes.find((n) => n.id === params.nodes[0].id) || null);
      else setSelectedNode(null);
      if (params.edges?.length > 0)
        setSelectedEdge(
          edges.find((e) => e.id === params.edges[0].id) || null,
        );
      else setSelectedEdge(null);
    },
    [nodes, edges],
  );

  const handleClose = () => {
    if (onBack) onBack();
    else router.push("/builder/erp/workflows");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token") || "";
      const isNew = currentId === "new";
      const name = workflow?.name || defaultName || "Untitled";
      const payload = { nodes, edges, name };
      const res = await fetch(
        `/api/v1/builder/workflows${isNew ? "" : `/${currentId}`}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );
      if (res.ok) {
        showToast("Workflow saved successfully", "success");
        const data = await res.json().catch(() => null);
        const savedId = isNew ? data?.id : currentId;
        if (isNew && savedId) setCurrentId(savedId);
        if (onSaved && savedId) onSaved({ id: savedId, name });
        else if (isNew && savedId)
          router.push(`/builder/erp/workflows/${savedId}`);
      } else {
        showToast("Failed to save workflow", "error");
      }
    } catch {
      showToast("Network error saving workflow", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const updateNodeData = (key: string, value: any) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNode.id) {
          const newData = { ...n.data, [key]: value };
          setSelectedNode({ ...n, data: newData });
          return { ...n, data: newData };
        }
        return n;
      }),
    );
  };

  const updateEdge = (patch: Partial<Edge>) => {
    if (!selectedEdge) return;
    setEdges((eds) =>
      eds.map((e) => {
        if (e.id === selectedEdge.id) {
          const updated = { ...e, ...patch };
          setSelectedEdge(updated);
          return updated;
        }
        return e;
      }),
    );
  };

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [executions, setExecutions] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedRun, setSelectedRun] = useState<any | null>(null);
  const [runSteps, setRunSteps] = useState<any[]>([]);
  const [inspectingRun, setInspectingRun] = useState<string | null>(null);
  const [runActionLoading, setRunActionLoading] = useState(false);

  const fetchExecutions = async () => {
    if (currentId === "new") return;
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(
        `/api/v1/builder/workflows/${currentId}/runs`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.ok) setExecutions(await res.json());
    } catch {
      /* ignore */
    }
  };

  const fetchRunDetail = async (runId: string) => {
    if (currentId === "new") return;
    setInspectingRun(runId);
    setRunSteps([]);
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(
        `/api/v1/builder/workflows/${currentId}/runs/${runId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.ok) {
        const data = await res.json();
        setSelectedRun(data);
        setRunSteps(Array.isArray(data.steps) ? data.steps : []);
      }
    } catch {
      /* ignore */
    }
  };

  const handleResumeRun = async (runId: string) => {
    if (currentId === "new") return;
    setRunActionLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(
        `/api/v1/builder/workflows/${currentId}/runs/${runId}/resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ input: {} }),
        },
      );
      if (res.ok) {
        showToast("Run resumed", "success");
        fetchExecutions();
        await fetchRunDetail(runId);
      } else showToast("Failed to resume run", "error");
    } catch {
      showToast("Network error resuming run", "error");
    } finally {
      setRunActionLoading(false);
    }
  };

  const handleApproveStep = async (
    runId: string,
    stepId: string,
    approved: boolean,
  ) => {
    if (currentId === "new") return;
    setRunActionLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(
        `/api/v1/builder/workflows/${currentId}/runs/${runId}/steps/${stepId}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approved }),
        },
      );
      if (res.ok) {
        showToast(approved ? "Step approved" : "Step rejected", "success");
        fetchExecutions();
        await fetchRunDetail(runId);
      } else showToast("Failed to update approval", "error");
    } catch {
      showToast("Network error updating approval", "error");
    } finally {
      setRunActionLoading(false);
    }
  };

  const closeHistory = () => {
    setIsHistoryModalOpen(false);
    setSelectedRun(null);
    setRunSteps([]);
    setInspectingRun(null);
  };

  const handleTestRun = async () => {
    if (currentId === "new") {
      showToast("Save the workflow first", "error");
      return;
    }
    setIsExecuting(true);
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(
        `/api/v1/builder/workflows/${currentId}/execute`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.ok) {
        showToast("Workflow triggered successfully", "success");
        fetchExecutions();
        setSelectedRun(null);
        setRunSteps([]);
        setInspectingRun(null);
        setIsHistoryModalOpen(true);
      } else showToast("Failed to trigger workflow", "error");
    } catch {
      showToast("Network error triggering workflow", "error");
    } finally {
      setIsExecuting(false);
    }
  };

  const getEdgeStyle = useCallback(
    (edge: Edge) => {
      const errorPath = edge.data?.errorPath === true;
      return {
        stroke: errorPath ? "var(--studio-danger-rose)" : "var(--studio-500)",
        strokeWidth: errorPath ? 2 : 1.5,
        strokeDasharray: errorPath ? "6 3" : undefined,
      };
    },
    [],
  );

  const styledEdges = useMemo(
    () =>
      edges.map((e) => {
        const errorPath = e.data?.errorPath === true;
        const label = e.label || (errorPath ? "error" : "");
        return {
          ...e,
          label,
          labelStyle: {
            fontSize: "11px",
            fontWeight: 600,
            fill: errorPath ? "var(--studio-danger-rose)" : "var(--studio-600)",
          },
          labelBgStyle: {
            fill: "white",
            fillOpacity: 0.9,
          },
          style: getEdgeStyle(e),
        };
      }),
    [edges, getEdgeStyle],
  );

  if (loading)
    return (
      <div
        style={{
          padding: "var(--space-10)",
          textAlign: "center",
          color: "var(--color-text-secondary)",
        }}
      >
        Loading editor...
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10000,
        backgroundColor: "var(--studio-50)",
        color: "var(--studio-900)",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 var(--space-4)",
          height: "60px",
          background: "white",
          borderBottom: "1px solid var(--studio-200)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-4)",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              background: "var(--studio-100)",
              border: "none",
              borderRadius: "6px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
            }}
          >
            {embedded ? (
              <X size={16} color="var(--studio-500)" />
            ) : (
              <ArrowLeft size={16} color="var(--studio-500)" />
            )}
          </button>
          <div>
            <input
              value={workflow?.name || ""}
              onChange={(e) =>
                setWorkflow({ ...(workflow || {}), name: e.target.value })
              }
              style={{
                border: "none",
                outline: "none",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--studio-900)",
                background: "transparent",
                minWidth: 200,
              }}
            />
            <div style={{ fontSize: "12px", color: "var(--studio-500)" }}>
              {workflow?.status || "DRAFT"} · {nodes.length} nodes
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setShowCopilot(!showCopilot)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              background: showCopilot ? "rgba(59, 130, 246, 0.1)" : "white",
              color: showCopilot ? "var(--studio-accent)" : "var(--studio-900)",
              border: "1px solid var(--studio-300)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            <Sparkles size={14} /> AI Copilot
          </button>
          <button
            onClick={() => {
              setSelectedRun(null);
              setRunSteps([]);
              setInspectingRun(null);
              fetchExecutions();
              setIsHistoryModalOpen(true);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              background: "white",
              border: "1px solid var(--studio-300)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            <Clock size={14} /> History
          </button>
          <button
            onClick={handleTestRun}
            disabled={isExecuting}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              background: "var(--studio-success)",
              color: "white",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {isExecuting ? (
              <div
                className="animate-spin"
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <Play size={14} />
            )}
            <span>Test Run</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              background: "var(--studio-accent)",
              color: "white",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {isSaving ? (
              <div
                className="animate-spin"
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <Save size={14} />
            )}
            <span>{embedded ? "Save & Link" : "Save"}</span>
          </button>
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div
          style={{
            width: "240px",
            background: "white",
            borderRight: "1px solid var(--studio-200)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: "16px 16px 8px 16px",
              borderBottom: "1px solid var(--studio-200)",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "var(--studio-400)",
                letterSpacing: "0.05em",
              }}
            >
              Node Types
            </span>
          </div>
          <div
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              overflowY: "auto",
            }}
          >
            {NODE_TYPES.map((nt) => (
              <div
                key={nt.type}
                onDragStart={(event) => onDragStart(event, nt.type, nt.label)}
                draggable
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px",
                  background: "white",
                  border: "1px solid var(--studio-200)",
                  borderRadius: "8px",
                  cursor: "grab",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <nt.icon size={16} color={nt.color} />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--studio-700)",
                  }}
                >
                  {nt.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, position: "relative" }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={styledEdges}
            nodeTypes={customNodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={onSelectionChange}
            onEdgeClick={(_, edge) =>
              setSelectedEdge(edges.find((e) => e.id === edge.id) || edge)
            }
            fitView
            attributionPosition="bottom-right"
          >
            <Controls />
            <MiniMap
              style={{
                border: "1px solid var(--studio-200)",
                borderRadius: "8px",
              }}
            />
            <Background color="var(--studio-300)" gap={16} />
          </ReactFlow>
        </div>

        {showCopilot && (
          <AiCopilotSidebar
            type="workflow"
            componentId={currentId}
            onSuggestSteps={(steps) => {
              const newNodes = steps.map((s, idx) => ({
                id: `node_ai_${Date.now()}_${idx}`,
                type: "custom",
                position: { x: 250, y: 150 + idx * 120 },
                data: {
                  label: s.label || "Approval Step",
                  nodeType: "approval",
                  config: { assignRole: s.assigneeRole || "Manager" },
                },
              }));
              setNodes([...nodes, ...newNodes]);
            }}
          />
        )}

        <div
          style={{
            width: "300px",
            background: "white",
            borderLeft: "1px solid var(--studio-200)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid var(--studio-200)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Settings size={16} color="var(--studio-500)" />
            <span style={{ fontSize: "14px", fontWeight: 600 }}>
              Properties
            </span>
          </div>
          <div style={{ padding: "16px", overflowY: "auto", flex: 1 }}>
            {selectedEdge ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "var(--studio-600)",
                    }}
                  >
                    Branch Label
                  </label>
                  <input
                    type="text"
                    value={String(selectedEdge.label || "")}
                    onChange={(e) => updateEdge({ label: e.target.value })}
                    placeholder="e.g. true / false / error"
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--studio-300)",
                      fontSize: "13px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    id="edge-error-path"
                    checked={selectedEdge.data?.errorPath === true}
                    onChange={(e) =>
                      updateEdge({
                        data: { errorPath: e.target.checked },
                        label: e.target.checked
                          ? "error"
                          : selectedEdge.label,
                      })
                    }
                    style={{ width: 16, height: 16 }}
                  />
                  <label
                    htmlFor="edge-error-path"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--studio-700)",
                    }}
                  >
                    Error path (fired when the source node fails)
                  </label>
                </div>
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    borderTop: "1px dashed var(--studio-300)",
                  }}
                >
                  <button
                    onClick={() => {
                      setEdges((eds) =>
                        eds.filter((e) => e.id !== selectedEdge.id),
                      );
                      setSelectedEdge(null);
                    }}
                    style={{
                      padding: "8px",
                      width: "100%",
                      borderRadius: "6px",
                      border: "1px solid var(--studio-danger-muted)",
                      background: "var(--studio-danger-surface-rose)",
                      color: "var(--studio-danger-rose)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    <Trash2 size={14} /> Delete Edge
                  </button>
                </div>
              </div>
            ) : selectedNode ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "var(--studio-600)",
                    }}
                  >
                    Node Label
                  </label>
                  <input
                    type="text"
                    value={selectedNode.data.label as string}
                    onChange={(e) => updateNodeData("label", e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--studio-300)",
                      fontSize: "13px",
                    }}
                  />
                </div>
                {selectedNode.data.nodeType === "email" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        To Email / Field
                      </label>
                      <input
                        type="text"
                        value={(selectedNode.data.config as any)?.toEmail || ""}
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            toEmail: e.target.value,
                          })
                        }
                        placeholder="e.g. {{user.email}}"
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        value={(selectedNode.data.config as any)?.subject || ""}
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            subject: e.target.value,
                          })
                        }
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </>
                )}
                {selectedNode.data.nodeType === "approval" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "var(--studio-600)",
                      }}
                    >
                      Assign To Role
                    </label>
                    <select
                      value={
                        (selectedNode.data.config as any)?.assignRole || ""
                      }
                      onChange={(e) =>
                        updateNodeData("config", {
                          ...(selectedNode.data.config as any),
                          assignRole: e.target.value,
                        })
                      }
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid var(--studio-300)",
                        fontSize: "13px",
                        background: "white",
                      }}
                    >
                      <option value="">Select Role...</option>
                      <option value="System Administrator">
                        System Administrator
                      </option>
                      <option value="Manager">Manager</option>
                      <option value="Finance Manager">Finance Manager</option>
                    </select>
                  </div>
                )}
                {selectedNode.data.nodeType === "condition" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        Field
                      </label>
                      <input
                        type="text"
                        value={(selectedNode.data.config as any)?.field || ""}
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            field: e.target.value,
                          })
                        }
                        placeholder="e.g. amount"
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        Operator
                      </label>
                      <select
                        value={
                          (selectedNode.data.config as any)?.operator || "=="
                        }
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            operator: e.target.value,
                          })
                        }
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                          background: "white",
                        }}
                      >
                        <option value="==">Equals (==)</option>
                        <option value="!=">Not Equals (!=)</option>
                        <option value=">">Greater Than (&gt;)</option>
                        <option value="<">Less Than (&lt;)</option>
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        Value
                      </label>
                      <input
                        type="text"
                        value={(selectedNode.data.config as any)?.value || ""}
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            value: e.target.value,
                          })
                        }
                        placeholder="e.g. 1000"
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </>
                )}
                {selectedNode.data.nodeType === "loop" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        Iterations
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={
                          (selectedNode.data.config as any)?.iterations || 0
                        }
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            iterations: Number(e.target.value) || 0,
                          })
                        }
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        Loop Body (target node)
                      </label>
                      <select
                        value={
                          (selectedNode.data.config as any)?.loopTarget || ""
                        }
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            loopTarget: e.target.value,
                          })
                        }
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                          background: "white",
                        }}
                      >
                        <option value="">Select target node...</option>
                        {nodes
                          .filter(
                            (n) =>
                              n.id !== selectedNode.id &&
                              n.id !== "trigger-1",
                          )
                          .map((n) => (
                            <option key={n.id} value={n.id}>
                              {(n.data?.label as string) || n.id}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}
                {selectedNode.data.nodeType === "webhook" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        Endpoint URL
                      </label>
                      <input
                        type="text"
                        value={(selectedNode.data.config as any)?.url || ""}
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            url: e.target.value,
                          })
                        }
                        placeholder="https://api.example.com/webhook"
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--studio-600)",
                        }}
                      >
                        Method
                      </label>
                      <select
                        value={
                          (selectedNode.data.config as any)?.method || "POST"
                        }
                        onChange={(e) =>
                          updateNodeData("config", {
                            ...(selectedNode.data.config as any),
                            method: e.target.value,
                          })
                        }
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid var(--studio-300)",
                          fontSize: "13px",
                          background: "white",
                        }}
                      >
                        <option value="POST">POST</option>
                        <option value="GET">GET</option>
                        <option value="PUT">PUT</option>
                        <option value="PATCH">PATCH</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        paddingTop: "12px",
                        borderTop: "1px dashed var(--studio-300)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          color: "var(--studio-400)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Compensation (run on downstream failure)
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "var(--studio-600)",
                          }}
                        >
                          Compensate URL
                        </label>
                        <input
                          type="text"
                          value={
                            (selectedNode.data.config as any)?.compensate?.url ||
                            ""
                          }
                          onChange={(e) =>
                            updateNodeData("config", {
                              ...(selectedNode.data.config as any),
                              compensate: {
                                ...((selectedNode.data.config as any)
                                  ?.compensate || {}),
                                url: e.target.value,
                              },
                            })
                          }
                          placeholder="https://api.example.com/refund"
                          style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid var(--studio-300)",
                            fontSize: "13px",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "var(--studio-600)",
                          }}
                        >
                          Compensate Method
                        </label>
                        <select
                          value={
                            (selectedNode.data.config as any)?.compensate
                              ?.method || "POST"
                          }
                          onChange={(e) =>
                            updateNodeData("config", {
                              ...(selectedNode.data.config as any),
                              compensate: {
                                ...((selectedNode.data.config as any)
                                  ?.compensate || {}),
                                method: e.target.value,
                              },
                            })
                          }
                          style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid var(--studio-300)",
                            fontSize: "13px",
                            background: "white",
                          }}
                        >
                          <option value="POST">POST</option>
                          <option value="GET">GET</option>
                          <option value="PUT">PUT</option>
                          <option value="PATCH">PATCH</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    borderTop: "1px dashed var(--studio-300)",
                  }}
                >
                  <button
                    onClick={() => {
                      setNodes((nds) =>
                        nds.filter((n) => n.id !== selectedNode.id),
                      );
                      setSelectedNode(null);
                    }}
                    style={{
                      padding: "8px",
                      width: "100%",
                      borderRadius: "6px",
                      border: "1px solid var(--studio-danger-muted)",
                      background: "var(--studio-danger-surface-rose)",
                      color: "var(--studio-danger-rose)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    <Trash2 size={14} /> Delete Node
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  color: "var(--studio-400)",
                }}
              >
                <BoxSelect
                  size={32}
                  style={{ margin: "0 auto 12px", opacity: 0.5 }}
                />
                <p style={{ fontSize: "13px" }}>
                  Select a node on the canvas
                  <br />
                  to edit its properties.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isHistoryModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 10001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              width: "720px",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid var(--studio-200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--studio-900)",
                  }}
                >
                  {inspectingRun ? "Run Inspector" : "Execution History"}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "var(--studio-500)",
                  }}
                >
                  {inspectingRun
                    ? "Step-by-step trail of this run"
                    : "Recent runs for this workflow"}
                </p>
              </div>
              <button
                onClick={closeHistory}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "var(--studio-500)",
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
              {inspectingRun ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      onClick={() => {
                        setSelectedRun(null);
                        setRunSteps([]);
                        setInspectingRun(null);
                      }}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "1px solid var(--studio-300)",
                        background: "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--studio-700)",
                      }}
                    >
                      <ArrowLeft size={14} /> Back to runs
                    </button>
                    {selectedRun?.status === "FAILED" &&
                      selectedRun.resumeFrom && (
                        <button
                          onClick={() => handleResumeRun(selectedRun.id)}
                          disabled={runActionLoading}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "none",
                            background: "var(--studio-accent)",
                            color: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          <RotateCcw size={14} /> Resume Run
                        </button>
                      )}
                  </div>
                  <div
                    style={{
                      border: "1px solid var(--studio-200)",
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "var(--studio-600)",
                        }}
                      >
                        {selectedRun?.id}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontWeight: 600,
                          background:
                            selectedRun?.status === "COMPLETED"
                              ? "var(--studio-success-subtle)"
                              : selectedRun?.status === "WAITING"
                                ? "var(--studio-warning-subtle)"
                                : "var(--studio-danger-subtle)",
                          color:
                            selectedRun?.status === "COMPLETED"
                              ? "var(--studio-success-text)"
                              : selectedRun?.status === "WAITING"
                                ? "var(--studio-warning-text)"
                                : "var(--studio-danger-text)",
                        }}
                      >
                        {selectedRun?.status}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontSize: "12px",
                        color: "var(--studio-500)",
                        flexWrap: "wrap",
                      }}
                    >
                      <span>
                        Started:{" "}
                        {selectedRun?.startedAt
                          ? new Date(selectedRun.startedAt).toLocaleString()
                          : "—"}
                      </span>
                      {selectedRun?.completedAt && (
                        <span>
                          Finished:{" "}
                          {new Date(
                            selectedRun.completedAt,
                          ).toLocaleString()}
                        </span>
                      )}
                      <span>Trigger: {selectedRun?.trigger || "MANUAL"}</span>
                      {selectedRun?.resumeFrom && (
                        <span>Resume from: {selectedRun.resumeFrom}</span>
                      )}
                    </div>
                    {selectedRun?.error && (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "10px 12px",
                          borderRadius: "6px",
                          background: "var(--studio-danger-surface-rose)",
                          color: "var(--studio-danger-rose)",
                          fontSize: "12px",
                          fontFamily: "monospace",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {selectedRun.error}
                      </div>
                    )}
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "var(--studio-400)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Steps ({runSteps.length})
                    </span>
                  </div>
                  {runSteps.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px 0",
                        color: "var(--studio-400)",
                        fontSize: "13px",
                      }}
                    >
                      No steps recorded yet.
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {runSteps.map((step: any) => (
                        <div
                          key={step.id}
                          style={{
                            border:
                              step.status === "FAILED"
                                ? "1px solid var(--studio-danger-muted)"
                                : "1px solid var(--studio-200)",
                            borderRadius: "8px",
                            padding: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "var(--studio-400)",
                                  fontWeight: 600,
                                  minWidth: "18px",
                                }}
                              >
                                {step.sortOrder}
                              </span>
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  color: "var(--studio-800)",
                                }}
                              >
                                {step.nodeLabel ||
                                  `${step.nodeType} (${step.nodeId})`}
                              </span>
                            </div>
                            <span
                              style={{
                                fontSize: "11px",
                                padding: "3px 8px",
                                borderRadius: "12px",
                                fontWeight: 600,
                                background:
                                  step.status === "SUCCESS"
                                    ? "var(--studio-success-subtle)"
                                    : step.status === "FAILED"
                                      ? "var(--studio-danger-subtle)"
                                      : step.status === "COMPENSATED"
                                        ? "var(--studio-warning-subtle)"
                                        : step.status === "WAITING"
                                          ? "var(--studio-warning-subtle)"
                                          : "var(--studio-100)",
                                color:
                                  step.status === "SUCCESS"
                                    ? "var(--studio-success-text)"
                                    : step.status === "FAILED"
                                      ? "var(--studio-danger-text)"
                                      : step.status === "COMPENSATED"
                                        ? "var(--studio-warning-text)"
                                        : step.status === "WAITING"
                                          ? "var(--studio-warning-text)"
                                          : "var(--studio-500)",
                              }}
                            >
                              {step.status}
                            </span>
                          </div>
                          {step.error && (
                            <div
                              style={{
                                marginTop: "8px",
                                padding: "8px 10px",
                                borderRadius: "6px",
                                background:
                                  "var(--studio-danger-surface-rose)",
                                color: "var(--studio-danger-rose)",
                                fontSize: "12px",
                                fontFamily: "monospace",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {step.error}
                            </div>
                          )}
                          {step.nodeType === "approval" &&
                            step.status === "WAITING" && (
                              <div
                                style={{
                                  marginTop: "10px",
                                  display: "flex",
                                  gap: "8px",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    handleApproveStep(
                                      selectedRun.id,
                                      step.id,
                                      true,
                                    )
                                  }
                                  disabled={runActionLoading}
                                  style={{
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    border: "none",
                                    background: "var(--studio-success)",
                                    color: "white",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  <Check size={14} /> Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleApproveStep(
                                      selectedRun.id,
                                      step.id,
                                      false,
                                    )
                                  }
                                  disabled={runActionLoading}
                                  style={{
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    border: "1px solid var(--studio-danger-muted)",
                                    background:
                                      "var(--studio-danger-surface-rose)",
                                    color: "var(--studio-danger-rose)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}
                                >
                                  <X size={14} /> Reject
                                </button>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : executions.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 0",
                    color: "var(--studio-400)",
                  }}
                >
                  <Clock
                    size={32}
                    style={{ margin: "0 auto 12px", opacity: 0.5 }}
                  />
                  <p style={{ margin: 0 }}>No executions yet.</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {executions.map((exec: any) => (
                    <div
                      key={exec.id}
                      style={{
                        border: "1px solid var(--studio-200)",
                        borderRadius: "8px",
                        padding: "16px",
                        cursor: "pointer",
                      }}
                      onClick={() => fetchRunDetail(exec.id)}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "var(--studio-600)",
                          }}
                        >
                          {exec.id}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontWeight: 600,
                            background:
                              exec.status === "COMPLETED"
                                ? "var(--studio-success-subtle)"
                                : exec.status === "WAITING"
                                  ? "var(--studio-warning-subtle)"
                                  : "var(--studio-danger-subtle)",
                            color:
                              exec.status === "COMPLETED"
                                ? "var(--studio-success-text)"
                                : exec.status === "WAITING"
                                  ? "var(--studio-warning-text)"
                                  : "var(--studio-danger-text)",
                          }}
                        >
                          {exec.status}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "12px",
                          color: "var(--studio-500)",
                        }}
                      >
                        <span>
                          Started:{" "}
                          {new Date(exec.startedAt).toLocaleString()}
                        </span>
                        <ChevronRight size={14} />
                      </div>
                      {exec.error && (
                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "12px",
                            color: "var(--studio-danger-rose)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {exec.error}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function WorkflowEditorWorkspace(props: WorkflowEditorWorkspaceProps) {
  return (
    <ReactFlowProvider>
      <WorkflowEditorInner {...props} />
    </ReactFlowProvider>
  );
}
