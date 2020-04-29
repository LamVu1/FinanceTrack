import rd3 from 'react-d3-library';
import {node} from './test';
import * as d3 from 'd3';

import React, {useRef, useEffect, useState} from 'react';
import "./line_graph_component.css"

// const RD3Component = rd3.Component;


export const LineGraph =()=>{
    const [data, setData] = useState([25,30,45,60,28,75])
    const svgRef = useRef();
    useEffect(()=>{
        const svg = d3.select(svgRef.current);

        const xScale = d3.scaleLinear()
                        .domain([0, data.length-1])
                        .range([0,300]);

        const xAxis = d3.axisBottom(xScale).ticks(data.length).tickFormat(index=>index+1)
       
        svg.select(".x-axis").style("transform","translateY(100px)").call(xAxis);

        
        
        const yScale = d3.scaleLinear()
        .domain([0,75])
        .range([150,0]); 

        const yAxis = d3.axisLeft(yScale);

        svg.select(".y-axis").style("transform","translateX(20px)").call(yAxis);
                    
        const myLine = d3.line()
                .x((value, index)=> xScale(index))
                .y(yScale)
                .curve(d3.curveCardinal); 
        // svg.selectAll("circle")
        // .data(data)
        // .join("circle")
        // .attr("r", value => value)
        // .attr("cx", value => value *2)
        // .attr("cy", value=>value*2)
        // .attr("stroke", "red")
        svg.selectAll(".line")
            .data([data])
            .join("path")
            .attr("class","line")
            .attr("d", value => myLine(value))
            .attr("fill","none")
            .attr("stroke", "blue")
    }, [data]);

    
      return (
        <React.Fragment>
            <div className='line-graph-container'>
            <svg className="graph" ref={svgRef}>
                <g className="x-axis"/>
                <g className="y-axis"/>
            </svg>
            <br/>
            <button onClick={()=>setData(data.map(value=>value+5))}>Update Date</button>
            <button onClick={()=>setData(data.filter(value=>value<35))}>Filter Date</button>
            </div>
        </React.Fragment>
      )
    
  };


