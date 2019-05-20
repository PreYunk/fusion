import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import HomeScreen from './containers/HomeScreen/HomeScreen';
import StartPage from './containers/StartPage/StartPage';
import AddQuestion from './containers/AddQuestion/AddQuestion';
import ViewQuestion from './containers/ViewQuestion/ViewQuestion';
import GeneratePaper from './containers/GeneratePaper/GeneratePaper';
import SelectQuestions from './containers/SelectQuestions/SelectQuestions';
import GeneratedPage from './containers/GeneratedPage/GeneratedPage';

class App extends Component {
    render() {

        //MY ROUTES ARE MANAGED HERE
        return (
            <div>
                <Route path="/start/generate/select" component={SelectQuestions}/>
                <Route path="/start/generate" exact component={GeneratePaper}/>
                <Route path="/start/add" component={AddQuestion}/>
                <Route path="/start/view" component={ViewQuestion} />
                <Route path="/start" exact component={StartPage}/>
                <Route path="/gen" component={GeneratedPage}/>
                <Route path="/" exact component={HomeScreen}/>
            </div>
        );
    }
}

export default App;
