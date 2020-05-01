import rd3 from 'react-d3-library';
import {node} from './test';
import * as d3 from 'd3';

import React, {useRef, useEffect, useState} from 'react';
import "./line_graph_component.css"

import { useSelector } from 'react-redux'
import {transactionSelector} from '../bargraph/transaction_selectors';

export const LineGraph =()=>{
    let data = useSelector(transactionSelector)
    
    let min = 0;
    let runningBalance3 = 0;

    data.sort((a,b)=>new Date(a.date) - new Date(b.date))

    data.forEach(d=>{
        d.amount = +d.amount;
        d.date = new Date(d.date);
        runningBalance3+=d.amount;
        min = Math.min(min, runningBalance3);
    })

    let runningBalance = 0;
    let runningBalance2 = 0;


    var margin = {top: 35, right: 35, bottom: 25, left: 35};

    var width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    
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
        const svg = d3.select('svg').attr('width', width+margin.left+margin.right)
                    .attr('height', height+margin.top+margin.bottom);
                    svg.append('g')
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        const xValue = d =>{ 
            return(
            (d.date)
            )}


        const yValue = d =>{

            return(
                runningBalance+= d.amount

            )
        }    
        // const yValue = d => {
        //     return(
        //     +d.amount)};


        //X axis
        const xScale = d3.scaleTime()
                        .domain(d3.extent(data, function(d){return d.date}))
                        .range([60,width])

                // svg.append("g").attr("transform", "translate(0,"+'500px'+")").call(d3.axisBottom(xScale));

        const xAxis = d3.axisBottom(xScale)
        // .ticks(data.length).tickFormat(index=>index+1)
       
        
        
        
        
        //Y axis
        const yScale = d3.scaleLinear()
        .domain([min, d3.max(data, function(d){return runningBalance2+=d.amount})])
        .range([height-20,20]);
        

        // console.log(yScale(0))


        svg.select(".x-axis").style("transform","translate(0px,"+  yScale(0)+ 'px)').call(xAxis);

        

        const yAxis = d3.axisLeft(yScale);

        svg.select(".y-axis").text('Amount').style("transform","translate(60px,0px)").call(yAxis);
     
        svg.append("g")
        .append("text")
        .attr("y", 560)
        .attr("x", width/2)
        .attr("dy", ".71em")
        .style("font-size", "10px")
        .text("Date");


        svg.append("g")
        .append("text")
        .attr("y", 20)
        .attr("x", width/2)
        .attr("dy", ".71em")
        .style("font-size", "10px")
        .text("Balance");

        // .attr("y", height/2)
        // .attr("x", width/2)

        svg.append("g")
        .append("text")
        .attr("dy", ".71em")
        .style("font-size", "10px")
        .attr( "transform", "translate(20,300) rotate(-90)")
        .text("Balance Amount in Dollars");

        //Line
        const myLine = d3.line()
                .x(data=> 
                    xScale(xValue(data)))
                .y(data=> 
                    yScale(yValue(data)))
                // .curve(d3.curveCardinal); 
    
        svg.selectAll(".line")
            .data(data)
            .join("path")
            .attr("class","line")
            .attr("d", myLine(data))
            .attr("fill","none")
            .attr("stroke", "#896ccc")
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


