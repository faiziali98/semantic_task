from flask import Flask, request
from graph import Graph
import json

g = Graph()
app = Flask(__name__)

g.add_nodes_to_graph(["a", "b", "c", "d", "e"])
g.add_edges_to_graph([("a", "b"), ("b", "c"), ("b", "d"), ("c", "b"), ("d", "c"), ("d", "a"), ("d", "e"), ("e", "a")])

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/get_edges")
def get_edges():
    return json.dumps(g.get_edges())

@app.route("/get_page_ranks", methods=["POST"])
def get_page_ranks():
    if request.method == "POST":
        rounds = request.json["rounds"]
        return json.dumps(g.calculate_page_rank(int(rounds)))

    return ''

@app.route("/get_nodes")
def get_nodes():
    return json.dumps(g.get_nodes())

@app.route("/add_edges", methods=["POST"])
def add_edges():
    if request.method == "POST":
        from_node = request.json["from"]
        to = request.json["to"]

        g.add_edge_to_graph((from_node, to))
        return ''
    return ''

@app.route("/add_node", methods=["POST"])
def add_node():
    if request.method == "POST":
        node = request.json["node"]

        g.add_node_to_graph(node)
        return ''
    return ''

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3001)