import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function DeleteButton({ postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
      refreshPage();
      // TODO: remove post from cache
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => {
          console.log("deletePost");
          setConfirmOpen(true);
        }}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        // when user clicks 'no':
        onCancel={() => {
          setConfirmOpen(false);
        }}
        // when user clicks 'yes':
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
