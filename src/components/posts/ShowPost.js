import PostModel from '../../models/PostModel';

import { useState, useEffect } from 'react'
import profile from '../../images/profile.jpg'

import {useParams } from 'react-router-dom'
import { NavItem } from 'react-bootstrap';

function ShowPost(props) {

    const { item_hash } = useParams();
    const { post, setPost } = useState();

    const [address, setAddress] = useState('');
    const [content, setContent] = useState('');
    const [timePosted, setTimePosted] = useState('');

    const loadPost = async () => {
        const post = await PostModel.find(item_hash)
        setAddress(props.truncateAddress(post.address))
        setContent(post.content.body)
        setTimePosted(props.timeSince(new Date(post.time * 1000)))
    }

    useEffect(() => {
        loadPost()
    }, []);

    // const [itemContent, _setItemContent] = useState(JSON.parse(props.post.item_content))
    // const [address, _setAddress] = useState(props.truncateAddress(itemContent.address))
   
    // const timePosted = (post) => {
    //     return props.timeSince(new Data(post.content.time * 1000))
    // }

    return (
    <div>
        <div className="post card my-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-2">
                        <img src={profile} className="profile" />
                    </div>
                    <div className="col-10">
                        <p className="user mb-0">
                            <b>{address}</b><span className="time"> · {timePosted}</span>
                        </p>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>   
    );
  }
  
  export default ShowPost;