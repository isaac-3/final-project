import React from 'react';
import { Comment, Avatar } from 'antd';
import { useSelector } from 'react-redux'

const   RestComment = (props) => {
  let user = useSelector( state => state.user)
  let color = props.review.user === undefined ? null : props.review.user.id === user.id ? 'green' : null
  return (
      <div>
    <Comment
      author={<a style={{color: color}}>{props.review.author ? props.review.author : props.review.user.username}</a>}
      avatar={
        <Avatar
          src={props.review.user ? props.review.user.pic_url : "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png"}
        />
      }
      content={
        <p>{props.review.summary ? props.review.summary : props.review.review}</p>
      }
      datetime={
          <span>{props.review.published_date ? props.review.published_date.substring(0,10) : props.review.created_at.substring(0,10)}</span>
      }
    />
      
    </div>
  );
};

export default RestComment;
