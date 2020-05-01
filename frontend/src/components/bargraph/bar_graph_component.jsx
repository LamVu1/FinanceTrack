import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import React, {useRef, useEffect, useState} from 'react';
import "./bar_graph_component.css"

import { useSelector } from 'react-redux'
import {transactionSelector} from './transaction_selectors';



    const BarGraph =()=>{
        let test = useSelector(transactionSelector)
        // console.log(test)
        // const test = this.props.test;
    const [data, setData] = useState(test)
    const svgRef = useRef();
    useEffect(()=>{
        const svg = d3.select(svgRef.current);

        const xScale = d3.scaleBand()
                        .domain(data.map((val, index)=>index))
                        .range([0,800])
                        .padding(0.5)

        const xAxis = d3.axisBottom(xScale).ticks(data.length)
       
        svg.select(".x-axis").style("transform","translateY(145px)").call(xAxis);

        const colorScale = d3.scaleLinear()
        .domain([75,100,150])
        .range(["green","orange","red"])
        .clamp(true); 
        
        const yScale = d3.scaleLinear()
        .domain([0,150])
        .range([150,0]); 

        const yAxis = d3.axisLeft(yScale);

        svg.select(".y-axis").style("transform","translateX(20px)").call(yAxis);
                    
        // const myLine = d3.line()
        //         .x((value, index)=> xScale(index))
        //         .y(yScale)
        //         .curve(d3.curveCardinal); 
        // svg.selectAll("circle")
        // .data(data)
        // .join("circle")
        // .attr("r", value => value)
        // .attr("cx", value => value *2)
        // .attr("cy", value=>value*2)
        // .attr("stroke", "red")
        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class","bar")
            .style("transform", "scale(1,-1)")
            .attr("x",(value, index)=>xScale(index))
            .attr("y", -150)
            .attr("width", xScale.bandwidth())
            .transition()
            .attr("fill", colorScale)
            .attr("height", value=> 150 - yScale(value))
    }, [data]);

    
      return (
        <React.Fragment>
            <div className='bar-graph-container'>
            <svg className="graph" ref={svgRef}>
                <g className="x-axis"/>
                <g className="y-axis"/>
            </svg>
            </div>
        </React.Fragment>
      )
      
    };
    // <br/>
    // <button onClick={()=>setData(data.map(value=>value+5))}>Update Date</button>
    // <button onClick={()=>setData(data.filter(value=>value<35))}>Filter Date</button>


export default connect(null, null)(BarGraph);