import React, {useEffect, useState} from 'react';
import axios from 'axios'

function EditUser({setIsEditing, userID, setAllUsers, allUsers}) {
    const [text, setText] = useState({
        name: '',
        bio: '',
    })

    useEffect(() => {
        axios.get(`http://localhost:9000/api/users/${userID}`)
        .then(resp => {
            setText({
                ...text,
                name: resp.data.name,
                bio: resp.data.bio
            })
        })
        .catch(err => console.error(err))
    }, [])

    const handleTextInput = (e) => {
        setText({
            ...text,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
         e.preventDefault()
         axios.put(`http://localhost:9000/api/users/${userID}`, text)
        .then( resp => {
        const filteredArray = allUsers.filter(user => user.id !== userID)
        setAllUsers([resp.data, ...filteredArray])
        setIsEditing(false)
        }).catch(err => console.error(err))         
    }

    let FormContainerStyle = {
        display: "flex",
        justifyContent: "center"
    }

    let FormStyle = {
        display: "flex",
        flexDirection: "column",
        margin: ".5rem",
        width: "50%",
        padding: ".5rem",
    }

  return <div style={FormContainerStyle}>
      <form style={FormStyle} onSubmit={submit}>
          <label
          name="nameInput"
          >
              Name:
          </label>
          <input onChange={handleTextInput} type='text' name='name' value={text.name} />
          <label
          name="bioInput"
          >
              Bio:
          </label>
          <input onChange={handleTextInput} type='text' name='bio' value={text.bio} />
          <button>Submit!</button>
      </form>
  </div>;
}

export default EditUser;
