# Semantic Health Fullstack Take Home Assignment (PageRank)

For this project, the goal is to build a quick graph implementation and
visualization, implement a function that calculates the PageRank of a node,
and write tests of their functionality.

This repo contains a simple graph implementation that allows users to, via a frontend interface:
- Add nodes to a graph
- Add edges to a graph
- Get neighboring nodes given a node (directed or undirected as you prefer)

## Assumptions:

- It is a very basic implementation of Graph and page_rank.
- Most functions do not cater for unordirary input. e.g. you can send any input for add_edge.
- The page_rank function does not converge but runs for `n` rounds.
- Tests are done for main functions.

## Requirement:

Python version >= 3.7

## Class Graph

```
    A class used to represent a directed Graph

    ...

    Attributes
    ----------
    _nodes : [str]
        the list of all the nodes
    _edge : [str]
        the list of all the edges
    _adjency : {str: [str]}
        the dictionary containing adjency nodes

    Methods
    -------
    add_node_to_graph(self, node_name)
        Adds a node to the graph
    add_edge_to_graph(self, edge)
        Adds an edge to the graph
    add_nodes_to_graph(self, nodes_name)
        Adds multiple nodes to the graph
    add_edges_to_graph(self, edges)
        Adds multiple edge to the graph
    def get_in_neighbours(self, node)
        Get all nodes that have edge to "node"
    def calculate_page_rank(self, rounds)
       Calculate page rank
    def get_neighbours(self, node)
       Get all neighbours to/from "node"
    def get_out_neighbours(self, node)
       Get all nodes that have edge from "node"
    def get_in_neighbours(self, node)
       Get all nodes that have edge to "node"
    __str__(self):
        a formatted string to print out graph
```

## Example

```
    g = Graph()

    g.add_nodes_to_graph(["a", "b", "c", "d", "e"])
    g.add_edges_to_graph([("a", "b"), ("b", "c"), ("b", "d"), ("c", "b"), ("d", "c"), ("d", "a"), ("d", "e"), ("e", "a")])

    print(g.calculate_page_rank(4))
```

`python3 example.py`

## How to Test:

- install pytest
- run: pytest


## Frontend:

Added React frontend. 

```
cd mapp
npm install
npm start
```

## Backend

A flask backend is added that exposes graph APIs.

`python3 server.py`
