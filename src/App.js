import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import HomeScreen from './containers/HomeScreen/HomeScreen';
import StartPage from './containers/StartPage/StartPage';
import AddQuestion from './containers/AddQuestion/AddQuestion';

class App extends Component {
    render() {

        //MY ROUTES ARE MANAGED HERE
        return (
            <div>
                <Route path="/start/add" component={AddQuestion}/>
                <Route path="/start" exact component={StartPage}/>
                <Route path="/" exact component={HomeScreen}/>
            </div>
        );
    }
}

export default App;
