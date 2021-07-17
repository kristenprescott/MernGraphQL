import React, { useContext } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, Grid, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
// import CommentButton from "../components/CommentButton";
import DeleteButton from "../components/DeleteButton";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  // console.log("postId: ", postId);

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  function deletePostCallback() {
    // props.history.push("/");
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
                  {/* <br /> */}
                  {/* <br /> */}
                  {/* <hr /> */}
                  <h3 style={{ margin: "0 auto", textAlign: "center" }}>
                    <Card.Content header={title} />
                  </h3>
                  {/* <hr /> */}
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

              {/* <hr /> */}

              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => {
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
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>

            {/* <---------------------------------> */}
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
