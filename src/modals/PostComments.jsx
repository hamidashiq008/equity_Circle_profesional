


// components/CommentModal.jsx
import React, { useState } from 'react';
import { FaTimes, FaEllipsisH, FaRegSmile } from "react-icons/fa";

import { Modal, Button } from 'react-bootstrap';
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import dayjs from 'dayjs';
import axios from '../utils/axios';
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from 'react-router-dom';

const PostComments = ({ show, onHide, post, setPosts }) => {

  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [commentTextContext, setCommentTextContext] = useState(

    {
      content: '',
    }
  );

  const commentContextHolder = (e) => {
    setCommentTextContext({ ...commentTextContext, [e.target.name]: e.target.value })
  }

  console.log(commentTextContext)

  // Comment Fnnction

  const sendCommentFucntion = async () => {
    let commentForm = new FormData();
    commentForm.append('content', commentTextContext.content);


    try {
      let response = await axios.post(`/posts/${post.id}/comment`, commentForm);

      setPosts({ ...post, comments: [...post.comments, response.data.comment] })
      // alert('comment Added')
      setCommentTextContext({ content: "" })
    } catch (err) {
      alert('Comment Have a Error')
    }
  }

  // ADD Emojies Function

  const onEmojiClick = (emojiData) => {
    setCommentTextContext((prev) => ({
      ...prev,
      content: prev.content + emojiData.emoji
    }));
  };
  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered className='post-comment-modal h-100'>
        <button onClick={onHide} className='comment-modal-close-btn'>
          <FaTimes size={20} color="black" />
        </button>
        <Modal.Body className='p-0 h-100'>

          <div className="comment-modal-main-wrapper h-100">
            <div className="row inner-wrapper d-flex align-items-start h-100 p-0">
              {post.media.length > 0 ? <div className="col-lg-7 h-100 pe-0">
                <div className="post-over-view">
                  {post.media.length > 0 ? <img src={post.media[0].url} alt="" /> : null}

                </div>
              </div> : null}
              {
                post.media.length > 0 ? <div className="col-lg-5 h-100  ps-0">

                  <div className="post-comment-wrapper h-100">
                    <div className="post-comment-area-header  px-2 py-3">
                      <div className="inner-wrapper d-flex align-items-center justify-content-between">
                        <div className="left-side-wrapper d-flex align-items-center gap-1">
                          <div className="user-profile-wrapper">
                            <img src={post.user.profile_image_url} alt="" />
                          </div>
                          <div className="user-name">
                            <h6 className='m-0'>{post.user.name}</h6>
                          </div>
                        </div>
                        <div className="right-side-content-wrapper">
                          <FaEllipsisH size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="post-comment-area-comments-content px-2 py-3">
                      <p>{post?.comments?.map((comment, index) => (
                        <p key={index} className="main-parent-comment mb-2">
                          {comment?.content.trim() && comment.content.trim()}
                        </p>
                      ))}</p>
                    </div>
                    <div className="post-comment-area-footer p-3">
                      <div className="inner-main-wrapper">
                        <div className="icons-wrapper d-flex align-items-center justify-content-between gap-2">
                          <div className="right-side-icons d-flex gap-2">
                            <div>
                              <AiOutlineHeart size={24} />
                            </div>
                            <div>

                              <BiMessageRounded size={24} />
                            </div>
                            <div>
                              <FiSend size={24} />

                            </div>
                          </div>
                          <div className="lef-side-icons">
                            <BsBookmark size={20} />
                          </div>
                        </div>
                        <div className="likes-and-time-count-wrapper mt-2">
                          <div className="like-count-wrapper">
                            <span className='me-1'>
                              {
                                post.likes_count || '0'
                              }
                            </span>
                            <span>
                              {
                                post.likes_count >= 0 ? 'Like' : 'Likes'
                              }
                            </span>
                          </div>
                          <div className="time-count-wrapper">
                            {
                              <small>{dayjs(post.created_at).fromNow()}  </small>
                            }
                          </div>
                        </div>
                        <div className="send-comment-wrapper">
                          <div className="inner-wrapper d-flex align-items-center gap-2 mt-2">
                            <div
                              className="icon-wrapper"
                              style={{ cursor: "pointer", display: "inline-block", marginRight: "5px" , position: 'relative'}}
                              onClick={() => setShowEmojiPicker((prev) => !prev)}
                            >
                              <FaRegSmile size={20} />
                              {/* Emoji picker */}
                              {showEmojiPicker && (
                                <div className='emoji-picker-main-wrapper' style={{ position: "absolute", bottom: "40px", left: "-42px", zIndex: 1000 }}>
                                  <EmojiPicker onEmojiClick={onEmojiClick} />
                                </div>
                              )}
                            </div>
                            <input value={commentTextContext.content} type="text" className='px-2 py-1 w-100 rounded border-0 send-comment' name='content' onChange={commentContextHolder} />
                            <button className='rounded border-0 post-btn py-1' onClick={sendCommentFucntion}>Post</button>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </div> : <div className="col-lg-12 h-100 ">

                  <div className="post-comment-wrapper h-100">
                    <div className="post-comment-area-header  px-2 py-3">
                      <div className="inner-wrapper d-flex align-items-center justify-content-between">
                        <div className="left-side-wrapper d-flex align-items-center gap-1">
                          <div className="user-profile-wrapper">
                            <img src={post.user.profile_image_url} alt="" />
                          </div>
                          <div className="user-name">
                            <h6 className='m-0'>{post.user.name}</h6>
                          </div>
                        </div>
                        <div className="right-side-content-wrapper">
                          <FaEllipsisH size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="post-comment-area-comments-content px-2 py-3">
                      <p>{post?.comments?.map((comment, index) => (
                        <p key={index} className="main-parent-comment mb-2">
                          {comment?.content.trim() && comment.content.trim()}
                        </p>
                      ))}</p>
                    </div>
                    <div className="post-comment-area-footer p-3">
                      <div className="inner-main-wrapper">
                        <div className="icons-wrapper d-flex align-items-center justify-content-between gap-2">
                          <div className="right-side-icons d-flex gap-1">
                            <div>
                              <AiOutlineHeart size={24} />
                            </div>
                            <div>

                              <BiMessageRounded size={24} />
                            </div>
                            <div>
                              <FiSend size={24} />

                            </div>
                          </div>
                          <div className="lef-side-icons">
                            <BsBookmark size={20} />
                          </div>
                        </div>
                        <div className="likes-and-time-count-wrapper mt-2">
                          <div className="like-count-wrapper">
                            <span className='me-1'>
                              {
                                post.likes_count || '0'
                              }
                            </span>
                            <span>
                              {
                                post.likes_count >= 0 ? 'Like' : 'Likes'
                              }
                            </span>
                          </div>
                          <div className="time-count-wrapper">
                            {
                              <small>{dayjs(post.created_at).fromNow()}  </small>
                            }
                          </div>
                        </div>
                        <div className="send-comment-wrapper">
                          <div className="inner-wrapper d-flex gap-2 align-items-center mt-2">
                            <div className="icon-wrapper">
                              <FaRegSmile size={20} />
                            </div>
                            <input value={commentTextContext.content} type="text" className='w-100 rounded border-0 send-comment px-2 py-1' name='content' onChange={commentContextHolder} />
                            <button className='rounded border-0 post-btn py-1' placeholder="Write a comment..." onClick={sendCommentFucntion}>Post</button>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              }
            </div>
          </div>


        </Modal.Body>

      </Modal>
    </>
  );
};

export default PostComments;

