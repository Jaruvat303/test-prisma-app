"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [sort, setSort] = useState("desc");

  const fetchPosts = async () => {
    try {
      const query = new URLSearchParams({ category, search, sort }).toString();
      const response = await axios.get(`/api/posts?${query}`);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const responce = await axios.get("/api/category");
      setAllCategory(responce.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id: Number) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      alert("Delete Successful");
      fetchPosts();
    } catch (error) {
      console.log(error);
      alert("SomeThing with wrong");
    }
  };

  const handleFilterChange = () => {
    fetchPosts();
    console.log({
      category,
      search,
      sort
    })
  };

  useEffect(() => {
    fetchPosts();
    fetchCategory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Blog Posts</h1>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search by Title __"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <select value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">Select Category</option>

          {allCategory.map((cat: any) => (
            <option value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="desc">Latest</option>
          <option value="asc">Oldtest</option>
        </select>

        <button onClick={handleFilterChange}>Apply</button>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post: any) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {post.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {post.category.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    href={`/edit/${post.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        href="/create"
      >
        Create a New Post
      </Link>
    </div>
  );
}
