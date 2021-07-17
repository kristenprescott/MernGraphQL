import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Card,
  Grid,
  Image,
  Button,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
// TODO: make CommentButton component
// import CommentButton from "../components/CommentButton";
import DeleteButton from "../components/DeleteButton";
import InvertedPopup from "../utils/InvertedPopup";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  // const commentInputUnfocusRef = useRef(null);
  // const commentInputFocusRef = useRef(null);
  const commentInputFocusRef = useRef(null);

  const [comment, setComment] = useState("");

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  // // https://www.davedrinks.coffee/how-do-i-use-two-react-refs/
  // const mergeRefs = (...refs) => {
  //   const filteredRefs = refs.filter(Boolean);
  //   if (!filteredRefs.length) return null;
  //   if (filteredRefs.length === 0) return filteredRefs[0];
  //   return (inst) => {
  //     for (const ref of filteredRefs) {
  //       if (typeof ref === "function") {
  //         ref(inst);
  //       } else if (ref) {
  //         ref.current = inst;
  //       }
  //     }
  //   };
  // };

  // Check which element is currently focused: console.log(document.activeElement);

  // TODO: fix this page refresh here too
  const refreshPage = () => {
    window.location.reload();
  };

  const inputBlur = () => {
    commentInputFocusRef.current.blur();
  };

  const inputFocus = () => {
    commentInputFocusRef.current.focus();
  };

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      // commentInputUnfocusRef.current.blur();
      inputBlur();
      refreshPage();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    window.location.href = "/";
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      username,
      title,
      body,
      tags,
      selectedFile,
      likeCount,
      likes,
      commentCount,
      comments,
      createdAt,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>

          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  {username}{" "}
                  <Card.Meta>{moment(createdAt).fromNow()} ago</Card.Meta>
                  <br />
                  <br />
                  <hr />
                  <h3 style={{ margin: "0 auto", textAlign: "center" }}>
                    <Card.Content header={title} />
                  </h3>
                  <hr />
                </Card.Header>

                <Card.Description>{body}</Card.Description>
              </Card.Content>

              <Image src={selectedFile} />

              <Card.Content extra>
                {tags.map((tag) => (
                  <Card.Content
                    className="tags"
                    key={tag}
                    as={Link}
                    to={`/tags/${id}`}
                  >
                    #{tag}{" "}
                  </Card.Content>
                ))}
              </Card.Content>

              <hr />

              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />

                <InvertedPopup content="comment on post">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => {
                      // focus on comment input
                      inputFocus();

                      console.log("comment on post");
                    }}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </InvertedPopup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>

            {user && (
              <Card fluid>
                <Card.Content>
                  <h3>Post a comment:</h3>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="comment..."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        // ref={commentInputUnfocusRef /*, commentInputFocusRef */}
                        ref={commentInputFocusRef}
                      />

                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}

            <Card fluid>
              {comments.map((comment) => (
                <Card.Content key={comment.id}>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              ))}
            </Card>
          </Grid.Column>

          <Grid.Column
            width={3}
            style={{
              height: "100%",
              border: "1px solid gainsboro",
              borderTop: "none",
              marginLeft: "5%",
            }}
          ></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      username
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
      createdAt
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      title
      body
      tags
      selectedFile
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
      createdAt
    }
  }
`;

export default SinglePost;
