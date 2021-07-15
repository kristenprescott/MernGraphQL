import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";

function Home() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column
              key={post.id}
              style={
                {
                  // width: "300px",
                  // height: "300px",
                  // border: "1px solid tomato",
                  // marginBottom: 20,
                }
              }
            >
              <PostCard post={post} />
              {/* <Image src="https://picsum.photos/300/300" /> */}
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;

const FETCH_POSTS_QUERY = gql`
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
