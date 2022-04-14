from graph import Graph

def create_graph():
    g = Graph()

    g.add_nodes_to_graph(["a", "b", "c", "d", "e"])
    g.add_edges_to_graph([("a", "b"), ("b", "c"), ("b", "d"), ("c", "b"), ("d", "c"), ("d", "a"), ("d", "e"), ("e", "a")])

    return g

def test_nodes():
    g = create_graph()
    assert g.get_nodes() == ['a', 'b', 'c', 'd', 'e']

def test_edges():
    g = create_graph()
    assert g.get_edges() == [('a', 'b'), ('b', 'c'), ('b', 'd'), ('c', 'b'), ('d', 'c'), ('d', 'a'), ('d', 'e'), ('e', 'a')]

def test_adjency():
    g = create_graph()
    assert g.get_adjency() == {'a': ['b'], 'b': ['c', 'd'], 'c': ['b'], 'd': ['c', 'a', 'e'], 'e': ['a']}


def test_neighbours():
    g = create_graph()
    assert g.get_neighbours('d') == {'in': ['b'], 'out': ['c', 'a', 'e']}
    assert g.get_neighbours('s') == "Node does not exist"


def test_page_rank():
    g = create_graph()
    assert g.calculate_page_rank(1) == {'a': 0.26666666666666666, 'b': 0.4, 'c': 0.16666666666666669, 'd': 0.1, 'e': 0.06666666666666667}
    assert g.calculate_page_rank(4) == {'a': 0.1388888888888889, 'b': 0.3833333333333333, 'c': 0.2388888888888889, 'd': 0.16666666666666669, 'e': 0.07222222222222222}