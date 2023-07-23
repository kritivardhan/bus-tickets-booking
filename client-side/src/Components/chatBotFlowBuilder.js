import React, { useState } from 'react';

const ChatbotFlowBuilder = () => {
  const [flows, setFlows] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const addFlow = () => {
    const newFlow = {
      id: Date.now(),
      nodes: []
    };

    setFlows([...flows, newFlow]);
  };

  const deleteFlow = (flowId) => {
    const updatedFlows = flows.filter((flow) => flow.id !== flowId);
    setFlows(updatedFlows);
  };

  const addNode = (flowId, nodeType) => {
    const newNode = {
      id: Date.now(),
      type: nodeType,
      text: '',
      sourceHandleId: null,
      targetHandleIds: []
    };

    const updatedFlows = flows.map((flow) => {
      if (flow.id === flowId) {
        return {
          ...flow,
          nodes: [...flow.nodes, newNode]
        };
      }
      return flow;
    });

    setFlows(updatedFlows);
  };

  const deleteNode = (flowId, nodeId) => {
    const updatedFlows = flows.map((flow) => {
      if (flow.id === flowId) {
        return {
          ...flow,
          nodes: flow.nodes.filter((node) => node.id !== nodeId)
        };
      }
      return flow;
    });

    setFlows(updatedFlows);
  };

  const handleNodeTextChange = (flowId, nodeId, text) => {
    const updatedFlows = flows.map((flow) => {
      if (flow.id === flowId) {
        return {
          ...flow,
          nodes: flow.nodes.map((node) => {
            if (node.id === nodeId) {
              return {
                ...node,
                text
              };
            }
            return node;
          })
        };
      }
      return flow;
    });

    setFlows(updatedFlows);
  };

  const handleSourceHandleConnect = (flowId, nodeId, handleId) => {
    const updatedFlows = flows.map((flow) => {
      if (flow.id === flowId) {
        return {
          ...flow,
          nodes: flow.nodes.map((node) => {
            if (node.id === nodeId) {
              return {
                ...node,
                sourceHandleId: handleId
              };
            }
            return node;
          })
        };
      }
      return flow;
    });

    setFlows(updatedFlows);
  };

  const handleTargetHandleConnect = (flowId, nodeId, handleId) => {
    const updatedFlows = flows.map((flow) => {
      if (flow.id === flowId) {
        return {
          ...flow,
          nodes: flow.nodes.map((node) => {
            if (node.id === nodeId) {
              return {
                ...node,
                targetHandleIds: [...node.targetHandleIds, handleId]
              };
            }
            return node;
          })
        };
      }
      return flow;
    });

    setFlows(updatedFlows);
  };

  const handleTargetHandleDisconnect = (flowId, nodeId, handleId) => {
    const updatedFlows = flows.map((flow) => {
      if (flow.id === flowId) {
        return {
          ...flow,
          nodes: flow.nodes.map((node) => {
            if (node.id === nodeId) {
              return {
                ...node,
                targetHandleIds: node.targetHandleIds.filter((id) => id !== handleId)
              };
            }
            return node;
          })
        };
      }
      return flow;
    });

    setFlows(updatedFlows);
  };

  const saveFlow = () => {
    const errorMessages = [];

    flows.forEach((flow) => {
      const emptyTargetNodes = flow.nodes.filter((node) => node.targetHandleIds.length === 0);

      if (flow.nodes.length > 1 && emptyTargetNodes.length > 1) {
        errorMessages.push(`Flow ${flow.id}: Multiple nodes have empty target handles.`);
      }
    });

    if (errorMessages.length > 0) {
      // Show error messages
      console.log('Errors:', errorMessages);
    } else {
      // Save the flow
      console.log('Flow saved:', flows);
    }
  };

  const selectNode = (nodeId) => {
    setSelectedNodeId(nodeId);
  };

  const renderNodesPanel = () => {
    // Render your nodes panel UI here
    // Add more node types in the future
  };

  const renderSettingsPanel = () => {
    if (!selectedNodeId) {
      return null;
    }

    const selectedNode = flows.flatMap((flow) => flow.nodes).find((node) => node.id === selectedNodeId);

    if (!selectedNode) {
      return null;
    }

    return (
      <div>
        <input
          type="text"
          value={selectedNode.text}
          onChange={(e) => handleNodeTextChange(selectedNode.flowId, selectedNode.id, e.target.value)}
        />
      </div>
    );
  };

  return (
    <div>
      <button onClick={addFlow}>Add Flow</button>

      {flows.map((flow) => (
        <div key={flow.id}>
          <h3>Flow {flow.id}</h3>
          <button onClick={() => deleteFlow(flow.id)}>Delete Flow</button>

          <div>
            {flow.nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => selectNode(node.id)}
                style={{ border: selectedNodeId === node.id ? '2px solid blue' : 'none' }}
              >
                {node.type === 'text' && (
                  <input
                    type="text"
                    value={node.text}
                    onChange={(e) => handleNodeTextChange(flow.id, node.id, e.target.value)}
                  />
                )}
                {/* Render other node types */}
              </div>
            ))}
            {renderNodesPanel()}
            <button onClick={() => addNode(flow.id, 'text')}>Add Text Node</button>
            {/* Add more node types */}
          </div>

          <div>
            {flow.nodes.map((node) => (
              <div key={node.id}>
                {node.sourceHandleId && (
                  <div>
                    Source Handle: {node.sourceHandleId}
                  </div>
                )}
                {node.targetHandleIds.map((handleId) => (
                  <div key={handleId}>
                    Target Handle: {handleId}
                    <button onClick={() => handleTargetHandleDisconnect(flow.id, node.id, handleId)}>
                      Disconnect
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      {renderSettingsPanel()}

      <button onClick={saveFlow}>Save</button>
    </div>
  );
};

export default ChatbotFlowBuilder;