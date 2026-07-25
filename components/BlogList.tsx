"use client";

import { motion, type Variants } from "framer-motion";
import { PostCard } from "@/components/PostCard";
import type { PostMeta } from "@/lib/types";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={item}>
          <PostCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}
