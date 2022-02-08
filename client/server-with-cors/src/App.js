import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import EditUser from './EditUser';

function App() {
  const [allUsers, setAllUsers] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:9000/api/users')
    .then(resp => {
      console.log(resp)
      setAllUsers(resp.data)
    }).catch(err => console.error(err))
  },[])

  const handleEdit = (e, userID) => {
    e.preventDefault()
    setIsEditing(!isEditing)
    setEditID(userID)
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    axios.delete(`http://localhost:9000/api/users/${id}`)
    .then(resp => {
      console.log(resp)
      const newUsersArray = allUsers.filter(user => user.id !== resp.data.id)
      setAllUsers(newUsersArray)
    }).catch(err => console.error(err))
  }

  let AppStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }

  let Cardstyle = {
    border: "1px solid black",
    padding: "1rem",
    background: "cyan",
    width: "20%",
    margin: "1rem",
    display: "flex",
    flexDirection: "column"
  }

  const ButtonStyle = {
    width: "25%",
    alingItems: "space-between",
    margin: ".5rem",
    cursor: "pointer",
    height: "30px",
    border: "1px solid black",
    borderRadius: ".2rem"
  }


  return (
    <div style={AppStyle} className="App">
      <h1>Server with cors - Stretch</h1>
      <hr />
      <br />
      {
        allUsers.map(user => {
          return <div key={user.id} style={Cardstyle} className='user-Card'>
            <h3>Name: { user.name }</h3>
            <p>Bio: { user.bio } </p>
            <form>
              <button style={ButtonStyle} onClick={(e) => handleEdit(e, user.id)}>Edit</button>
              <button style={ButtonStyle} onClick={(e) => handleDelete(e, user.id)}>Delete</button>
            </form>
            {isEditing && editID === user.id && <EditUser setAllUsers={setAllUsers} allUsers={allUsers} userID={user.id} setIsEditing={setIsEditing} />}
          </div>
        })
      }
    </div>
  );
}

export default App;
