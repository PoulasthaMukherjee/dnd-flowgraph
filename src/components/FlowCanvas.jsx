import React, { useCallback } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, Handle, useNodesState, useEdgesState } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import 'reactflow/dist/style.css';

const InputNode = ({ data }) => {
  return (
    <div className="input-node">
      <div>{data.label}</div>
      {/* Output handle (port) at the bottom */}
      <Handle type="source" position="bottom" id="output" style={{ background: '#555' }} />
    </div>
  );
};

const DefaultNode = ({ data }) => {
  return (
    <div className="default-node">
      <div>{data.label}</div>
      {/* Input handle (port) at the top */}
      <Handle type="target" position="top" id="input" style={{ background: '#555' }} />
      {/* Output handle (port) at the bottom */}
      <Handle type="source" position="bottom" id="output" style={{ background: '#555' }} />
    </div>
  );
};

const OutputNode = ({ data }) => {
  return (
    <div className="output-node">
      <div>{data.label}</div>
      {/* Input handle (port) at the top */}
      <Handle type="target" position="top" id="input" style={{ background: '#555' }} />
    </div>
  );
};

const nodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
};

const initialNodes = [];
const initialEdges = [];

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const handleDrop = (event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/reactflow');
    const position = event.target.getBoundingClientRect();

    const newNode = {
      id: uuidv4(),
      type: nodeType,
      position: {
        x: event.clientX - position.left,
        y: event.clientY - position.top,
      },
      data: { label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node` },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flow-canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;