import {Route, Switch} from "react-router";
import Home from "./component/Home";
import {BrowserRouter} from "react-router-dom";
import NotFound from "./component/error/NotFound";
import KnightTour from "./games/KnightTour/KnightTour";
import React from "react";
import Sudoku from "./games/Sudoku/Sudoku";
import {Provider} from "react-redux";
import store from "./store/store";
import Ton from "./games/ton/Ton";
import NPuzzle from "./games/NPuzzle/NPuzzle";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route>
                    <Switch>
                        <Route exact path={"/"} component={Home}/>
                        <Route exact path={"/sudoku"} component={Sudoku}/>
                        <Route exact path={"/knight-tour"} component={KnightTour}/>
                        <Route exact path={"/ton"} component={Ton}/>
                        <Route exact path="/n-puzzle">
                            <NPuzzle gameId="n-puzzle"/>
                        </Route>
                        <Route path="/" component={NotFound}/>
                    </Switch>
                </Route>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
