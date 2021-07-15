import React from "react";
import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  query getPosts(){
    {
    getPosts {
      id
      username
      title
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
  }
`;
