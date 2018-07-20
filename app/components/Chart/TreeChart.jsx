import React from 'react';
import { hierarchy } from 'd3-hierarchy'
import * as _ from 'Lodash';
// /import * as d3 from "d3";

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
    }

    componentWillMount() {
        d3 = require("d3");
    }

    componentDidMount() {

        var treeData = {
            "_id": {
                "$oid": "5b38cdba1f6e4f6fcc8233c2"
            },
            "countryCode": "AM",
            "year": "",
            "response": "CleanWater",
            "sourcefile": "AM42CleanWater.txt",
            "depth": 4,
            "root": {
                "isRoot": true,
                "level": 0,
                "location": null,
                "parentNumber": null,
                "attainment": "69%",
                "visible": true,
                "size": "100%",
                "number": 1,
                "children": [
                    {
                        "isRoot": false,
                        "level": 1,
                        "location": "Left",
                        "parentNumber": 1,
                        "number": 2,
                        "caption": "BOTTOM 40",
                        "size": "39%",
                        "attainment": "38%",
                        "visible": true,
                        "children": [
                            {
                                "isRoot": false,
                                "level": 2,
                                "location": "Left",
                                "parentNumber": 2,
                                "caption": "RURAL",
                                "size": "25%",
                                "attainment": "29%",
                                "visible": true,
                                "number": 4,
                                "children": [
                                    {
                                        "isRoot": false,
                                        "level": 3,
                                        "location": "Left",
                                        "parentNumber": 4,
                                        "caption": "MALE",
                                        "size": "13%",
                                        "attainment": "21%",
                                        "visible": true,
                                        "color": "orange",
                                        "number": 8,
                                        "children": [
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Left",
                                                "parentNumber": 8,
                                                "number": 16,
                                                "visible": false,
                                                "children": []
                                            },
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Right",
                                                "parentNumber": 8,
                                                "number": 17,
                                                "visible": false,
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "isRoot": false,
                                        "level": 3,
                                        "location": "Right",
                                        "parentNumber": 4,
                                        "caption": "FEMALE",
                                        "size": "12%",
                                        "attainment": "37%",
                                        "visible": true,
                                        "color": "green",
                                        "number": 9,
                                        "children": [
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Left",
                                                "parentNumber": 9,
                                                "number": 18,
                                                "visible": false,
                                                "children": []
                                            },
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Right",
                                                "parentNumber": 9,
                                                "number": 19,
                                                "visible": false,
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "isRoot": false,
                                "level": 2,
                                "location": "Right",
                                "parentNumber": 2,
                                "number": 5,
                                "caption": "URBAN",
                                "size": "14%",
                                "attainment": "58%",
                                "visible": true,
                                "children": [
                                    {
                                        "isRoot": false,
                                        "level": 3,
                                        "location": "Left",
                                        "parentNumber": 5,
                                        "number": 10,
                                        "visible": false,
                                        "children": [
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Left",
                                                "parentNumber": 10,
                                                "number": 20,
                                                "visible": false,
                                                "children": []
                                            },
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Right",
                                                "parentNumber": 10,
                                                "number": 21,
                                                "visible": false,
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "text": " PoorerHousehold=1 2547 319.13780 0.8311204 *",
                        "circumstance": "PoorerHousehold"
                    },
                    {
                        "isRoot": false,
                        "level": 1,
                        "location": "Right",
                        "parentNumber": 1,
                        "number": 3,
                        "caption": "TOP 60",
                        "size": "61%",
                        "attainment": "88%",
                        "visible": true,
                        "children": [
                            {
                                "isRoot": false,
                                "level": 2,
                                "location": "Left",
                                "parentNumber": 3,
                                "number": 6,
                                "caption": "MALE",
                                "size": "29%",
                                "attainment": "83%",
                                "visible": true,
                                "children": [
                                    {
                                        "isRoot": false,
                                        "level": 3,
                                        "location": "Left",
                                        "parentNumber": 6,
                                        "number": 12,
                                        "visible": false,
                                        "children": [
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Left",
                                                "parentNumber": 12,
                                                "number": 24,
                                                "children": []
                                            },
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Right",
                                                "parentNumber": 12,
                                                "number": 25,
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "isRoot": false,
                                        "level": 3,
                                        "location": "Right",
                                        "parentNumber": 6,
                                        "number": 13,
                                        "visible": false,
                                        "children": [
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Left",
                                                "parentNumber": 13,
                                                "number": 26,
                                                "children": []
                                            },
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Right",
                                                "parentNumber": 13,
                                                "number": 27,
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "isRoot": false,
                                "level": 2,
                                "location": "Right",
                                "parentNumber": 3,
                                "caption": "FEMALE",
                                "size": "32%",
                                "attainment": "93%",
                                "color": "green",
                                "visible": true,
                                "number": 7,
                                "children": [
                                    {
                                        "isRoot": false,
                                        "level": 3,
                                        "location": "Left",
                                        "parentNumber": 7,
                                        "number": 14,
                                        "visible": false,
                                        "children": [
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Left",
                                                "parentNumber": 14,
                                                "number": 28,
                                                "visible": true,
                                                "children": []
                                            },
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Right",
                                                "parentNumber": 14,
                                                "number": 29,
                                                "visible": true,
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "isRoot": false,
                                        "level": 3,
                                        "location": "Right",
                                        "parentNumber": 7,
                                        "number": 15,
                                        "visible": false,
                                        "children": [
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Left",
                                                "parentNumber": 15,
                                                "number": 30,
                                                "visible": false,
                                                "children": []
                                            },
                                            {
                                                "isRoot": false,
                                                "level": 4,
                                                "location": "Right",
                                                "parentNumber": 15,
                                                "number": 31,
                                                "visible": false,
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "text": " PoorerHousehold=0 3433  30.34204 0.9917452 *",
                        "circumstance": "PoorerHousehold"
                    }
                ],
                "text": " root 5980 385.83780 0.9306723"
            },
            "lastupdated": [
                "2018-07-01T12:48:56.479Z"
            ]
        };


        this.fnInitTree(treeData);
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
        return (
            <div className="tree m-t-64" id="courseTree"
                 style={{display: "flex", height: "100%", width: "100%", overflowX:"auto"}}>
                <div id="tooltip-container"></div>
            </div>
        );
    }
}