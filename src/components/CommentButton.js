import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import InvertedPopup from "../utils/InvertedPopup";

function CommentButton({ user, post: { id, comments, commentCount } }) {
  const [commented, setCommented] = useState(false);
  useEffect(() => {
    if (user && likes.find((comment) => comment.username === user.username)) {
      setCommented(true);
    } else {
      setCommented(false);
    }
  }, [user, comments]);

  const refreshPage = () => {
    window.location.reload();
  };

  const [commentPost] = useMutation(COMMENT_POST_MUTATION, {
    variables: { postId: id },
  });

  const commentButton = user ? (
    commented ? (
      <Button onClick={refreshPage} color="blue">
        <Icon name="comments" />
      </Button>
    ) : (
      <Button onClick={refreshPage} color="blue" basic>
        <Icon name="comments" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="blue" basic>
      <Icon name="comments" />
    </Button>
  );

  return (
    <InvertedPopup content="comment on post">
      <Button as="div" labelPosition="right" onClick={commentPost}>
        {commentButton}
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </InvertedPopup>
  );
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

export default CommentButton;
