import React from 'react';
import { Comment,Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux'

const HotelComment = (props) => {
  let user = useSelector( state => state.user)
  console.log(props.review)
  let color = props.review.user.id === undefined ? null : props.review.user.id === user.id ? 'green' : null
  
  return (
    <Comment
      author={<a style={{color: color}}>{props.review.user.username ? props.review.user.username : props.review.user.username}</a>}
      avatar={
        <Avatar
          src={props.review.user.avatar ? props.review.user.avatar.small.url : props.review.user.pic_url}
        />
      }
      content={
        <p>{props.review.text ? props.review.text : props.review.review}</p>
      }
      datetime={
          <span>{props.review.created_time ? props.review.created_time.substring(0,10) : props.review.created_at.substring(0,10)}</span>
      }
    />
  );
};

export default HotelComment;
