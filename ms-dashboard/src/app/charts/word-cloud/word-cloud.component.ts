import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Cloud from 'd3-cloud';

@Component({
  selector: 'app-word-cloud',
  moduleId: module.id,
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {

    tabSelected = "Comments";
    commentsData = [
        { text: 'Taran', size: 40 },
        { text: 'Sahil', size: 15 },
        { text: 'Arpit', size: 25 },
        { text: 'Kaybee', size: 25 },
        { text: 'AngularJS', size: 30 },
        { text: 'Ruby', size: 30 },
        { text: 'ECMAScript', size: 15 },
        { text: 'Actionscript', size: 10 },
        { text: 'Linux', size: 20 },
        { text: 'C++', size: 20 },
        { text: 'C#', size: 25 },
        { text: 'JAVA', size: 38 },
        { text: 'javascript', size: 40 },
        { text: 'D3.js', size: 15 },
        { text: 'coffeescript', size: 25 },
        { text: 'shaving sheep', size: 25 },
        { text: 'AngularJS', size: 30 },
        { text: 'Ruby', size: 30 },
        { text: 'ECMAScript', size: 15 },
        { text: 'Actionscript', size: 10 },
        { text: 'Linux', size: 20 },
        { text: 'C++', size: 20 },
        { text: 'C#', size: 25 },
        { text: 'JAVA', size: 38 }]

    postsData = [
        { text: 'javascript', size: 40 },
        { text: 'D3.js', size: 15 },
        { text: 'coffeescript', size: 25 },
        { text: 'shaving sheep', size: 25 },
        { text: 'AngularJS', size: 30 },
        { text: 'Ruby', size: 30 },
        { text: 'ECMAScript', size: 15 },
        { text: 'Actionscript', size: 10 },
        { text: 'Linux', size: 20 },
        { text: 'C++', size: 20 },
        { text: 'C#', size: 25 },
        { text: 'JAVA', size: 38 },
        { text: 'javascript', size: 40 },
        { text: 'D3.js', size: 15 },
        { text: 'coffeescript', size: 25 },
        { text: 'shaving sheep', size: 25 },
        { text: 'AngularJS', size: 30 },
        { text: 'Ruby', size: 30 },
        { text: 'ECMAScript', size: 15 },
        { text: 'Actionscript', size: 10 },
        { text: 'Linux', size: 20 },
        { text: 'C++', size: 20 },
        { text: 'C#', size: 25 },
        { text: 'JAVA', size: 38 }]

    constructor() { }

    ngOnInit() {
        this.createWordCloud(this.commentsData);
    }

    toggleTo(){
        console.log(this.tabSelected);
        d3.select("svg").remove();  

        if(this.tabSelected === "Posts")
            this.createWordCloud(this.postsData)
        else
           this.createWordCloud(this.commentsData)
    }

    createWordCloud(data){
        const randomAngle = () => {
            return Math.random() < 0.5 ? 0 : 90;
          }
    
    
        const drawSkillCloud = (words) => {
                d3.select('#cloud').append('svg')
                .append('g')
                .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                .selectAll('text')
                .data(words)
                .enter().append('text')
                .style('font-size', function(d) {
                    return d.size + 'px';
                })
                .style('-webkit-touch-callout', 'none')
                .style('-webkit-user-select', 'none')
                .style('-khtml-user-select', 'none')
                .style('-moz-user-select', 'none')
                .style('-ms-user-select', 'none')
                .style('user-select', 'none')
                .style('cursor', 'default')
                .style('font-family', 'Impact')
                .style('fill', function(d, i) {
                    return fill(i);
                })
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                    return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                })
                .text(function(d) {
                    return d.text;
                });
            }
    
    
        const width = 350;
        const height = 350;
        // const fill = d3.scale.category20();
        const fill = d3.scaleOrdinal()
        .domain([0, 1])
        .range(['#6bd098', '#f17e5d']);
    
        d3Cloud()
        .size([width, height])
        .words(data)
        .rotate(function() {
            return randomAngle();
        })
        .font('Impact')
        .fontSize(function(d) {
            return d.size;
        })
        .on('end', drawSkillCloud)
        .start();
    
        const svg = document.getElementsByTagName('svg')[0];
        const bbox = svg.getBBox();
        const viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(' ');
        svg.setAttribute('viewBox', viewBox);
    
    }
}
