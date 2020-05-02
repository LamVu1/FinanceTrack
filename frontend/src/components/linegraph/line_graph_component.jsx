// import rd3 from 'react-d3-library';
// import {node} from './test';
import * as d3 from 'd3';

import React from 'react';
import "./line_graph_component.css"

import { useSelector } from 'react-redux'
import {transactionSelector} from '../bargraph/transaction_selectors';

export const LineGraph =()=>{
    let data = useSelector(transactionSelector)
    
    let min = 0;
    

    data.sort((a,b)=>new Date(a.date) - new Date(b.date))
    
    let hash = {};
    for(let i of data){
        if(hash[i.date]){
            hash[i.date] = hash[i.date] + i.amount
        }else{
            hash[i.date] = i.amount
        }
    }

    let runningBalance = 0;


    data = Object.keys(hash).map(k => {
        runningBalance = runningBalance + hash[k]
        min = Math.min(min,runningBalance)
        return {date: new Date(k), amount: runningBalance}
    })

    var margin = {top: 35, right: 35, bottom: 25, left: 35};

    var width = 700 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
            
        const svg = d3.select('svg')
                      .attr('width', width+margin.left+margin.right)
                      .attr('height', height+margin.top+margin.bottom);

        svg.append('g')
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        const xValue = d =>{ return(d.date)}


        const yValue = d =>{return(d.amount)}    
      
        const xScale = d3.scaleTime()
                        .domain(d3.extent(data, function(d){
                            return d.date
                        }))
                        .range([60,width])

                        
        const yScale = d3.scaleLinear()
                        .domain([min, d3.max(data, function(d){
                            return d.amount
                        })])
                        .range([height-20,20]);     

                 
        //X axis
        const xAxis = d3.axisBottom(xScale);    
        svg.append("g").style("transform","translate(0px,"+  yScale(0)+ 'px)').call(xAxis)
        
        //Y axis
        const yAxis = d3.axisLeft(yScale);
        svg.append("g").style("transform","translate(60px,0px)").call(yAxis)


        //Title
        svg.append("g")
        .append("text")
        .attr("y", 20)
        .attr("x", width/2)
        .attr("dy", ".71em")
        .style("font-size", "10px")
        .text("Balance");

        //X Label
        svg.append("g")
        .append("text")
        .attr("y", 560)
        .attr("x", width/2)
        .attr("dy", ".71em")
        .style("font-size", "10px")
        .text("Date");
 
        //Y Label
        svg.append("g")
        .append("text")
        .attr("dy", ".71em")
        .style("font-size", "10px")
        .attr( "transform", "translate(20,300) rotate(-90)")
        .text("Balance Amount in Dollars");


       



        //Grid Lines
        function make_x_gridlines() {		
            return d3.axisBottom(xScale)
                .ticks(5)
        }
        
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

        svg.append("g")			
            .attr("class", "grid")
            .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )



        //Line
        const myLine = d3.line()
                .x(data=> {
                   return xScale(xValue(data))})
                .y(data=> {
                   return yScale(yValue(data))
                })
                // .curve(d3.curveCardinal); 
    
        svg.selectAll(".line")
            .data(data)
            .join("path")
            .attr("class","line")
            .attr("d", myLine(data))
            .attr("fill","none")
            .attr("stroke", "#896ccc")


        //Tooltip
        const Tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("visibility", "hidden")

        let mouseover = function(d) { Tooltip.style("visibility", "visible")}            

        let mousemove = function(d) {
            Tooltip.html("Date: " + d.date.toLocaleDateString('en-US', {month: '2-digit', day:'2-digit', year:'2-digit'}) + "<br />" +"Balance Amount: $" + d.amount)
                .style("left",d3.event.pageX + "px")
                .style("top", d3.event.pageY+"px")
        }

        let mouseleave = function(d) { Tooltip.style("visibility", "hidden")}


        //Data points
        svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter().append("circle")								
        .attr("class", "myCircle")
            .attr("cx", function(data) { return  xScale(xValue(data)) } )
            .attr("cy", function(data) { return yScale(yValue(data)) } )
            .attr("r", 5)
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 3)
            .attr("fill", "white")    
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)



      return (
        <React.Fragment>
            <div className='line-graph-container'>
                <svg   className="graph" />
            </div>
        </React.Fragment>
      )
      
    };
    
