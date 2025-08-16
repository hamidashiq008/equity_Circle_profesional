import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from '../../../utils/axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Hamid from '../../../assets/images/userProfile.png';
import PostComments from '../../../modals/PostComments'; // <-- Make sure path is correct
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // for passing data to modal
  const observer = useRef();
  const navigate = useNavigate()

  const fetchPosts = async (pageNum) => {
    try {
      setLoading(true);
      const res = await axios.get(`/posts?page=${pageNum}`);
      const { data, current_page, last_page, has_more } = res.data;

      setPosts((prev) => [...prev, ...data]);
      setPage(current_page + 1);
      setHasMore(has_more);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  // On scroll Next api hit Like next page will be show on scroll
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts(page);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );


  // Description ellipsis from 2 lines
  const toggleReadMore = (index) => {
    setExpandedPosts((prev) => ({ ...prev, [index]: !prev[index] }));
  };



  // Comment open modal and remove add to url
  const showCommentsModal = (post) => {
    setSelectedPost(post); // set current post for modal
    setShowModal(true);
    navigate(`?${post.id}`, { replace: true });
    console.log('POST', post.id)
  };
  // Comment close modal and remove id from url
  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    // ✅ Remove postId from URL
    navigate("", { replace: true });
  };


  // redirect to login page if localStorage have not token
  
  return (
    <>
      {posts.map((item, index) => {
        const isExpanded = expandedPosts[index];
        const isLong = item.description?.length > 150;
        const isLastPost = index === posts.length - 1;

        return (
          <div
            key={item.id}
            ref={isLastPost ? lastPostRef : null}
            className="card facebook-card shadow-sm mb-3"
          >
            <div className="card-header d-flex align-items-start">
              <img
                src={item.user?.profile_image_url || Hamid}
                alt="User Profile"
                className="page-logo me-2"
              />
              <div>
                <div className="fw-bold">{item.user?.name || 'Unknown'}</div>
                <small>{dayjs(item.created_at).fromNow()} · <i className="fas fa-globe-asia"></i></small>
              </div>
            </div>

            <div className="p-2">
              <div className={`desceition-div ${!isExpanded ? 'clamp' : ''}`}>
                {item.description}
              </div>
              {isLong && (
                <button className="btn btn-link p-0 text-secondary" onClick={() => toggleReadMore(index)}>
                  {isExpanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>



            {item.media?.length > 0 && (
              <div className="card-img-wrapper">
                <img
                  src={item.media[0].url}
                  alt="Post Media"
                  className="card-img-top"
                />
              </div>
            )}

            <div className="card-body pt-2 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="likes-wrapper d-flex gap-2">
                  <div className="icons-wrapper">
                    <i className="fas fa-thumbs-up text-primary me-1"></i>
                    <i className="fas fa-heart text-danger me-1"></i>
                    <i className="fas fa-laugh text-warning me-1"></i>
                  </div>
                  <div className="likes-wrapper">
                    <span>{item.likes_count || '0'}</span>
                    <span className="ms-1">
                      {item.likes_count <= 1 ? 'like' : 'likes'}
                    </span>
                  </div>
                </div>
                <div className="comment-and-share d-flex gap-2">
                  <div className="comment-wrapper">
                    {item.comments_count || '0'}
                    <span className="ms-1">
                      {item.comments_count <= 1 ? 'comment' : 'comments'}
                    </span>
                  </div>
                  <div className="dot-wrapper">.</div>
                  <div className="share-wrapper">
                    {item.shares || '0 shares'}
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-1 mx-3" />

            <div className="card-footer d-flex justify-content-around">
              <button className="btn btn-light text-muted">
                <i className="far fa-thumbs-up me-2"></i>Like
              </button>
              {/* <button
                className="btn btn-light text-muted comment-btn"
                onClick={() => handleCommentClick(item)} // 👈 trigger modal
              >
                <i className="far fa-comment me-2"></i>Comment
              </button> */}
              <button
                className="btn btn-light text-muted comment-btn"
                onClick={() => showCommentsModal(item)} // 👈 trigger modal
              >
                <i className="far fa-comment me-2"></i>Comment
              </button>
              <button className="btn btn-light text-muted">
                <i className="fas fa-share me-2"></i>Share
              </button>
            </div>
          </div>
        );
      })}

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Show Modal */}
      {showModal && (
        <PostComments
          show={showModal}
          onHide={closeModal}
          post={selectedPost}
          setPosts={setSelectedPost}
        />
      )}
    </>
  );
};

export default Home;
