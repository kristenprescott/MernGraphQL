import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_POSTS_QUERY } from "../utils/graphql";
import InvertedPopup from "../utils/InvertedPopup";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);

      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        // data.getPosts = [
        //   data.deletePost,
        //   ...data.getPosts.filter((p) => p.id !== postId),
        // ];
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
        console.log("delete comment data: ", data); // <<----------------- TODO: debug delete comment mutation
      }

      if (callback) {
        callback();
      }
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <InvertedPopup content={commentId ? "delete comment" : "delete post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => {
            setConfirmOpen(true);
          }}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </InvertedPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
        }}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default DeleteButton;
