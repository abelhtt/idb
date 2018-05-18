import React, {
    Component
} from 'react';
import {
    Image,
    Col,
    Thumbnail
} from 'react-bootstrap';
import {
    Link
} from 'react-router-dom';
import notFound from '../images/grad-0.jpg';

import '../css/instance.css'

const styles = {
  hyperlink: {
    textDecoration: 'none',
    color: 'black'
  }
};

class Card extends Component {

    /* default img src = https://goo.gl/NvPJj6 */

    render() {
        return (
        <Col xs={12} sm={4} md={4} lg={4}>
        <Link
         to={`/${this.props.model}/${this.props.id}`}
         style={styles.hyperlink}>
         <div>
           <div className='tile'>
             <img
               src={this.props.domain}
               style={{ justifyContent: 'center', width:"100%", height:"230px"}}
               alt={this.props.name}
               onError={(e)=>{e.target.src=notFound}}
             />
             <div >
               <h3 className='rep_info'>
                 {this.props.name}
               </h3>
               <h4 className='field'>
                 {this.props.field}
               </h4>
             </div>
           </div>
         </div>
       </Link>
       </Col>


        );
    }

}

export default Card;
