import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

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

  return (
    <Card fluid style={{ width: "100%", height: "100%" }}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>
          {username}{" "}
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)} ago
          </Card.Meta>
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
      {/* <br /> */}
      {/* <hr /> */}

      <Card.Content extra>
        {tags.map((tag) => (
          <Card.Content className="tags" key={tag} as={Link} to={`/tags/${id}`}>
            #{tag}{" "}
          </Card.Content>
        ))}
      </Card.Content>

      <Card.Content extra>
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
      </Card.Content>
    </Card>
  );
}

export default PostCard;
