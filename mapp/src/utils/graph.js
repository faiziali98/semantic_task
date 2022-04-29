class GraphClass {
    constructor() {
        this._nodes = [];
        this._edges = [];

        this._adjacency = {}
    }

    add_node_to_graph(node_name) {
        /*Adds a node to the graph

        Parameters
        ----------
        node_name : str, required
            The name of the node to add.
        */
        this._nodes.push(node_name)
    }

    add_edge_to_graph(edge) {
        /* Adds an edge to the graph

        Parameters
        ----------
        edge: (from_node: str, to_node: str), required
            The new edge to add, in Tuple form.
        */
        this._edges.push([...edge])
        const [from_node, to_node] = edge

        if (this._adjacency[from_node]){
            this._adjacency[from_node].push(to_node)
        } else {
            this._adjacency[from_node] = [to_node]
        }
    }

    add_nodes_to_graph(nodes_name) {
        /* Adds multiple nodes to the graph

        Parameters
        ----------
        nodes_name : [str], required
            The name of add the node to add.
        */
        this._nodes.push(...nodes_name)
    }

    add_edges_to_graph(edges) {
        /* Adds multiple edge to the graph

        Parameters
        ----------
        edge: [(from_node: str, to_node: str)], required
            all the new edges to add, in Tuple form.
        */
        edges.forEach((edge) => this.add_edge_to_graph(edge));
           
    }

    get_in_neighbors(node) {
        /* Get all nodes that have edge to "node"

        Parameters
        ----------
        node: str, required
            node of which neighbours are extracted

        Output
        ----------
        neighbours: [str]
            All the in neighbours
        */

        const neighbors = []
        this._nodes.forEach((g_node) => {
            if (g_node !== node) {
                if (this._adjacency[g_node].includes(node)) {
                    neighbors.push(g_node)
                }
            }
        });
            
        return neighbors
    }

    get_out_neighbors(node) {
        /* Get all nodes that have edge from "node"

        Parameters
        ----------
        node: str, required
            node of which neighbours are extracted

        Output
        ----------
        neighbours: [str]
            All the in neighbours
        */
        return this._adjacency[node]
    }

    get_neighbors(node) {
        /* Get all neighbours to/from "node"

        Parameters
        ----------
        node: str, required
            node of which neighbours are extracted

        Output
        ----------
        neighbours: {[str]}
            All the in neighbours
        */

        if (!this._nodes.includes(node)) { 
            return "Node does not exist"
        }
        return {
            "in": this.get_in_neighbors(node),
            "out": this.get_out_neighbors(node),
        }
    }

    calculate_page_rank(rounds) {
        /* Calculate page rank

        Parameters
        ----------
        rounds: int, required
            number of rounds to run

        Output
        ----------
        page_rank: {str: float}
            page rank of all the nodes
        */

        var page_rank = {};
        const num_nodes = this._nodes.length;
        const in_neighbours = {};
        const out_neighbours = {};

        this._nodes.forEach((node)=>{
            page_rank[node] = 1 / num_nodes;
            in_neighbours[node] = this.get_in_neighbors(node);
            out_neighbours[node] = this.get_out_neighbors(node);
        });

        const update_page_rank = () => {
            const new_page_ranks = {}
            this._nodes.forEach((node) => {
                var new_page_rank = 0
                in_neighbours[node].forEach((neighbors) => {
                    const dist_factor = out_neighbours[neighbors].length;
                    new_page_rank += page_rank[neighbors] * (1 / dist_factor)
                })
                new_page_ranks[node] = Math.round(new_page_rank * 100) / 100
            });
            return new_page_ranks
        };
        [...Array(rounds).keys()].forEach((_) => {
            page_rank = update_page_rank();
        });
        
        return page_rank
    }

    print_graph() {
        /* a formatted string to print out graph */
        console.log(this._nodes)
        console.log(this._edges)
        console.log(this._adjacency)
    }

    get_nodes() {
        return this._nodes
    }

    get_edges() {
        return this._edges
    }

    get_adjacency() {
        return this._adjacency
    }
}



export default GraphClass;
