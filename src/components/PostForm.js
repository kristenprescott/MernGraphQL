import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(_, result) {
      console.log("res: ", result);
      values.title = "";
      values.body = "";
      values.tags = "";
      values.selectedFile = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a Post: </h2>
      <Form.Field>
        <Form.Input
          placeholder="title"
          name="title"
          onChange={onChange}
          value={values.title}
          //   error={err}
        />
        <Form.Input
          style={{ height: "250px" }}
          placeholder="body"
          name="body"
          onChange={onChange}
          value={values.body}
          //   error={err}
        />
        <Form.Input
          placeholder="tags"
          name="tags"
          onChange={onChange}
          value={values.tags}
          //   error={err}
        />
        <Form.Input
          placeholder="selectedFile"
          name="selectedFile"
          onChange={onChange}
          value={values.selectedTag}
          //   error={err}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      title
      username
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

export default PostForm;
