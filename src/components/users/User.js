import React, {Fragment, useEffect} from 'react';
import Spinner from "../layout/Spinner";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import Repos from '../repos/Repos'

const User = ({user, loading, getUser, getUserRepo, getUsersRepo, repos,match}) => {
    useEffect(()=>{
        // הUSE EFFECT יופעל בכל עדכון שמתבצע לפונקציות שיש בפנים והעדכון לא יפסיק
        // . כדי למנוע את זה שמים סוגריים בסוף
        getUser(match.params.login)
        getUsersRepo(match.params.login)
    },[])

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable, company
    } = user;

    if (loading) return <Spinner/>

    return (
        <Fragment>
            <Link to='/' className={'btn btn-light'}>
                Back to search
            </Link>

            {/*כפתור שמראה אם HIREBALE פנוי או לא פנוי*/}
            Hireable:{''}
            {hireable ? <i className='fas fa-check text-success'/> :
                <i className='fas fa-times-circle text-danger'/>}

            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className='round-img' style={{width: '150px'}}/>
                    <h1>{name}</h1>
                    <p>Location : {location}</p>
                </div>
                <div>
                    {/*בודק האם יש ביו אם כן מראה את הביו שלו אם אין לא מראה כלום*/}
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>}
                    <a href={html_url} className={'btn btn-dark my-1'}>
                        Visit GitHub Profile
                    </a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                Username:
                                {login}
                            </Fragment>}
                        </li>

                        <li>
                            {company && <Fragment>
                                Company:
                                {company}
                            </Fragment>}
                        </li>

                        <li>
                            {blog && <Fragment>
                               Website:
                                {blog}
                            </Fragment>}
                        </li>

                    </ul>
                </div>
            </div>

            <div className="card text-center">
                <div className="badge badge-primary">Followers:{followers}</div>
                <div className="badge badge-success">Following:{following}</div>
                <div className="badge badge-light">public repos:{public_repos}</div>
                <div className="badge badge-dark">public gists:{public_gists}</div>
            </div>
            <Repos repos={repos}/>

        </Fragment>
    );

}
User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepo: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
}
export default User;
