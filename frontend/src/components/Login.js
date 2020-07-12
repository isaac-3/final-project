import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
  
export function Login(props){

    let loguser = useSelector( state => state.trip_board)
    let dispatch = useDispatch()

    const [ user, changeUser ] = useState({
        username: '',
        password: ''
    })

    let [new_user, changeNewUser] = useState({
        new_username: "",
        new_password: "",
        new_address: "",
        new_email: "",
      });

    // async function handleSubmit(e){
    //     e.preventDefault()
    //     let response = await fetch('http://localhost:3000/login', {
    //         credentials: 'include',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: user.username,
    //             password: user.password
    //         })
    //     })
    //     let { success, id, retuser} = await response.json()
    //     if(success){
    //         // props.history.push('/', id)
            

    //     }else {
    //         alert("incorrect");
    //     }
    // }

    let handleSubmit=(e)=>{
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
        .then(res=> res.json())
        .then(result=> {
            if(result.success){
                dispatch({ type: "LOG_IN", user: result.user })
                props.history.push('/')
            }else {
                alert("incorrect");
            }
        })
    }

    async function handleCreate(e) {
        e.preventDefault();
        let response = await fetch("http://localhost:3000/users", {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: new_user.new_username,
            password: new_user.new_password,
            address: new_user.new_address,
            email: new_user.new_email,
          }),
        });
        let { success, id } = await response.json();
        if (success) {
          props.history.push("/test", id);
        } else {
          alert("taken username");
        }
      }

    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h1>Login</h1>
                <div>
                    <label>Username</label>
                    <input type="text" value={user.username} onChange={ e => changeUser({ ...user, username: e.target.value })} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={user.password} onChange={ e => changeUser({ ...user, password: e.target.value })} />
                </div>
                <input type="submit" />
            </form>


            <form onSubmit={handleCreate} >
          <h1>Sign Up</h1>
          <div>
            <label for="exampleInputEmail1">Username </label>
            <input type="text" value={new_user.new_username} onChange={(e) => changeNewUser({ ...new_user, new_username: e.target.value })} placeholder="Username"/>
            </div>
            <div>
            <label for="exampleInputPassword1">Password </label>
            <input type="password" value={new_user.new_password} onChange={(e) => changeNewUser({ ...new_user, new_password: e.target.value })} placeholder="Password"/>
            </div>
            <div>
            <label>Address</label>
            <input type="text" value={new_user.new_address} onChange={(e) => changeNewUser({ ...new_user, new_address: e.target.value })} placeholder="Address"/>
            </div>
            <div>
            <label for="exampleInputPassword1">Email </label>
            <input type="text" value={new_user.new_email} onChange={(e) => changeNewUser({ ...new_user, new_email: e.target.value })} placeholder="Email"/>
            </div>
            <button input="submit">
                Register
            </button>
        </form>

        </div>
    )
}  