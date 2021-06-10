import React, {Component, Fragment, useState} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {render} from "react-dom";
import Navbar from "./components/layout/Navbar";
import PropTypes from 'prop-types'
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import GitHubState from './context/github/GitHubState'

const App = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)


    // async componentDidMount() {
    //      //דיד מאונט היא קומפונטטה שרצה ישר כשטוענים את הדף . כאן היא מביאה את כל המידע מAPI
    //      this.setState({loading:true})
    //     const res = await axios.get(`https://api.github.com/users?
    //     client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //     this.setState({users:res.data,loading:false})
    //  }

    const searchUsers = async (text) => {
        //הפונקציה הזאת מקבלת את הטקסט דרך הפרופס שההעביר לה הקומפננטה של ה SEARCH
        setLoading(true)
        const res = await axios.get(`https://api.github.com/search/users?q=${text}
        &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
       &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        setUsers(res.data.items);
        setLoading(false);
    }

    const getUser = async (userName) => {
        //מקבל מהפרופס שם של יוזר ומביא את המידע עליו
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${userName}?
        &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
       &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUser(res.data);
        setLoading(false);
    }

    const getUsersRepo = async (userName) => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc
        &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
       &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setRepos(res.data)
        setLoading(false);
    }

    const clearUsers = () => {
        //בלחיצה על CLEAR בקומפננטה SEARCH היא מעבירה פרופס של און קליק
        // שמפעיל את הפוקנציה הזאת והיא פשוט מאפסת את הסטייט
        setUsers([]);
        setLoading(false);
    }
    const showAlert = (msg, type) => {
        //נכנס לסטייט של ALERT
        setAlert(msg, type)
        //מאפס את ההודעה של ALERT תוך 3 שניות
        setTimeout(() => setAlert(null), 3000)

    }

    return (
        <GitHubState>


            <Router>
                <div className="App">
                    <Navbar/>
                    <div className="container">
                        <Alert alert={alert}/>
                        <Switch>
                            <Route exact path={'/'} render={props => (
                                <Fragment>
                                    <Search searchUsers={searchUsers}
                                            clearUsers={clearUsers}
                                            showClear={users.length > 0 ? true : false}
                                            showAlert={showAlert}/>

                                    <Users loading={loading} users={users}/>
                                </Fragment>
                            )}>
                            </Route>

                            <Route exact path={'/about'} component={About}>
                            </Route>

                            <Route exact path='/user/:login' render={props => (
                                <User {...props}
                                      getUser={getUser}
                                      getUsersRepo={getUsersRepo}
                                      user={user}
                                      repos={repos}
                                      loading={loading}/>
                            )}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </GitHubState>
    );

}

export default App;
