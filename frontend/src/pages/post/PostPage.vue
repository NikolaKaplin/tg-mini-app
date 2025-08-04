<script lang="ts" setup>
import PostCard from "@/components/shared/PostCard.vue";
import { useRouter } from "vue-router";
import { ArrowIcon } from "@/components/Icons";
import { ref } from "vue";

const router = useRouter();

// Static post data
const post = ref({
  id: 1,
  title: "Example Post Title",
  content: "This is an example post content with some details about the topic. It might contain multiple paragraphs and other rich content.",
  author: {
    id: 1,
    username: "johndoe",
    avatar: "https://github.com/shadcn.png"
  },
  createdAt: "2023-10-15T14:30:00Z",
  likes: 42,
  comments: [
    {
      id: 1,
      content: "This is a great post!",
      author: {
        id: 2,
        username: "janedoe",
        avatar: "https://github.com/shadcn.png"
      },
      createdAt: "2023-10-15T15:00:00Z"
    },
    {
      id: 2,
      content: "Thanks for sharing this information.",
      author: {
        id: 3,
        username: "bobsmith",
        avatar: "https://github.com/shadcn.png"
      },
      createdAt: "2023-10-15T16:30:00Z"
    }
  ]
});
</script>

<template>
  <div class="container mx-auto max-w-3xl py-4 px-4">
    <button 
      class="rounded-lg bg-white p-2 w-10 h-10 mb-4 flex justify-center items-center shadow-sm hover:bg-gray-50 transition-colors" 
      @click="router.back()"
    >
      <ArrowIcon class="w-5 h-5" />
    </button>
    
    <PostCard
      type="one"
      :key="post.id"
      :post="post"
    />
  </div>
</template>