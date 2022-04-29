import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import GraphClass from "./utils/graph";

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

const App = () => {
  const [state, setState] = useState({
    counter: 0,
    graph: {
      nodes: [],
      edges: []
    },
    events: {
      select: ({ nodes, edges }) => {
        alert("Selected node: " + nodes);
      },
    },
    nodeMap: {}
  });

  const [graphVal, setGraphVal] = useState(new GraphClass());
  const [formVals, setFormVals] = useState({node: '', to: '', from: '', rounds: ''});

  const createNode = (name) => {
    const color = randomColor();
    setState(({ graph: { nodes, ...restGraph }, counter, nodeMap, ...rest }) => {
      const id = counter + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            { id, label: `${name}`, color }
          ],
          ...restGraph,
        },
        counter: id,
        nodeMap: {...nodeMap, [name]: id},
        ...rest
      }
    });
  };

  const createEdge = (edge) => {
    setState(({ graph: { edges, ...restGraph }, nodeMap, ...rest }) => {
      return {
        graph: {
          edges: [
            ...edges,
            { from: nodeMap[edge[0]], to: nodeMap[edge[1]] }
          ],
          ...restGraph,
        },
        nodeMap,
        ...rest
      }
    });
  };

  useEffect(() => {
    graphVal.add_nodes_to_graph(["a", "b", "c", "d", "e"])
    graphVal.add_edges_to_graph(
        [
            ["a", "b"],
            ["b", "c"],
            ["b", "d"],
            ["c", "b"],
            ["d", "c"],
            ["d", "a"],
            ["d", "e"],
            ["e", "a"],
        ]
    )

    graphVal.get_nodes().forEach(element => {
      createNode(element);
    });

    graphVal.get_edges().forEach(element => {
      createEdge(element);
    });

    setGraphVal(graphVal);
     // eslint-disable-next-line
  }, [])

  const handleChange = (name) => (event) => {
    setFormVals({...formVals, [name]: event.target.value});
  };

  

  const handleSubmit = (type) => (event) => {
    event.preventDefault();
    const addNode = type === 'node';

    const {node, from, to} = formVals;
    const data = addNode ?  node  : [ from, to ]

    addNode ? graphVal.add_node_to_graph(data) : graphVal.add_edge_to_graph(data);
    addNode ? createNode(node) : createEdge([from, to]);
    
    setGraphVal(graphVal);
  }

  const getPageRank = (event) => {
    event.preventDefault();

    const nodeMap = {...state.nodeMap};
    const res = graphVal.calculate_page_rank(formVals.rounds);
        

    const newNodes = Object.keys(res).map((key) => {
      const color = randomColor();
      return{ 
        id: nodeMap[key], label: `${key} \n ${res[key]}`, color 
      };
    });

    setState(({ graph: { nodes, ...restGraph }, ...rest }) => ({
        graph: {
          nodes:[...newNodes],
          ...restGraph,
        },
        ...rest
    })); 
  }

  const { graph, events } = state;
  return (
    <div>
      <h1>Page Rank and Graph</h1>
      <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
      <form onSubmit={handleSubmit("node")} style={{ padding: "16px" }}>
        <label>
          Node:
          <input type="text" value={formVals.node} onChange={handleChange("node")} />
        </label>
        <input type="submit" value="Submit" style={{ marginLeft: "8px" }} />
      </form>
      <form onSubmit={handleSubmit("edge")} style={{ padding: "16px" }}>
        <label>
          Edge:
          <input type="text" value={formVals.from} onChange={handleChange("from")} />
          <input type="text" value={formVals.to} onChange={handleChange("to")} style={{ marginLeft: "8px" }} />
        </label>
        <input type="submit" value="Submit" style={{ marginLeft: "8px" }}/>
      </form>
      <form onSubmit={getPageRank} style={{ padding: "16px" }}>
        <label>
          Rounds:
          <input type="text" value={formVals.rounds} onChange={handleChange("rounds")} />
        </label>
        <input type="submit" value="Get Page Ranks" style={{ marginLeft: "8px" }}/>
      </form>
    </div>
  );

}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);