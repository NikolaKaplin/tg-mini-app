<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { HeartIcon, MessageCircleIcon, Share2Icon } from 'lucide-vue-next'
import { formatDistanceToNow } from 'date-fns'

defineProps<{
  post: any
  type?: 'one' | 'multiple'
}>()
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center gap-4 pb-3">
      <Avatar>
        <AvatarImage :src="post.author.avatar" />
        <AvatarFallback>{{ post.author.username.charAt(0).toUpperCase() }}</AvatarFallback>
      </Avatar>
      <div class="flex flex-col">
        <span class="font-medium">{{ post.author.username }}</span>
        <span class="text-sm text-gray-500">
          {{ formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) }}
        </span>
      </div>
    </CardHeader>

    <CardContent class="pb-3">
      <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
      <p class="text-gray-700 whitespace-pre-line">{{ post.content }}</p>
    </CardContent>

    <CardFooter class="flex justify-between border-t pt-3">
      <div class="flex gap-4">
        <Button variant="ghost" size="sm" class="gap-1 text-gray-600">
          <HeartIcon class="w-4 h-4" />
          <span>{{ post.likes }}</span>
        </Button>
        
        <Button variant="ghost" size="sm" class="gap-1 text-gray-600">
          <MessageCircleIcon class="w-4 h-4" />
          <span>{{ post.comments.length }}</span>
        </Button>
      </div>
      
      <Button variant="ghost" size="sm" class="text-gray-600">
        <Share2Icon class="w-4 h-4" />
      </Button>
    </CardFooter>

    <!-- Comments section -->
    <div v-if="type === 'one'" class="border-t">
      <div v-for="comment in post.comments" :key="comment.id" class="p-4 border-b last:border-b-0">
        <div class="flex gap-3">
          <Avatar class="h-8 w-8">
            <AvatarImage :src="comment.author.avatar" />
            <AvatarFallback>{{ comment.author.username.charAt(0).toUpperCase() }}</AvatarFallback>
          </Avatar>
          
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-sm">{{ comment.author.username }}</span>
              <span class="text-xs text-gray-500">
                {{ formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) }}
              </span>
            </div>
            <p class="text-sm mt-1">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>