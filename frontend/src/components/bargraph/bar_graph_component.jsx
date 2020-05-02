import * as d3 from 'd3';
import { connect } from 'react-redux';

import React from 'react';
import "./bar_graph_component.css"

import { useSelector } from 'react-redux'
import {transactionSelector} from './transaction_selectors';



export const BarGraph =()=>{
        let data = useSelector(transactionSelector)
        console.log(data)



        var margin = {top: 35, right: 35, bottom: 25, left: 35};

        var width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
                

        const svg = d3.select('svg').attr('width', width+margin.left+margin.right)
        .attr('height', height+margin.top+margin.bottom);

        const xScale = d3.scaleTime()
                        .domain(data.map((val, index)=>index))
                        .range([0,width])

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
                    
       
        svg
            .selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class","bar")
            .style("transform", "scale(1,-1)")
            .attr("x",(value, index)=>xScale(index))
            .attr("y", -150)
            // .attr("width", xScale.bandwidth())
            .transition()
            .attr("fill", colorScale)
            .attr("height", value=> 150 - yScale(value))
    

    
      return (
        <React.Fragment>
            <div className='bar-graph-container'>
                <svg className="graph" />
            </div>
        </React.Fragment>
      )
      
    };
   
