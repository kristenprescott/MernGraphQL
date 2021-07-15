import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

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
  const likePost = () => {
    console.log("like post");
  };
  const commentOnPost = () => {
    console.log("comment on post.");
  };

  return (
    // <Card.Group centered>
    <Card fluid style={{ width: "100%", height: "100%" }}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Image src="https://picsum.photos/300/" />

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
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="blue" basic>
            {/* <Icon name="comment" /> */}
            <Icon name="comments" />
            {/* <Icon name="comment outline" /> */}
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
    // </Card.Group>
  );
}

export default PostCard;