import rd3 from 'react-d3-library';
import {node} from './test';
import * as d3 from 'd3';

import React, {useRef, useEffect, useState} from 'react';
import "./line_graph_component.css"

import { useSelector } from 'react-redux'
import {transactionSelector} from '../bargraph/transaction_selectors';
// [25,30,45,60,28,75]
export const LineGraph =()=>{
    let data = useSelector(transactionSelector)
    
    

    data.forEach(d=>{
d.amount = +d.amount;
d.date = new Date(d.date)
    })

    data.sort((a,b)=>new Date(a.date) - new Date(b.date))
    var margin = {top: 25, right: 25, bottom: 25, left: 25};

    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // var svg = d3.select(element[0])
    //             .append('svg')
    //             
    // var x = d3.scale.linear()
    //     .range([0, width]);
    
    // var y = d3.scale.linear()
    //     .range([height, 0]);
    

    // const svgRef = useRef();
    // useEffect(()=>{
        // console.log(data)
        const svg = d3.select('svg').attr('width', width+margin)
                    .attr('height', height+margin);
                    svg.append('g')
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        const xValue = d =>{ 
            return(
            new Date(d.date)
            )}
        // const yValue = d => {
        //     return(
        //     +d.amount)};


        //X axis
        const xScale = d3.scaleTime()
                        .domain(d3.extent(data, function(d){return d.date}))
                        .range([0,width])

                // svg.append("g").attr("transform", "translate(0,"+'500px'+")").call(d3.axisBottom(xScale));

        const xAxis = d3.axisBottom(xScale)
        // .ticks(data.length).tickFormat(index=>index+1)
       
        svg.select(".x-axis").style("transform","translate(60px,520px)").call(xAxis);

        
        //Y axis
        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return +d.amount})])
        .range([height,0]);

        const yAxis = d3.axisLeft(yScale);

        svg.select(".y-axis").text('Amount').style("transform","translate(60px,20px)").call(yAxis);
                    

        //Line
        const myLine = d3.line()
                .x(data=> 
                    xScale(xValue(data)))
                .y(data=> 
                    yScale(data.amount))
                // .curve(d3.curveCardinal); 
    
        svg.selectAll(".line")
            .data(data)
            .join("path")
            .attr("class","line")
            .attr("d", myLine(data))
            .attr("fill","none")
            .attr("stroke", "blue")
    // }, [data]);

    // ref={svgRef}
      return (
        <React.Fragment>
            <div className='line-graph-container'>
            <svg className="graph" >
                <g className="x-axis"/>
                <g className="y-axis"/>
            </svg>
            <br/>
            </div>
        </React.Fragment>
      )
      
    };
    // <button onClick={()=>setData(data.map(value=>value+5))}>Update Date</button>
    // <button onClick={()=>setData(data.filter(value=>value<35))}>Filter Date</button>


