import {
    select,
    csv,
    scaleLinear,
    scaleTime,
    extent,
    axisLeft,
    axisBottom,
    line,
    curveBasis
  } from 'd3';
  
  const svg = select('svg');
  
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  
  const render = data => {
    const title = 'A Week in San Francisco';
    
    const xValue = d => d.timestamp;
    const xAxisLabel = 'Time';
    
    const yValue = d => d.temperature;
    const circleRadius = 6;
    const yAxisLabel = 'Temperature';
    
    const margin = { top: 60, right: 40, bottom: 88, left: 105 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 80)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveBasis);
    
    g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data));
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);
  };
  
  csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
    .then(data => {
      data.forEach(d => {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
      });
      render(data);
    });



















    bar.append("rect")
    .attr("width", barWidth)
    .attr("height", function(v) {
      return actualHeight - yAxisScale(v[1]);
    })
    .attr("y", function(v) {
      return yAxisScale(v[1]);
    })
    .on("mouseover", function(d) {
      d3.select(this)
        .style("fill", "yellow");

      // chart.append("text")
      // .attr("x", actualWidth/ 2)
      // .attr("y", actualHeight / 2)
      // .attr("dy", ".35em")

      tooltip.style("opacity", 1)
        .attr("x", actualWidth / 2)
        .attr("y", actualHeight / 2)
        .attr("dy", ".71em")
      var months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
      var dt = new Date(d[0]);
      var dateVal = dt.getDate(); // don't really need this
      var monthVal = dt.getMonth();
      var yearVal = dt.getFullYear();
      var formattedDate = months[monthVal] +
        "-" + yearVal;
      tooltip.html("Date: " + formattedDate + ", GDP: $" + d[1] + " Billion");
    })
    .on("mouseout", function(d, i) {
      var oldFill = i % 2 ? "#e14588" : "#ef81ed";
      d3.select(this)
        .style("fill", oldFill);
      tooltip.style("opacity", 0);
    });
  var tooltip = d3.select("#graph")
    .append("div")
    .attr("class", 'tooltip')
    .style("z-index", "10")
    .style("opacity", 0)
    .text("a simple tooltip");

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + actualHeight + ")")
    .call(xAxis);

  chart.append("g")
    .call(yAxis)

  chart.append("g")
    .append("text")
    .attr("y", totalHeight - margin.bottom)
    .attr("dy", ".71em")
    .style("font-size", "10px")
    .text("Years");
