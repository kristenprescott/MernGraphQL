import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

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
    <Button as="div" labelPosition="right" onClick={commentPost}>
      {commentButton}
      <Label basic color="blue" pointing="left">
        {commentCount}
      </Label>
    </Button>
  );
}

const COMMENT_POST_MUTATION = gql`
  mutation commentPost($postId: ID!) {
    commentPost(postId: $postId) {
      id
      comments {
        id
        username
        body
      }
      commentCount
    }
  }
`;

export default CommentButton;
