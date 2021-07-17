import React, { useContext } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, Grid, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  console.log("postId: ", postId);

  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
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
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
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
              </Card.Content>

              {/* <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => {
                      console.log("deletePost");
                    }}
                  >
                    <Icon name="trash" style={{ margin: 0 }} />
                  </Button>
                )}
              </Card.Content> */}
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <>{postMarkup}</>;
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
      likeCount
      likes {
        id
        username
        createdAt
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
