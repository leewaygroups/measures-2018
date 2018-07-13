function componentDidMount(){
    // render tree only after component successful mount

    var boxWidth = 150,
    boxHeight = 40;

    window.testme = d3.select(this.refs.treeContainer).append("svg");

     // Setup zoom and pan
    var zoom = d3.behavior.zoom()
    .scaleExtent([.1,1])
    .on('zoom', function(){
        svg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    })

    // Offset so that first pan and zoom does not jump back to the origin
    .translate([150, 200]);

    var svg = window.testme // d3.select(this.refs.treeContainer).append("svg")
    .attr('width', 1000)
    .attr('height', 500)
    .call(zoom)
    .append('g')
    // Left padding of tree so that the whole root node is on the screen.
    // TODO: find a better way
    .attr("transform", "translate(150,200)");

    var tree = d3.layout.tree()
    // Using nodeSize we are able to control
    // the separation between nodes. If we used
    // the size parameter instead then d3 would
    // calculate the separation dynamically to fill
    // the available space.
    .nodeSize([200, 290])
    // By default, cousins are drawn further apart than siblings.
    // By returning the same value in all cases, we draw cousins
    // the same distance apart as siblings.
    .separation(function(){
        return .5;
    })
    // Tell d3 what the child nodes are. Remember, we're drawing
    // a tree so the ancestors are child nodes.
    .children(function(treenode){
        console.log('1: ', treenode)
        return treenode.children;
    });

    window.mynode  = this.props.targetTree

    var nodes = tree.nodes(this.props.targetTree.root),
        links = tree.links(nodes); 

    // Style links (edges)
    svg.selectAll("path.link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", elbow);

    // Style nodes    
    var node = svg.selectAll("g.person")
        .data(nodes)
        .enter().append("g")
        .attr("class", "person")
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    // Draw the rectangle person boxes
    node.append("rect")
        .attr({
            x: -(boxHeight/2),
            y: -(boxWidth/2),
            width: boxHeight,
            height: boxWidth
        });

    // Draw the person's name and position it inside the box
    node.append("text")
        .attr("dx", -(boxWidth/2) + 10)
        .attr("dy", 0)
        .attr("text-anchor", "start")
        .attr('class', 'name')
        .text(function(d) { 
            return d.name; 
        });

    function elbow(d) {
        return "M" + d.source.y + "," + d.source.x
            + "H" + (d.source.y + (d.target.y-d.source.y)/2)
            + "V" + d.target.x 
            + "H" + d.target.y;
    }            

}