// components/CommentModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { FaTimes, FaEllipsisH, FaRegSmile } from "react-icons/fa";

import { Modal, Button } from "react-bootstrap";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Carousel from "react-bootstrap/Carousel";
import { BsBookmark, BsHeart } from "react-icons/bs";
import dayjs from "dayjs";
import axios from "../utils/axios";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";

const PostComments = ({ show, onHide, post, setPosts }) => {
  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentParentID, setCommentParentID] = useState(null);
  const [commentUserID, setCommentUserID] = useState(null);
  const [commentReplies, setCommentReplies] = useState(null);
  const [hideView, setHideView] = useState(false);
  const [commentRepliesViewID, setCommentRepliesViewID] = useState("");
  // Delete and Report Functionality
  const [showDeleteReportModal, setShowDeleteReportModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [postCommetsApi, setPostCommetsApi] = useState([]);
  // pagination for comments
  const [commentsPage, setCommentsPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [loadingMoreComments, setLoadingMoreComments] = useState(false);
  const commentsContainerRef = useRef(null);
  const commentsEndSentinelRef = useRef(null);

  console.log("Replies", commentReplies);

  // Toggle comment like function
  const toggleCommentLike = async (commentId) => {
    // console.log('Toggling like for comment ID:', commentId);

    try {
      const formData = new FormData();
      formData.append("comment_id", commentId);

      // console.log('Sending request to /like-comment with commentId:', commentId);
      const response = await axios.post(`/like-comment`, formData);
      // console.log('API Response:', response.data);

      // Update the comment's isLiked status in the post state

      const updatedComments = post.comments.map((comment) => {
        if (comment.id === commentId) {
          const newIsLiked = !comment.isLiked;
          const newLikesCount = comment.isLiked
            ? (comment.likes_count || 0) - 1
            : (comment.likes_count || 0) + 1;

          console.log(
            `Updating comment ${commentId}: isLiked ${
              comment.isLiked
            } -> ${newIsLiked}, likes_count ${
              comment.likes_count || 0
            } -> ${newLikesCount}`
          );

          return {
            ...comment,
            isLiked: newIsLiked,
            likes_count: newLikesCount,
          };
        }
        return comment;
      });

      setPosts({ ...post, comments: updatedComments });
      console.log("State updated successfully");
    } catch (error) {
      console.error("Error toggling comment like:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  const [commentTextContext, setCommentTextContext] = useState({
    content: "",
  });

  const commentContextHolder = (e) => {
    setCommentTextContext({
      ...commentTextContext,
      [e.target.name]: e.target.value,
    });
  };

  // Handle backspace on @username pattern
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && commentParentID && commentUserID) {
      const currentContent = commentTextContext.content;
      const expectedPattern = `@${
        post.comments.find((c) => c.id === commentParentID)?.user?.name || ""
      } `;

      // If cursor is at the end of @username pattern and user presses backspace
      if (
        currentContent === expectedPattern ||
        currentContent === expectedPattern.trim()
      ) {
        e.preventDefault();
        setCommentTextContext({ content: "" });
        setCommentParentID(null);
        setCommentUserID(null);
      }
      // If user is backspacing within the @username pattern
      else if (
        currentContent.length <= expectedPattern.length &&
        expectedPattern.startsWith(currentContent)
      ) {
        e.preventDefault();
        setCommentTextContext({ content: "" });
        setCommentParentID(null);
        setCommentUserID(null);
      }
    }
  };

  // Comment Fnnction
  const sendCommentFucntion = async () => {
    let commentForm = new FormData();

    // Check if comment starts with @ to determine if it's a reply
    const isReply = commentTextContext.content.trim().startsWith("@");

    // Remove @username from content if it's a reply
    let cleanContent = commentTextContext.content;
    if (isReply && commentParentID && cleanContent.startsWith("@")) {
      // Remove @username part (find the pattern that was added in commentReplyFunction)
      const usernamePattern = `@${
        post.comments.find((c) => c.id === commentParentID)?.user?.name || ""
      } `;
      if (cleanContent.startsWith(usernamePattern)) {
        cleanContent = cleanContent.substring(usernamePattern.length).trim();
      }
    }

    commentForm.append("content", cleanContent);
    {
      isReply && commentParentID
        ? commentForm.append("parent_id", commentParentID)
        : null;
    }
    {
      isReply && commentUserID
        ? commentForm.append("user_id", commentUserID)
        : null;
    }

    try {
      let response = await axios.post(`/posts/${post.id}/comment`, commentForm);

      if (isReply && commentParentID && commentUserID) {
        // This is a reply - add to parent comment's replies array
        const updatedComments = post.comments.map((comment) => {
          if (comment.id === commentParentID) {
            return {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, response.data.comment]
                : [response.data.comment],
            };
          }
          return comment;
        });
        setPosts({ ...post, comments: updatedComments });
      } else {
        // This is a new comment - add to main comments array
        setPosts({
          ...post,
          comments: [...post.comments, response.data.comment],
        });
      }

      // alert('comment Added')
      setCommentTextContext({ content: "" });
      setCommentParentID(null);
      setCommentUserID(null);
      setShowEmojiPicker(false);
    } catch (err) {
      alert("Comment Have a Error");
    }
  };

  // ADD Emojies Function
  const onEmojiClick = (emojiData) => {
    setCommentTextContext((prev) => ({
      ...prev,
      content: prev.content + emojiData.emoji,
    }));
  };

  // Comment Reply Function
  const commentReplyFunction = (e) => {
    setCommentTextContext({
      ...commentTextContext,
      content: `@${e.user.name} `,
    });
    setCommentParentID(e.id);
    setCommentUserID(e.user.id);
  };

  // Delete Comment Function
  const deleteCommentFunc = async (commentId) => {
    try {
      const response = await axios.delete(`/comments/${commentId}`);
      if (response.status === 200) {
        // Filter out the deleted comment from the post's comments
        const updatedComments = post.comments.filter(
          (comment) => comment.id !== commentId
        );
        setPosts({ ...post, comments: updatedComments });
        setShowDeleteReportModal(false);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  // Comment Reply Like Function
  const commentReplyLikeFunc = (replyId) => async () => {
    try {
      let response = await axios.post(`/like-comment`, { comment_id: replyId });
      const updatedComments = post.comments.map((comment) => {
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  isLiked: response.data.isLiked,
                  likes_count: response.data.likes_count,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      });
      setPosts({ ...post, comments: updatedComments });
    } catch (error) {
      console.error("Error liking reply:", error);
      alert("Failed to like reply");
    }
  };

  const commetsApifunc = async (page = 1, append = false) => {
    try {
      const response = await axios.get(`/post/${post.id}/comments?page=${page}`);
      const res = response.data || {};
      const items = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : res.comments || [];

      setPostCommetsApi((prev) => (append ? [...prev, ...items] : items));

      const current = res.current_page ?? page;
      const last = res.last_page ?? (res.total && res.per_page
        ? Math.ceil(res.total / res.per_page)
        : items.length < 10
        ? page
        : page + 1);
      setHasMoreComments(current < last);
      setCommentsPage(current);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  // initial load, reset on post change
  useEffect(() => {
    setPostCommetsApi([]);
    setCommentsPage(1);
    setHasMoreComments(true);
    commetsApifunc(1, false);
  }, [post?.id]);

  // set up intersection observer for infinite scroll
  useEffect(() => {
    const rootEl = commentsContainerRef.current || null;
    const target = commentsEndSentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          hasMoreComments &&
          !loadingMoreComments
        ) {
          setLoadingMoreComments(true);
          commetsApifunc(commentsPage + 1, true).finally(() =>
            setLoadingMoreComments(false)
          );
        }
      },
      {
        root: rootEl,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [commentsPage, hasMoreComments, loadingMoreComments]);
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
        className="post-comment-modal h-100"
      >
        <button onClick={onHide} className="comment-modal-close-btn">
          <FaTimes size={20} color="black" />
        </button>
        <Modal.Body className="p-0 h-100">
          <div className="comment-modal-main-wrapper h-100">
            <div className="row inner-wrapper d-flex align-items-start h-100 p-0">
              {post.media.length > 0 ? (
                <div className="col-lg-7 h-100 pe-0">
                  <div className="post-over-view">
                    {/* {post.media.length > 0 ? <img src={post.media[0].url} alt="" /> : null} */}
                    {post.media?.length === 1 && (
                      <div className="card-img-wrapper">
                        <img
                          src={post.media[0].url}
                          alt="Post Media"
                          className="card-img-top"
                        />
                      </div>
                    )}

                    {post.media?.length > 1 && (
                      <Carousel touch={true} fade={true} interval={null}>
                        {post.media.map((media, mediaIndex) => (
                          <Carousel.Item
                            key={mediaIndex}
                            className="card-img-top"
                          >
                            <img src={media.url} alt={`Media ${mediaIndex}`} />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )}
                  </div>
                </div>
              ) : null}
              {post.media.length > 0 ? (
                <div className="col-lg-5 h-100  ps-0">
                  <div className="post-comment-wrapper h-100">
                    <div className="post-comment-area-header  px-3 py-3">
                      <div className="inner-wrapper d-flex align-items-center justify-content-between">
                        <div className="left-side-wrapper d-flex align-items-center gap-2">
                          <div className="user-profile-wrapper">
                            <img src={post.user.profile_image_url} alt="" />
                          </div>
                          <div className="user-name">
                            <h6 className="m-0">{post.user.name}</h6>
                          </div>
                        </div>
                        <div className="right-side-content-wrapper">
                          <FaEllipsisH size={20} />
                        </div>
                      </div>
                    </div>
                    <div className="post-comment-area-comments-content px-3 py-3" ref={commentsContainerRef}>
                      <div>
                        {postCommetsApi?.map((comment, index) => (
                          <div
                            className="inner-main-wrapper d-flex gap-3 mb-3"
                            key={index}
                          >
                            <div className="profile-wrapper">
                              <img
                                src={comment.user.profile_image_url}
                                alt=""
                              />
                            </div>
                            <div className="inner-inner-main-wrapper w-100">
                              <div className="comment-content-detail-wrapper d-flex justify-content-between w-100">
                                <div className="comment-details-main-wrapper">
                                  <div className="user-name-comment-content mb-2">
                                    <span className="user-name">
                                      {comment.user.name}
                                    </span>
                                    <span
                                      key={index}
                                      className="main-parent-comment"
                                    >
                                      {comment?.content.trim() &&
                                        comment.content.trim()}
                                    </span>
                                  </div>
                                  <div className="about-comment-created d-flex gap-2">
                                    <span className="comment-created-time">
                                      {dayjs(comment.created_at).fromNow()}
                                    </span>
                                    <span className="comment-like">
                                      {comment.likes_count > 0 && (
                                        <span className="ms-1">
                                          {comment.likes_count} Likes
                                        </span>
                                      )}
                                    </span>
                                    <span
                                      className="comment-reply"
                                      onClick={() =>
                                        commentReplyFunction(comment)
                                      }
                                    >
                                      Reply
                                    </span>
                                    <span
                                      className="delete-and-report "
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setSelectedCommentId(comment.id);
                                        setShowDeleteReportModal(true);
                                      }}
                                    >
                                      <FaEllipsisH size={15} />
                                    </span>
                                  </div>
                                </div>
                                <div className="comment-like-wrapper">
                                  <span
                                    className="comment-like"
                                    onClick={() =>
                                      toggleCommentLike(comment.id)
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    {comment.isLiked ? (
                                      <FaHeart size={13} color="red" />
                                    ) : (
                                      <BsHeart size={13} />
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="view-replies mt-2">
                                {comment.replies &&
                                comment.replies.length > 0 ? (
                                  <>
                                    {commentRepliesViewID !== comment.id ? (
                                      <span
                                        onClick={() => {
                                          setHideView(!hideView);
                                          setCommentRepliesViewID(comment.id);
                                        }}
                                      >
                                        --- View Replies{" "}
                                        {comment.replies.length}
                                      </span>
                                    ) : (
                                      <>
                                        <span
                                          className=""
                                          onClick={() => {
                                            setHideView(!hideView);
                                            setCommentRepliesViewID("");
                                          }}
                                        >
                                          --- Hide Replies
                                        </span>
                                        <div className="comment-replies-main-wrapper mt-2 ">
                                          {comment.replies.map(
                                            (reply, index) => (
                                              <div
                                                key={index}
                                                className="d-flex gap-2 mb-2"
                                              >
                                                <div className="profile-img">
                                                  <img
                                                    src={
                                                      reply.user
                                                        .profile_image_url
                                                    }
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="div d-flex justify-content-between w-100">
                                                  <div className="reply-inner-main">
                                                    <p className="mb-1 comment-reply-content">
                                                      {reply.content}
                                                    </p>
                                                    <div className="about-comment-created d-flex gap-2">
                                                      <span className="comment-created-time">
                                                        {dayjs(
                                                          reply.created_at
                                                        ).fromNow()}
                                                      </span>
                                                      {/* <span>
                                                      likes
                                                    </span> */}
                                                      <span
                                                        className="comment-reply"
                                                        onClick={() =>
                                                          commentReplyFunction(
                                                            comment
                                                          )
                                                        }
                                                      >
                                                        Reply
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="reply-like">
                                                    <span
                                                      className="comment-like"
                                                      onClick={commentReplyLikeFunc(
                                                        reply.id
                                                      )}
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                    >
                                                      {reply.isLiked ? (
                                                        <FaHeart
                                                          size={13}
                                                          color="red"
                                                        />
                                                      ) : (
                                                        <BsHeart size={13} />
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* sentinel for infinite scroll */}
                        <div ref={commentsEndSentinelRef}  />
                        {loadingMoreComments && (
                          <div className="text-center text-muted small py-2">Loading more...</div>
                        )}
                      </div>
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
                            <span className="me-1">
                              {post.likes_count || "0"}
                            </span>
                            <span>
                              {post.likes_count >= 0 ? "Like" : "Likes"}
                            </span>
                          </div>
                          <div className="time-count-wrapper">
                            {<small>{dayjs(post.created_at).fromNow()} </small>}
                          </div>
                        </div>
                        <div className="send-comment-wrapper">
                          <div className="inner-wrapper d-flex align-items-center gap-2 mt-2 position-relative">
                            <div
                              className="icon-wrapper"
                              style={{
                                cursor: "pointer",
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                              onClick={() =>
                                setShowEmojiPicker((prev) => !prev)
                              }
                            >
                              <FaRegSmile size={20} />
                            </div>
                            {/* Emoji picker */}
                            {showEmojiPicker && (
                              <div
                                className="emoji-picker-main-wrapper"
                                style={{
                                  position: "absolute",
                                  bottom: "40px",
                                  left: "-42px",
                                  zIndex: 1000,
                                }}
                              >
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                              </div>
                            )}
                            <input
                              value={commentTextContext.content}
                              type="text"
                              className="px-2 py-1 w-100 rounded border-0 send-comment"
                              name="content"
                              onChange={commentContextHolder}
                              onKeyDown={handleKeyDown}
                            />
                            <button
                              className="rounded border-0 post-btn py-1"
                              onClick={sendCommentFucntion}
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-lg-12 h-100 "></div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {showDeleteReportModal && (
        <Modal
          show={showDeleteReportModal}
          className="comment-delete-modal"
          onHide={() => setShowDeleteReportModal(false)}
          centered
        >
          <Modal.Body>
            {/* Yahan apni delete/report logic ya buttons rakh sakte hain */}
            <Button
              variant=""
              className="w-100"
              style={{ color: "red" }}
              onClick={() => deleteCommentFunc(selectedCommentId)}
            >
              Delete
            </Button>
            <div className="comment-delete-cancle-btn mt-2 pt-2">
              <Button
                variant="transparent"
                className="text-light w-100"
                onClick={() => setShowDeleteReportModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}

      
    </>
  );
};

export default PostComments;
