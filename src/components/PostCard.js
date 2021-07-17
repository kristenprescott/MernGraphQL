import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
// import CommentButton from './CommentButton';
import DeleteButton from "./DeleteButton";
import InvertedPopup from "../utils/InvertedPopup";

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
        {/* TODO: add more info to user popup */}
        {/* TODO: make Profile component, link user profile here */}
        <InvertedPopup content={username}>
          <Image
            floated="right"
            size="mini"
            // TODO: make user image upload functionality
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
        </InvertedPopup>

        <Card.Header>
          <InvertedPopup content={`go to ${username}'s profile`}>
            {/* TODO: link to user profile once Profile component is made */}
            <div style={{ cursor: "pointer" }}>{username} </div>
          </InvertedPopup>
          <Card.Meta
            as={Link}
            to={`/posts/${id}`}
            onClick={() => {
              console.log("postId: ", `${id}`);
            }}
          >
            {moment(createdAt).fromNow(true)} ago
          </Card.Meta>
          <br />
          <br />
          <hr />
          <Card.Content>
            <Card.Header>
              {" "}
              <h3
                onClick={() => {
                  window.location.href = `/posts/${id}`;
                }}
                style={{
                  cursor: "pointer",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                {title}
              </h3>
            </Card.Header>
          </Card.Content>
          <hr />
        </Card.Header>

        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Image src={selectedFile} />
      <br />
      <hr />

      <Card.Content extra>
        {tags.map((tag) => (
          <Card.Content className="tags" key={tag} as={Link} to={`/tags/${id}`}>
            #{tag}{" "}
          </Card.Content>
        ))}
      </Card.Content>

      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />

        <InvertedPopup content="comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comment" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </InvertedPopup>

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
