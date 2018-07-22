import React from 'react';
import { hierarchy } from 'd3-hierarchy'
import * as _ from 'Lodash';

export default class TreeChart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.divId = "tree";
        this.margin = {top: 100, right: 120, bottom: 100, left: 120};
        this.width = 960 - this.margin.right - this.margin.left;
        this.height = 800 - this.margin.top - this.margin.bottom;
        this.i = 0;
        this.duration = 750;
        this.root;
        this.autoScale = false;
        this.showTooltip = true;
        this.tooltipDelay = 2000;
        this.canShowTree = true;
    }

    componentWillMount() {
        d3 = require("d3");
    }

    componentDidMount() {        
        this.props.targetTree ? this.fnInitTree(this.props.targetTree) : null;
    }

    shouldComponentUpdate(nextProps) {

        console.info('Look here: ', this.props.targetTree, nextProps.targetTree)

        if(nextProps.targetTree){          
            
            let isDifferentCountryCode = this.props.targetTree == undefined 
                                        || this.props.targetTree.countryCode !== nextProps.targetTree.countryCode;

            let isDifferentResponse = this.props.targetTree == undefined 
                                        || this.props.targetTree.response !== nextProps.targetTree.response;

            let isDifferentYear = this.props.targetTree == undefined 
                                    || this.props.targetTree.year !== nextProps.targetTree.year;
            

            let verdict = isDifferentCountryCode || isDifferentResponse || isDifferentYear;

            if(verdict){
                this.fnInitTree(nextProps.targetTree);
                this.canShowTree  = true;
            }

            return verdict;
        }
        
        this.canShowTree  = false;
        return true;
    }

    fnInitTree(data) {
        let self = this;
        self.rectSize = {
            width: 300,
            height: 200
        };

        self.zoom = d3.zoom()
            .on("zoom", function () {
                if (d3.event.type === "wheel" || d3.event.type === 'mousemove') {
                    self.svgZoom.attr("transform", d3.event.transform);
                } else {
                    self.svgZoom.attr("transform", d3.event.transform);
                }

            });

        self.color = d3.scaleOrdinal(d3.schemeCategory10);

        // Define 'div' for tooltips
        this.tooltip = d3.select("#tooltip-container")  // declare the tooltip div
            .attr("class", "tooltip")              // apply the 'tooltip' class
            .style("opacity", 0);
        d3.select("#courseTree").selectAll("svg").remove();
        this.margin = {top: 50, right: 60, bottom: 50, left: 60};
        this.width = d3.select("#courseTree").node().clientWidth - this.margin.right - this.margin.left;
        this.height = d3.select("#courseTree").node().clientHeight - this.margin.top - this.margin.bottom;
        self.duration = 500;

        self.svgParent = d3.select("#courseTree").append("svg")
            .attr("id", "main")
            .attr("width", this.width + this.margin.right + this.margin.left)
            .attr("height", this.height + this.margin.top + this.margin.bottom).call(self.zoom);
        //zoom.scale(0.25);
        //zoom.transform([366,38]);


        self.svgZoom = self.svgParent.append("g").attr("transform", "scale(0.5)");
        self.svg = self.svgZoom.append("g");
        // declares a tree layout and assigns the size
        self.treemap = d3.tree()
            .size([this.height, this.width])
            .nodeSize([self.rectSize.width * 1.2, self.rectSize.height * 1.2]);

        this.fnHideInvisible(data.root.children, data.root, this);
        // Assigns parent, children, height, depth
        self.root = d3.hierarchy(data.root, function (d) {
            return d.visible && d.children;
        });
        self.root.x0 = this.width / 2;
        self.root.y0 = 0;
        this.updateData(self.root, true);
        self.svgParent.call(this.zoom.transform, d3.zoomIdentity.translate(0, 0).scale(0.1))
    }

    fnClickNode(k, self) {
        if (k.children) {
            k._children = k.children;
            k.children = null;
        } else {
            k.children = k._children;
            k._children = null;
        }
        self.updateData(k, false);

    }

    fnHideInvisible(d, parent, that) {
        if (Array.isArray(d)) {
            const array = [];
            const arrayChild = [];
            _.forEach(d, function (c, i) {
                if (c && typeof c.visible === 'boolean' && !c.visible) {
                    array.push(i)
                } else if (c && c.visible) {
                    arrayChild.push(c)
                }
            });
            _.forEach(array.sort().reverse(), function (i) {
                parent.children.splice(i, 1);
            });
            _.forEach(arrayChild, function (c) {
                that.fnHideInvisible(c.children, c, that)
            })
        }
    }

    updateData(source, isRecall) {
        let self = this;

        // Compute the new tree layout.
        let treeData = self.treemap(self.root);
        // Compute the new tree layout.
        let nodes = treeData.descendants();
        let links = treeData.descendants().slice(1);

        // Assigns the x and y position for the nodes


        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * ((self.rectSize.height * 1.4));
        });
        // ****************** Nodes section ***************************

        // Update the nodes...
        let node = self.svg.selectAll('g.node')
            .data(nodes, function (d, i) {
                return d.id || (d.id = ++self.i);
            });

        // Enter any new modes at the parent's previous position.
        let nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function (d) {
                return "translate(" + source.x0 + "," + source.y0 + ")";
            })
            .on('click', function (j) {
                return self.fnClickNode(j, self)
            });
        //.on("mouseover", function (d) {
        //    if (self.showTooltip) {
        //        self.tooltip.transition().duration(200)
        //            .style("opacity", 0);
        //        self.tooltip.transition().duration(200)
        //            .style("opacity", .9);
        //        self.tooltip.html("<table><tr><th>Id</th><th>children count</th><th>Number</th></tr>" +
        //            "<tr><td>" + d.id + "</td><td>" + d.children.length + "</td><td>" + d.number + "</td></tr></table>")
        //    }
        //})
        //.on("mousemove", function (d) {
        //    self.tooltip.style("opacity", .9).style("left", (d3.event.pageX + 10) + "px")
        //        .style("top", (d3.event.pageY + 10) + "px");
        //})
        //.on('mouseleave', function (d) {
        //    self.tooltip
        //        .style("opacity", 0);
        //});
        nodeEnter.append("svg:rect")
            .attr("width", self.rectSize.width)
            .attr("height", self.rectSize.height)
            .attr("x", function () {
                return -(self.rectSize.width / 2)
            })
            .attr("y", 0)
            .style("fill", function (d) {
                return self.color(d.data.number);
            })
            .attr("ry", 10).style("user-select", 'none').style("pointers-event", 'none');

        //append text element
        nodeEnter.append("text")
            .attr('y', 40)
            .text(function (d) {
                return d.data.caption ? d.data.caption : '';
            })
            .style("user-select", 'none').style("pointers-event", 'none')
            .style("text-anchor", 'middle').style('fill', function (d) {
            return d.data.color ? "white" : 'black';
        }).style("font-weight", "bold")
            .style("dominant-baseline", 'Central').style("font-size", '30px');
        nodeEnter.append("text")
            .attr('y', 100)
            .text(function (d) {
                const size = d.data.size ? "size : " + d.data.size : '';
                return size;

            })
            .style("user-select", 'none').style("pointers-event", 'none')
            .style("text-anchor", 'middle').style('fill', function (d) {
                return d.data.color ? "white" : 'black';
            })
            .style("dominant-baseline", 'Central').style("font-size", '20px');
        nodeEnter.append("text")
            .attr('y', 140)
            .text(function (d) {
                const attainment = d.data.attainment ? 'attainment : ' + d.data.attainment : '';
                return attainment;

            })
            .style("user-select", 'none').style("pointers-event", 'none')
            .style("text-anchor", 'middle').style('fill', function (d) {
                return d.data.color ? "white" : 'black';
            })
            .style("dominant-baseline", 'Central').style("font-size", '20px');

        let nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(self.duration)
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select("text")
            .style("fill-opacity", 1).style("pointer-events", "none").style('fill', function (d) {
            return d.data.color ? "white" : 'black';
        });

        nodeUpdate.select("rect")
            .style("fill-opacity", 1)
            //.attr('stroke', function (d, i) {
            //    return self.color(d.data.number);
            //})
            .style('fill', function (d, i) {
                return d.data.color ? d.data.color : '#e9e9ea';
            });

        // Remove any exiting nodes
        let nodeExit = node.exit().transition()
            .duration(self.duration)
            .attr("transform", function (d) {
                return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6).style('fill', function (d) {
            return d.data.color ? "white" : 'black';
        });


        // ****************** links section ***************************

        // Update the links...
        let link = self.svg.selectAll('path.link')
            .data(links, function (d) {
                return d.id;
            });

        // Enter any new links at the parent's previous position.
        let linkEnter = link.enter().insert('path', "g")
            .attr("class", "link").attr("class", "link")
            .style("stroke", "#e9e9ea")
            //.style("stroke", function (d) {
            //    return self.color(d.parent.data.number);
            //})
            .attr('d', function (d) {
                let o = {x: source.x0, y: source.y0}
                return diagonal(o, o)
            });

        // UPDATE
        let linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(self.duration)
            .attr('d', function (d) {
                return diagonal(d, d.parent)
            });

        // Remove any exiting links
        let linkExit = link.exit().transition()
            .duration(self.duration)
            .attr('d', function (d) {
                let o = {x: source.x, y: source.y}
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

            let path = "M" + (s.x ) + "," + (s.y) + " L" + (s.x ) + "," + (s.y - 15)
                + "L" + (d.x) + ',' + (s.y - 15) + "L" + (d.x) + "," + d.y;

            //let path = `M ${s.x} ${s.y}
            //C ${(s.x + d.x) / 2} ${s.y},
            //  ${(s.x + d.x) / 2} ${d.y},
            //  ${d.x} ${d.y}`

            return path
        }

        // Toggle children on click.

        if (isRecall) {
            setTimeout(() => {

                const n = self.svg.node().getBBox();
                const translate = {};
                n.height = n.height + 50;
                n.width = n.width + 50;
                n.x = n.x - 25;
                n.y = n.y - 25;
                let width = this.width + this.margin.right + this.margin.left
                let height = this.height + this.margin.top + this.margin.bottom
                translate.scale = Math.min(height / n.height, width / n.width);
                translate.translate = [(((-n.x * translate.scale) + width / 2) - (n.width / 2 * translate.scale)), (((-n.y * translate.scale) + height / 2) - (n.height / 2 * translate.scale))];
                if (!this.autoScale) {
                    self.svgParent.transition().duration(1000).call(this.zoom.transform, d3.zoomIdentity.translate(width / 2, this.margin.top).scale(0.4));
                } else {
                    self.svgParent.transition().duration(1000).call(this.zoom.transform, d3.zoomIdentity.translate(translate.translate[0], translate.translate[1]).scale(translate.scale));
                }
            }, self.duration)
        }

    }

    render() {
        let viewFrame;

        if (this.canShowTree)
        {
            viewFrame = (
                <div className="tree m-t-64" id="courseTree"
                        style={{display: "flex", height: "100%", width: "100%", overflowX:"auto"}}>
                    <div id="tooltip-container"></div>
                </div>
            );
        }

        return (
            [viewFrame]
        );
    }
}