import React from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: "",
    body: "",
    tags: [],
    selectedFile: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      // console.log("data", data);
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.title = "";
      values.body = "";
      values.tags = "";
      values.selectedFile = "";
    },
  });

  function createPostCallback() {
    createPost({ variables: { values } });
  }

  // if (error) {
  //   Alert.alert("Error", "Your post cannot be empty: " + concatErrors(error));
  // }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a Post: </h2>
        <Form.Field>
          <Form.Input
            placeholder="title"
            name="title"
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
          <Form.Input
            style={{ height: "250px" }}
            placeholder="body"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="tags"
            name="tags"
            onChange={onChange}
            value={values.tags}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="selectedFile"
            name="selectedFile"
            onChange={onChange}
            value={values.selectedFile}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>

      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ui className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ui>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $tags: [String]
    $selectedFile: String!
  ) {
    createPost(
      title: $title
      body: $body
      tags: $tags
      selectedFile: $selectedFile
    ) {
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
