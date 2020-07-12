import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Tooltip from '@material-ui/core/Tooltip'
import {useState} from 'react'
import { Upload, message } from 'antd';
import PublishSharpIcon from '@material-ui/icons/PublishSharp';
import Switch from '@material-ui/core/Switch';
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button as Btn2 } from 'antd';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'rgb(223, 229, 235)'
    },
    gridList: {
      width: 500,
      height: 'auto',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 4,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };

const MyProfile = () => {
    let loggedUser = useSelector( state => state.user)

    let theImg = loggedUser.pic_url

    const [toggle, setEdit] = useState({toggle: false})

    const [imgimg, setImg] = useState({theImg})

    const [pic_Up, setpic_Up] = useState({
        checkedA: false
      });

    let updProfile = (img) => {
        fetch(`http://localhost:3000/users/${loggedUser.id}`,{
            credentials: "include",
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: loggedUser.id,
                newImg: img,
              })
        })
        switchEdit()
    }

    let switchEdit = () => {
        setEdit({toggle: toggle.toggle ? false : true})
    }

    let handleChange = info => {
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, theImg =>
            setImg({
              theImg,
            }),
          );
        }
      }

    let handleSetPic = (event) => {
        setpic_Up({ ...pic_Up, [event.target.name]: event.target.checked });
      };

      const onFinish = values => {
        setImg({...imgimg,theImg: values.theImg})
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    let dispatch = useDispatch()
    const classes = useStyles();
    return (
      <div style={{backgroundColor: 'rgb(223, 229, 235)'}}>
        <div style={{paddingTop : '24px', paddingTop: '50px'}}>
            <div className={classes.root}>
                <GridList cellHeight={300} cols={1} className={classes.gridList} style={{'borderRadius': '16px'}}>
                    <GridListTile>
                    <img src={loggedUser.pic_url == null || undefined ? "https://i0.wp.com/cms.ironk12.org/wp-content/uploads/2020/02/no-person-profile-pic.png?ssl=1" : imgimg.theImg} />
                    <GridListTileBar
                        style={{paddingRight: '8px'}}
                        subtitle={<span>{loggedUser.pic_url == null || undefined ? 'You have no photo' : "Current Photo"}</span>}
                        actionIcon={
                        <Tooltip title="Edit">
                            <IconButton aria-label='info about this' className={classes.icon} onClick={()=>switchEdit()}>
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        }
                    />
                    </GridListTile>
                </GridList>
            </div><br/>
            <div style={{textAlign: 'center', height: '600px',backgroundColor: 'rgb(223, 229, 235)'}}>
                {toggle.toggle ?
                <div style={{textAlign: 'center', backgroundColor: 'rgb(223, 229, 235)'}}>
                    {pic_Up.checkedA ? 
                     <Form style={{textAlign: 'center'}}
                     {...layout}
                     name="basic"
                     initialValues={{
                       remember: true,
                     }}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                   >
                        <Form.Item
                        label="url"
                        name="theImg"
                        rules={[
                            {
                            required: true,
                            message: 'Enter image url!',
                            },
                        ]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Btn2 type="primary" htmlType="submit">
                            Submit
                            </Btn2>
                        </Form.Item>
                     </Form> :
                    <Upload
                        showUploadList={false}
                        customRequest={dummyRequest}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        <div style={{textAlign: 'center'}}>
                        <PublishSharpIcon />  UpLoad Photo
                        </div>
                    </Upload>
                    }
                    <Switch
                    checked={pic_Up.checkedA}
                    onChange={handleSetPic}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    /> Link?<br/>
                    <Button
                        onClick={()=>{
                            updProfile(imgimg.theImg)
                            dispatch({type: 'UPD_PRO_PIC', pic_url: imgimg.theImg})
                        }}
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </div>
                    : <div style={{height: '600px',backgroundColor: 'rgb(223, 229, 235)'}}>
                      </div>
                      }
                
            </div>
      </div>
      </div>
    );
}
 
export default MyProfile;