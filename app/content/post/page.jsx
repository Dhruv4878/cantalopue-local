"use client";
import { Suspense } from "react";
import PostEditor from "@/components/Contentgenerate/Post";
import BusinessHeader from "@/components/businesses/logo";
import Toast from "@/components/Contentgenerate/Toast";

const MyPostView = () => {
  // This page now delegates fetching/rendering to PostEditor,
  // which loads by id from the backend using the query string.
  return (
    <>
      <BusinessHeader />
      <div className="pt-20" />
      <Suspense fallback={<div className="p-4 text-center">Loading post...</div>}>
        <PostEditor />
        <Toast />
      </Suspense>
    </>
  );
};

export default MyPostView;