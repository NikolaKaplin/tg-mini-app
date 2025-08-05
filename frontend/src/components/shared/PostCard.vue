<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'

const post = {
  id: 2,
  content: "Thanks for sharing this information.",
  author: {
    id: 3,
    username: "bobsmith",
    avatar: "https://github.com/shadcn.png"
  },
  createdAt: "2023-10-15T16:30:00Z",
  likes: 24,
  comments: 5
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="max-w-2xl w-full rounded-xl border bg-card text-card-foreground shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center space-x-3">
        <Avatar class="h-10 w-10">
          <AvatarImage :src="post.author.avatar" />
          <AvatarFallback>
            {{ post.author.username.charAt(0).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
        <div>
          <p class="font-medium">{{ post.author.username }}</p>
          <p class="text-sm text-muted-foreground">
            {{ formatDate(post.createdAt) }}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </div>

    <!-- Content -->
    <div class="px-4 pb-3">
      <p class="text-sm">{{ post.content }}</p>
    </div>

    <!-- Image placeholder (optional) -->
    <!-- <div class="aspect-square w-full bg-muted"></div> -->

    <!-- Actions -->
    <div class="flex items-center justify-between px-4 py-2 border-t">
      <div class="flex space-x-4">
        <Button variant="ghost" size="sm" class="gap-1.5 text-muted-foreground">
          <Heart class="h-4 w-4" />
          <span>{{ post.likes }}</span>
        </Button>
        <Button variant="ghost" size="sm" class="gap-1.5 text-muted-foreground">
          <MessageCircle class="h-4 w-4" />
          <span>{{ post.comments }}</span>
        </Button>
      </div>
      
      <Button variant="ghost" size="sm" class="text-muted-foreground">
        <Send class="h-4 w-4 mr-1.5" />
        Share
      </Button>
    </div>

    <!-- Comment input -->
    <div class="flex items-center space-x-2 p-4 border-t">
      <Avatar class="h-9 w-9">
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
      <div class="flex-1 relative">
        <input 
          placeholder="Write a comment..."
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <Send class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>