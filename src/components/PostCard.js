import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";

function PostCard({
  post: {
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
  },
}) {
  const { user } = useContext(AuthContext);

  function likePost() {
    console.log("like post");
  }

  return (
    <Card fluid style={{ width: "100%", height: "100%" }}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>
          {username}

          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Content header={title} />
        </Card.Header>

        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Image src={selectedFile} />
      <Card.Content>
        {tags.map((tag) => (
          <Card.Content
            extra
            className="tags"
            key={tag}
            as={Link}
            to={`/tags/${id}`}
          >
            #{tag}{" "}
          </Card.Content>
        ))}
      </Card.Content>

      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="red" basic>
            <Icon name="heart" />

            {/* <Icon name="thumbs up" /> */}
            {/* <Icon name="thumbs up outline" /> */}

            {/* <Icon name="thumbs down" /> */}
            {/* <Icon name="thumbs down outline" /> */}
          </Button>
          <Label basic color="red" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
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
      </Card.Content>
    </Card>
  );
}

export default PostCard;
