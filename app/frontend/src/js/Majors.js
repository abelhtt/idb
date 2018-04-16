import React, { Component } from 'react';
import {Image, Grid, Row, Col, Thumbnail, Button, Pagination, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Card from './Card.js';
import '../css/Flex.css';
import { RingLoader } from 'react-spinners';

{/* Use following url for default image: http://bit.ly/2CYI94d */}
{/* Grid automatically creates new rows for additional card components. */}

class Majors extends Component {
  constructor() {
    super();
    this.state = {
		majors: [],
        pages: [],
        page: 1,
        loading: true,
        sort: "name",
        order: "Asc",
        stem: "None",
        wage: "None"
	};
  }

  changePage(num) {
	  let active = num;
	  let items = [];

	  items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
	  if (num > 1) {
		items.push(<Pagination.Prev onClick={this.changePage.bind(this, num - 1)}/>);
	  }
	  else {
		  items.push(<Pagination.Prev disabled/>);
	  }

	  let start = 0;
	  let end   = 0;
	  

	  if (this.state.pageCount < 10) {
	  	start = 1;
	  	end = this.state.pageCount;
	  }
	  else if ((num - 5) < 1) {
	  	start = 1;
	  	end = 10;
	  }
	  else if ((num + 5) > this.state.pageCount) {
	  	start = this.state.pageCount - 9;
	  	end = this.state.pageCount;
	  }
	  else  {
	  	start = num - 5;
	  	end = num + 4;
	  }

	  for (let number = start; number <= end; number++) {
		items.push(
			<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
		);
	  }

	  if (num < this.state.pageCount) {
		items.push(<Pagination.Next onClick={this.changePage.bind(this, num + 1)}/>);
	  }
	  else {
		  items.push(<Pagination.Next disabled/>);
	  }
	  items.push(<Pagination.Last onClick={this.changePage.bind(this, this.state.pageCount)}/>);

	  this.setState({page: num,
					 pages: items});

  }

  updateData(link) {
  	  fetch(link)
	  .then(results => {
		  return results.json();
		}).then(data => {
			let majors = data.records.map((major) => {
                let average_wage = "Average Wage: $" + major.average_wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return(<Card name={major.name} model='majors' domain={major.image_link} id={major.id} field={average_wage}>  </Card>)
			})
			let active = 1;
			let items = [];
			this.setState({pageCount: Math.ceil(majors.length/20)});
			if (this.state.pageCount > 1) {
				items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}/>);
				items.push(<Pagination.Prev disabled/>);
				for (let number = 1; number <= Math.min(10, this.state.pageCount); number++) {
					items.push(
						<Pagination.Item active={number === active} onClick={this.changePage.bind(this, number)}>{number}</Pagination.Item>
					);
				}
				items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)}/>);
				items.push(<Pagination.Last onClick={this.changePage.bind(this, this.state.pageCount)}/>);
			}
			this.setState({pages: items});
			this.setState({page: 1});
			this.setState({majors: majors});
            this.setState({loading: false});
		})
  }

  changeSort(sort) {
	  if (sort == "name") {
		  this.setState({sort: "name"});
	  }
	  else if (sort == "wage") {
		  this.setState({sort: "wage"});
	  }
	  else {
		  this.setState({sort: "work"});
	  }
	  this.updateData('http://api.majorpotential.me/majors_limited?sort_'+sort+'='+this.state.order+"&is_stem="+this.state.stem+"&wage="+this.state.wage);
	  
  }

  changeOrder(order) {
	  if (order == "Asc") {
		  this.setState({order: "Asc"});
	  }
	  else {
		  this.setState({order: "Desc"});
	  }
	  this.updateData('http://api.majorpotential.me/majors_limited?sort_'+this.state.sort+'='+order+"&is_stem="+this.state.stem+"&wage="+this.state.wage);
	  
  }

  changeSTEM(stem) {
      this.setState({stem: stem});
	  this.updateData('http://api.majorpotential.me/majors_limited?sort_'+this.state.sort+'='+this.state.order+"&is_stem="+stem+"&wage="+this.state.wage);
	  
  }



  resetSortFilter() {
	  this.setState({
        sort: "name",
        order: "Asc",
        stem: "None",
        wage: "None"
	});
	  this.updateData('http://api.majorpotential.me/majors_limited?sort_name=Asc&is_stem=None&wage=None');
	  
  }

  componentDidMount() {
	  this.updateData('http://api.majorpotential.me/majors_limited?sort_'+this.state.sort+'='+this.state.order+"&is_stem="+this.state.stem+"&wage="+this.state.wage);
  }

  render() {

  if (this.state.loading == true){
     return <Grid><Row className="spin"><RingLoader
         color={'#123abc'}
         loading={this.state.loading}
         size="100"

       /> </Row></Grid>;
   }

	let display = []
	for (let i = 0; i < 20; i++) {
		display[i] = this.state.majors[((this.state.page - 1) * 20) + i]
	}

    return (
		<div>
		<Row>
			<Col xs={4}></Col>
			<Col xs	={6}>
			<ButtonToolbar>
				<DropdownButton title="Sort by">
					<MenuItem eventKey="1" onClick={this.changeSort.bind(this, "name")}>Name</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeSort.bind(this, "wage")}>Average Wage</MenuItem>
					<MenuItem eventKey="3" onClick={this.changeSort.bind(this, "work")}>Workforce</MenuItem>
				</DropdownButton>
				<DropdownButton title="Order">
					<MenuItem eventKey="1" onClick={this.changeOrder.bind(this, "Asc")}>Ascending</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeOrder.bind(this, "Desc")}>Descending</MenuItem>
				</DropdownButton>
				<DropdownButton title="Filter by STEM">
					<MenuItem eventKey="1" onClick={this.changeSTEM.bind(this, "None")}>None</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeSTEM.bind(this, "yes")}>STEM</MenuItem>
					<MenuItem eventKey="3" onClick={this.changeSTEM.bind(this, "no")}>Non-STEM</MenuItem>
				</DropdownButton>
				<Button onClick={this.resetSortFilter.bind(this)}>
					Reset
				</Button>
			</ButtonToolbar>
			</Col>
		</Row>
		<Grid><Row className="flex-row">{display}</Row></Grid>
		<center><Pagination bsSize="large">{this.state.pages}</Pagination></center>
		</div>
		)
  }
}

export default Majors;
