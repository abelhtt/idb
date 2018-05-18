import React, {
    Component
} from 'react';
import '../css/App.css';
import NavigationBar from './NavigationBar.js';
import Router from './Router.js';

class App extends Component {

    render() {
        return (
          <div>
              <NavigationBar/>
              <Router/>
      		</div>
        );
    }
}

export default App;
