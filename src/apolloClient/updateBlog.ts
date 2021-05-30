import { gql } from "apollo-boost";

const GET_BLOGS_LIST = gql`
  query BlogList {
    listBlogs {
      items {
        id
      }
    }
  }
`;

export const updateDeleteBlog = (cache, { data: { deleteBlog } }) => {
  const cachedData = cache.readQuery({ query: GET_BLOGS_LIST });
  const updatedList = cachedData.listBlogs.items.filter(
    blog => blog.id !== deleteBlog.id
  );

  const data = { ...cachedData.listBlogs, items: updatedList };
  console.log("delete data", data);
  console.log("cache", cache);
  cache.writeQuery({
    query: GET_BLOGS_LIST,
    data: { listBlogs: data }
  });
};
