import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import InvertedPopup from "../utils/InvertedPopup";

function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const refreshPage = () => {
    window.location.reload();
  };

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button onClick={refreshPage} color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button onClick={refreshPage} color="red" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <>
      <InvertedPopup content="like post">
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeButton}
          <Label basic color="red" pointing="left">
            {likeCount}
          </Label>
        </Button>
      </InvertedPopup>
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
