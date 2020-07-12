import React from 'react';
import Activity from './Activity'
import CardDeck from 'react-bootstrap/CardDeck'
import CircularProgress from '@material-ui/core/CircularProgress';

const ActivityList = (props) => {
    if(props.activities.length === 0){
        return null //<div style={{textAlign: 'center'}}><CircularProgress/></div>
    }
    let filt = props.activities.activities.filter(r => (r.hasOwnProperty("name")))
    let newfilt = filt.filter(r => (r.hasOwnProperty("rating")))
    let sorted = newfilt.sort((a, b) => parseFloat(a.rating) < parseFloat(b.rating) ? 1 : -1).slice(0, 5)
    return (
        <div style={{'display': 'flex', padding: '50px'}}>
            <CardDeck>
                {sorted.map(act => (
                    <Activity key={act.location_id} act={act}/>
                ))}
            </CardDeck>
        </div>
    );
}
 
export default ActivityList;