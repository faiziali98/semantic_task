""" Page Rank

For this project, the goal is to build a quick graph implementation and
visualization, implement a function that calculates the PageRank of a node,
and write tests of their functionality.
"""


class Graph:
    """
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
    """

    def __init__(self):
        self._nodes = []
        self._edge = []

        self._adjency = {}

    def add_node_to_graph(self, node_name):
        """Adds a node to the graph

        Parameters
        ----------
        node_name : str, required
            The name of the node to add.
        """
        self._nodes.append(node_name)

    def add_edge_to_graph(self, edge):
        """Adds an edge to the graph

        Parameters
        ----------
        edge: (from_node: str, to_node: str), required
            The new edge to add, in Tuple form.
        """
        self._edge.append(edge)
        from_node, to_node = edge

        if self._adjency.get(from_node):
            self._adjency[from_node].append(to_node)
        else:
            self._adjency[from_node] = [to_node]

    def add_nodes_to_graph(self, nodes_name):
        """Adds multiple nodes to the graph

        Parameters
        ----------
        nodes_name : [str], required
            The name of add the node to add.
        """
        self._nodes.extend(nodes_name)

    def add_edges_to_graph(self, edges):
        """Adds multiple edge to the graph

        Parameters
        ----------
        edge: [(from_node: str, to_node: str)], required
            all the new edges to add, in Tuple form.
        """
        for edge in edges:
            self.add_edge_to_graph(edge)

    def get_in_neighbours(self, node):
        """Get all nodes that have edge to "node"

        Parameters
        ----------
        node: str, required
            node of which neighbours are extracted

        Output
        ----------
        neighbours: [str]
            All the in neighbours
        """

        neighbours = []
        for g_node in self._nodes:
            if g_node != node:
                if node in self._adjency[g_node]:
                    neighbours.append(g_node)

        return neighbours

    def get_out_neighbours(self, node):
        """Get all nodes that have edge from "node"

        Parameters
        ----------
        node: str, required
            node of which neighbours are extracted

        Output
        ----------
        neighbours: [str]
            All the in neighbours
        """
        return self._adjency[node]

    def get_neighbours(self, node):
        """Get all neighbours to/from "node"

        Parameters
        ----------
        node: str, required
            node of which neighbours are extracted

        Output
        ----------
        neighbours: {[str]}
            All the in neighbours
        """
        if node not in self._nodes:
            return "Node does not exist"
        return {
            "in": self.get_in_neighbours(node),
            "out": self.get_out_neighbours(node),
        }

    def calculate_page_rank(self, rounds):
        """Calculate page rank

        Parameters
        ----------
        rounds: int, required
            number of rounds to run

        Output
        ----------
        page_rank: {str: float}
            page rank of all the nodes
        """

        page_rank = {}
        num_nodes = len(self._nodes)
        in_neighbours = {}
        out_neighbours = {}

        for node in self._nodes:
            page_rank[node] = 1 / num_nodes
            in_neighbours[node] = self.get_in_neighbours(node)
            out_neighbours[node] = self.get_out_neighbours(node)

        def update_page_rank():
            new_page_ranks = {}
            for node in self._nodes:
                new_page_rank = 0
                for neighbour in in_neighbours[node]:
                    dist_factor = len(out_neighbours[neighbour])
                    new_page_rank += page_rank[neighbour] * (1 / dist_factor)
                new_page_ranks[node] = round(new_page_rank, 5)

            return new_page_ranks

        for _ in range(rounds):
            page_rank = update_page_rank()

        return page_rank

    def get_nodes(self):
        return self._nodes

    def get_edges(self):
        return self._edge

    def get_adjency(self):
        return self._adjency

    def __str__(self):
        """a formatted string to print out graph"""
        return f"Nodes: {self._nodes}\nEdges: {self._edge}\nAdjency: {self._adjency}"
