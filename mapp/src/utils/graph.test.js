import GraphClass from "./graph";

const g = new GraphClass();
g.add_nodes_to_graph(["a", "b", "c", "d", "e"])
g.add_edges_to_graph(
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

describe("Test for graph class", () => {
    test('Test get nodes', () => {
        expect(g.get_nodes()).toEqual(["a", "b", "c", "d", "e"]);
    });
    test('Test get_edges', () => {
        expect(g.get_edges()).toEqual([
            ["a", "b"],
            ["b", "c"],
            ["b", "d"],
            ["c", "b"],
            ["d", "c"],
            ["d", "a"],
            ["d", "e"],
            ["e", "a"],
        ]);
    });
    test('Test get_adjacency', () => {
        expect(g.get_adjacency()).toEqual({
            "a": ["b"],
            "b": ["c", "d"],
            "c": ["b"],
            "d": ["c", "a", "e"],
            "e": ["a"],
        });
    });

    test('Test get_neighbors', () => {
        expect(g.get_neighbors("d")).toEqual({"in": ["b"], "out": ["c", "a", "e"]});
        expect(g.get_neighbors("s")).toEqual("Node does not exist");
    });

    test('Test calculate_page_rank', () => {
        
        expect (g.calculate_page_rank(1)).toEqual({
            "a": 0.27,
            "b": 0.4,
            "c": 0.17,
            "d": 0.1,
            "e": 0.07,
        });

        expect (g.calculate_page_rank(4)).toEqual({
            "a": 0.14,
            "b": 0.39,
            "c": 0.24,
            "d": 0.17,
            "e": 0.07,
        });
    });
})