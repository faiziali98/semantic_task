import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

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

  const [formVals, setFormVals] = useState({node: '', to: '', from: '', rounds: ''})

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
    fetch("/get_nodes")
      .then(res => res.json())
      .then(
        (result) => {
          result.forEach(element => {
            createNode(element);
          });
          fetch("/get_edges")
            .then(res => res.json())
            .then(
              (result) => {
                result.forEach(element => {
                  createEdge(element);
                });
              },
              (error) => {
                console.log(error)
              }
            );
        },
        (error) => {
          console.log(error)
        }
      );
    
  }, [])

  const handleChange = (name) => (event) => {
    setFormVals({...formVals, [name]: event.target.value});
  };

  

  const handleSubmit = (type) => (event) => {
    event.preventDefault();
    const addNode = type === 'node';
    const url =  addNode ? '/add_node' : '/add_edges'

    const {node, from, to} = formVals;
    const data = addNode ? { node } : { from, to}

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch(url, requestOptions)
        .then(response => addNode ? createNode(node) : createEdge([from, to]) );    
  }

  const getPageRank = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({rounds: formVals.rounds})
    };

    fetch("/get_page_ranks", requestOptions)
      .then(res => res.json())
      .then(res => {
        const nodeMap = {...state.nodeMap};
        

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
      });  
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