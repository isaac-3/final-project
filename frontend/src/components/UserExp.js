import React, { useState } from 'react';
import {useEffect} from 'react'
import ExpCard from './ExpCard'
import CircularProgress from '@material-ui/core/CircularProgress';

const UserExp = () => {

    let [experiences, setExperiences] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/experiences')
        .then(res=>res.json())
        .then(experiences => (
            setExperiences({experiences: experiences})
        ))
    },[])

    if(experiences.experiences === undefined){
        return <div style={{textAlign: 'center'}}><CircularProgress/></div>
    }
    // console.log(experiences.experiences)

    // let filt = experiences.experiences.filter(exp =>{
    //     // debugger
    //     console.log(exp)
    // })

    return (
        // <div style={{backgroundColor: 'rgb(223, 229, 235)'}}>
        <div style={{paddingTop: '50px' ,textAlign: 'center', marginLeft: 'auto', backgroundColor: 'rgb(223, 229, 235)', backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 20%,rgba(255,255,255,1)),url('/trips.jpg')",backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
            <h1 style={{fontSize: '60px', fontFamily: 'cursive'}}>Shared Trips</h1>
            <div style={{textAlign: 'center', paddingTop: '50px', width: 'fit-content', marginLeft:'auto',marginRight:'auto', paddingBottom: '24px'}} fluid>
                {experiences.experiences.map(exp => (
                    <ExpCard exp={exp}/>
                ))}
            </div>
        </div>
    );
}
 
export default UserExp;