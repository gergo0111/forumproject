import React, { useState } from "react";
import LikeDislike from "./LikeDislike";

const CommentSection = ({
  user,
  comments = [],
  deleteComment,
  // egyéb propok, ha szükséges
}) => {
  const [showComments, setShowComments] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [commentText, setCommentText] = useState("");

  const addComment = () => {
    // implementáld a hozzászólás hozzáadását
  };

  return (
    <div className="comment-section">
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? "Hozzászólások elrejtése" : "Hozzászólások megjelenítése"}
      </button>

      {showComments && (
        <div className="mt-2">
          <h6>Hozzászólások</h6>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment-container">
                <strong>{c.username}</strong>: {c.text}
                <div className="comment-actions">
                  <button onClick={() => setReplyTo(c.id)}>Válasz</button>
                  {user?.isAdmin && (
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => deleteComment(c.id)}
                    >
                      Törlés
                    </button>
                  )}
                </div>
                <LikeDislike
                  entity="comments"
                  id={c.id}
                  initialLikes={c.likes || 0}
                  initialDislikes={c.dislikes || 0}
                />
                {c.replies && c.replies.length > 0 && (
                  <div className="mt-2 ms-4">
                    {c.replies.map((reply) => (
                      <div key={reply.id} className="comment-reply">
                        <strong>{reply.username}</strong>: {reply.text}
                        <div className="comment-actions">
                          {user?.isAdmin && (
                            <button
                              className="btn btn-danger btn-sm ms-2"
                              onClick={() => deleteComment(reply.id)}
                            >
                              Törlés
                            </button>
                          )}
                        </div>
                        <LikeDislike
                          entity="comments"
                          id={reply.id}
                          initialLikes={reply.likes || 0}
                          initialDislikes={reply.dislikes || 0}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Még nincsenek hozzászólások.</p>
          )}
          {user ? (
            <>
              {replyTo && (
                <p className="text-muted">
                  Válaszolás erre:{" "}
                  <strong>
                    {comments.find((c) => c.id === replyTo)?.text}
                  </strong>
                </p>
              )}
              <textarea
                className="comment-box"
                placeholder="Írd le a véleményed..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="btn-comment" onClick={addComment}>
                Hozzászólás
              </button>
              {replyTo && (
                <button
                  className="btn btn-secondary btn-sm ms-2"
                  onClick={() => setReplyTo(null)}
                >
                  Mégse
                </button>
              )}
            </>
          ) : (
            <p className="text-muted">Jelentkezz be a hozzászóláshoz.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
