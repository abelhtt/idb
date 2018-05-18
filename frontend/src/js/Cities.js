import React, {
    Component
} from 'react';
import {
    Grid,
    Row,
    Col,
    Pagination,
    Button,
    ButtonToolbar,
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import Card from './Card.js';
import '../css/Flex.css';
import {
    RingLoader
} from 'react-spinners';

class Cities extends Component {

    /* Use following url for default image: http://bit.ly/2CYI94d
	Grid automatically creates new rows for additional card components. */

    constructor() {
        super();
        this.state = {
            cities: [],
            pages: [],
            page: 1,
            loading: true,
            sort: "name",
            order: "Asc",
            state: "None",
            pageCount: 0
        };

    }

    changePage(num) {
        let active = num;
        let items = [];

        items.push(<Pagination.First onClick={this.changePage.bind(this, 1)} key="first"/>);
        if (num > 1) {
            items.push(<Pagination.Prev onClick={this.changePage.bind(this, num - 1)} key="prev"/>);
        } else {
            items.push(<Pagination.Prev disabled key="prev"/>);
        }

        let start = 0;
        let end = 0;


        if (this.state.pageCount < 10) {
            start = 1;
            end = this.state.pageCount;
        } else if ((num - 5) < 1) {
            start = 1;
            end = 10;
        } else if ((num + 5) > this.state.pageCount) {
            start = this.state.pageCount - 9;
            end = this.state.pageCount;
        } else {
            start = num - 5;
            end = num + 4;
        }

        for (let number = start; number <= end; number++) {
            items.push(
                <Pagination.Item active={number === active}
								 onClick={this.changePage.bind(this, number)}key={number}>{number}
				</Pagination.Item>
            );
        }

        if (num < this.state.pageCount) {
            items.push(<Pagination.Next onClick={this.changePage.bind(this, num + 1)}
              key="next"/>);
        } else {
            items.push(<Pagination.Next disabled key="next"/>);
        }
        items.push(<Pagination.Last onClick={this.changePage.bind(this, this.state.pageCount)}
          key="last"/>);
        this.setState({
            page: num,
            pages: items
        });

    }

    updateData(link) {
        fetch(link)
            .then(results => {
                return results.json();
            }).then(data => {
                let cities = data.records.map((city) => {
                    let population_prop = city.population;
                    if (population_prop === null) {
                        population_prop = "Population: data unavailable"
                    } else {
                        population_prop = "Population: " +
                          population_prop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    return (
                      <Card name={city.city_name}
                            model='cities'
							              domain={city.city_image_link}
                            id={city.id}
							              field = {population_prop}
                            key={city.id}>
					            </Card>)
                })
                this.setState({
                    pageCount: Math.ceil(cities.length / 20)
                });

                let active = 1;
                let items = [];
                if (this.state.pageCount > 1) {
                    items.push(<Pagination.First onClick={this.changePage.bind(this, 1)}
                      key="first"/>);
                    items.push(<Pagination.Prev disabled key="prev"/>);
                    for (let number = 1; number <= Math.min(10, this.state.pageCount); number++) {
                        items.push(
                            <Pagination.Item active={number === active}
										onClick={this.changePage.bind(this, number)}
										key={number}>{number}</Pagination.Item>
                        );
                    }
                    items.push(<Pagination.Next onClick={this.changePage.bind(this, 2)} key="next"/>);
                    items.push(<Pagination.Last onClick={this.changePage.bind(this, this.state.pageCount)}
                      key="last"/>);
                }

                this.setState({
                    pages: items,
                    page: 1,
                    cities: cities,
                    loading: false
                });
            })
    }

    changeSort(sort) {
        this.setState({
            sort: sort
        });
        this.updateData('http://api.majorpotential.me/cities_limited?sort_' + sort + '='
          + this.state.order + "&state=" + this.state.state)
    }

    changeOrder(order) {
        this.setState({
            order: order
        });
        this.updateData('http://api.majorpotential.me/cities_limited?sort_' + this.state.sort + '='
          + order + "&state=" + this.state.state)
    }

    changeState(state) {
        this.setState({
            state: state
        });
        this.updateData('http://api.majorpotential.me/cities_limited?sort_' + this.state.sort + '='
          + this.state.order + "&state=" + state)
    }



    createStates() {
        let state = [
            ["Alabama", "AL"],
            ["Alaska", "AK"],
            ["Arizona", "AZ"],
            ["Arkansas", "AR"],
            ["California", "CA"],
            ["Colorado", "CO"],
            ["Connecticut", "CT"],
            ["Delaware", "DE"],
            ["Florida", "FL"],
            ["Georgia", "GA"],
            ["Hawaii", "HI"],
            ["Idaho", "ID"],
            ["Illinois", "IL"],
            ["Indiana", "IN"],
            ["Iowa", "IA"],
            ["Kansas", "KS"],
            ["Kentucky", "KY"],
            ["Louisiana", "LA"],
            ["Maine", "ME"],
            ["Maryland", "MD"],
            ["Massachusetts", "MA"],
            ["Michigan", "MI"],
            ["Minnesota", "MN"],
            ["Missouri", "MO"],
            ["Montana", "MT"],
            ["Nebraska", "NE"],
            ["Nevada", "NV"],
            ["New Hampshire", "NH"],
            ["New Jersey", "NJ"],
            ["New Mexico", "NM"],
            ["New York", "NY"],
            ["North Carolina", "NC"],
            ["North Dakota", "ND"],
            ["Ohio", "OH"],
            ["Oklahoma", "OK"],
            ["Oregon", "OR"],
            ["Pennsylvania", "PA"],
            ["Rhode Island", "RI"],
            ["South Carolina", "SC"],
            ["South Dakota", "SD"],
            ["Tennessee", "TN"],
            ["Texas", "TX"],
            ["Utah", "UT"],
            ["Vermont", "VT"],
            ["Washington", "WA"],
            ["West Virginia", "WV"],
            ["Wisconsin", "WI"],
            ["Wyoming", "WY"],
            ["Puerto Rico", "PR"],
            ["District of Columbia", "DC"]
        ]
        let items = []
        for (let i = 0; i < state.length; i++) {
            items.push(<MenuItem eventKey={i}
			  				   onClick={this.changeState.bind(this, state[i][1])}
							   key={i}>{state[i][0]}
					</MenuItem>);
        }
        return items
    }

    resetSortFilter() {
        this.setState({
            sort: "name",
            order: "Asc",
            state: "None"
        });
        this.updateData('http://api.majorpotential.me/cities_limited?sort_name=Asc&state=None')
    }


    componentDidMount() {
        this.updateData('http://api.majorpotential.me/cities_limited?sort_' + this.state.sort +
          '=' + this.state.order + "&state=" + this.state.state)
    }

    render() {

        if (this.state.loading === true) {
            return <Grid><Row className="spin"><RingLoader
         color={'#123abc'}
         loading={this.state.loading}
         size={100}

       /> </Row></Grid>;
        }

        let display = []
        for (let i = 0; i < 20; i++) {
            display[i] = this.state.cities[((this.state.page - 1) * 20) + i]
        }

        return (
            <div>
		<Row>
			<Col xs={4}></Col>
			<Col xs	={6}>
			<ButtonToolbar>
				<DropdownButton title="Sort by" id="sort">
					<MenuItem eventKey="1" onClick={this.changeSort.bind(this, "name")}>Name</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeSort.bind(this, "pop")}>Population</MenuItem>
				</DropdownButton>
				<DropdownButton title="Order" id="order">
					<MenuItem eventKey="1" onClick={this.changeOrder.bind(this, "Asc")}>Ascending</MenuItem>
					<MenuItem eventKey="2" onClick={this.changeOrder.bind(this, "Desc")}>Descending</MenuItem>
				</DropdownButton>
				<DropdownButton title="Filter by State" id="state">
					<MenuItem eventKey="1" onClick={this.changeState.bind(this, "None")}>None</MenuItem>
					{this.createStates()}
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

export default Cities;
