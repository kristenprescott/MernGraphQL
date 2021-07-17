import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      title
      body
      tags
      selectedFile
      createdAt
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
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
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
