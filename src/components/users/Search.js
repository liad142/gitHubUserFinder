import React,{useState} from 'react';
import PropTypes from "prop-types";

const Search = ({searchUsers, showClear, clearUsers,setAlert}) => {
    const [text,setText] = useState('')

    const onChange = (e) => { //פונקציה הזאתי מופעלת כשרושמים משהו באינפוט ומעדכנת את הסטייט בכל מה שרושמים באינפוט
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        //כשלוחצים על שליחת פורם זה מגיע לכאן ומכאן אנחנו קוראים לפונקציית SEARCHUSER ומעבירים לה את מה שרשום בסטייט
        e.preventDefault()
        if (text === '') {
            setAlert('Please enter some text', 'light')
        } else {
            searchUsers(text)
            setText('')
        }
    }
    return (
        <div>

            <form onSubmit={onSubmit} className={'form'}>
                <input type="text"
                       name={'text'}
                       placeholder={'Serach for users'}
                       value={text}
                       onChange={onChange}/>
                <input type="submit" value="Search" className={' btn btn-dark btn-block'}/>
            </form>

            {/*/*כאן אני בודק האם SHOWCLEAR הוא TRUE אם כן אני מראה את הכפתור של הCLEAR*/}
            {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>
                Clear</button>}

        </div>
    );
}
Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}
export default Search;
