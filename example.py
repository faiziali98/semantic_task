from graph import Graph

g = Graph()

g.add_nodes_to_graph(["a", "b", "c", "d", "e"])
g.add_edges_to_graph([("a", "b"), ("b", "c"), ("b", "d"), ("c", "b"), ("d", "c"), ("d", "a"), ("d", "e"), ("e", "a")])

print(g.calculate_page_rank(40))