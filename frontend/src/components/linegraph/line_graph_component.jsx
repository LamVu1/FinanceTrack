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
    let runningBalance4 = 0;

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
    
    

    // const svgRef = useRef();
    // useEffect(()=>{
        // console.log(data)
        
        const svg = d3.select('svg').attr('width', width+margin.left+margin.right)
        .attr('height', height+margin.top+margin.bottom);
        svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.selectAll("*").remove();

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

        const xAxis = d3.axisBottom(xScale)
       
        
        
        
        
        //Y axis
        const yScale = d3.scaleLinear()
        .domain([min, d3.max(data, function(d){return runningBalance2+=d.amount})])
        .range([height-20,20]);
        

        svg.append("g").style("transform","translate(0px,"+  yScale(0)+ 'px)').call(xAxis)


        // svg.select(".x-axis").style("transform","translate(0px,"+  yScale(0)+ 'px)').call(xAxis);

        

        const yAxis = d3.axisLeft(yScale);



        svg.append("g").style("transform","translate(60px,0px)").call(yAxis)


        // svg.select(".y-axis").text('Amount').style("transform","translate(60px,0px)").call(yAxis);
     
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

  

        svg.append("g")
        .append("text")
        .attr("dy", ".71em")
        .style("font-size", "10px")
        .attr( "transform", "translate(20,300) rotate(-90)")
        .text("Balance Amount in Dollars");
//         const Tooltip = d3.select(".line-graph-container").append("span")

        // const Tooltip = d3.select(".line-graph-container").append("span")
        // .style("opacity", 0)
        // .attr("class", "tooltip")
        // .style("background-color", "white")
        // .style("border", "solid")

        const Tooltip = d3.select("body")
                    .append("div")
                    .style("position", "absolute")
                    .attr("class", "tooltip")
                    .style("z-index", "10")
                    .style("visibility", "hidden")
                    // .text("a simple tooltip");
       
        let mouseover = function(d) {
            Tooltip
              .style("visibility", "visible")
          }
       
        let mousemove = function(d) {
          
            Tooltip
              .html("Date: " + d.date.toLocaleDateString('en-US', {month: '2-digit', day:'2-digit', year:'2-digit'}) + "<br />" +"Balance Amount: $" + d.amount)
              .style("right",width - d3.mouse(this)[0] -30 + "px")
              .style("bottom", height - d3.mouse(this)[1] +200+ "px")
            }
            
        let mouseleave = function(d) {
            Tooltip
              .style("visibility", "hidden")
          }




        function make_x_gridlines() {		
            return d3.axisBottom(xScale)
                .ticks(5)
        }
        
        // gridlines in y axis function
        function make_y_gridlines() {		
            return d3.axisLeft(yScale)
                .ticks(5)
        }
          

        svg.append("g")			
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )

        // add the Y gridlines
        svg.append("g")			
            .attr("class", "grid")
            .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )



        // //Line
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


            const tValue = d =>{

                return(
                    runningBalance4+= d.amount
    
                )
            }    


        svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter().append("circle")								
        .attr("class", "myCircle")
            .attr("cx", function(data) { return  xScale(xValue(data)) } )
            .attr("cy", function(data) { return yScale(tValue(data)) } )
            .attr("r", 5)
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 3)
            .attr("fill", "white")    
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)



    // }, [data]);







    // ref={svgRef}
      return (
        <React.Fragment>
            <div className='line-graph-container'>
            <svg className="graph" />
            <br/>
            </div>
        </React.Fragment>
      )
      
    };
    
    // <g className="x-axis"/>
    // <g className="y-axis"/>