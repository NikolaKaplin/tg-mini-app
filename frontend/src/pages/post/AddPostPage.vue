<template>
  <div class="flex-1 p-4 md:p-6 space-y-6 h-full overflow-y-auto">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-center md:text-left">Create Post</h1>
      <Separator class="bg-primary" />
    </div>

    <!-- Post Type Selector -->
    <div class="space-y-3">
      <Label class="text-lg font-semibold hidden md:block">Post Type</Label>
      <ToggleGroup 
        v-model="form.type"
        type="single" 
        class="bg-muted rounded-full p-1 max-w-max mx-auto md:mx-0"
      >
        <ToggleGroupItem 
          v-for="opt in contentType" 
          :key="opt.id" 
          :value="opt.id"
          class="px-4 py-2 rounded-full data-[state=on]:bg-primary data-[state=on]:text-white"
        >
          {{ opt.name }}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>

    <!-- Media Upload -->
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <Label class="text-lg font-semibold">Media</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          class="gap-1 text-muted-foreground"
          @click="triggerFileInput"
        >
          <PlusIcon class="h-4 w-4" />
          Add Media
        </Button>
      </div>

      <!-- Media Preview -->
      <div v-if="images.length > 0" class="relative">
        <Carousel class="w-full">
          <CarouselContent>
            <CarouselItem 
              v-for="(img, idx) in images"
              :key="idx"
            >
              <div class="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  :src="img.preview" 
                  alt="Preview" 
                  class="w-full h-full object-cover"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  class="absolute top-2 right-2 h-8 w-8"
                  @click="removeImage(idx)"
                >
                  <TrashIcon class="h-4 w-4" />
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <div v-else class="flex items-center justify-center rounded-lg border-2 border-dashed border-muted p-8">
        <div class="text-center space-y-2">
          <PhotoIcon class="mx-auto h-10 w-10 text-muted-foreground" />
          <p class="text-sm text-muted-foreground">No media added</p>
        </div>
      </div>

      <input 
        type="file" 
        accept="image/*" 
        multiple 
        class="hidden" 
        ref="fileInput" 
        @change="handleFiles"
      />
    </div>

    <!-- Description -->
    <div class="space-y-3">
      <Label class="text-lg font-semibold">Description</Label>
      <Textarea
        v-model="form.description"
        placeholder="Add description..."
        class="min-h-[100px] text-base"
        @focus="onFocus"
      />
    </div>

    <!-- Post Settings -->
    <div class="space-y-3">
      <Label class="text-lg font-semibold">Post Settings</Label>
      
      <div class="space-y-2">
        <Label>Audience</Label>
        <Select v-model="form.audience">
          <SelectTrigger>
            <SelectValue placeholder="Select audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Everyone</SelectItem>
            <SelectItem value="subscribers">Subscribers Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <Label>Auto Delete</Label>
        <Select v-model="form.autoDelete">
          <SelectTrigger>
            <SelectValue placeholder="Select auto-delete" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <!-- Submit Button -->
    <Button 
      class="w-full py-6 text-lg font-semibold" 
      @click="submitPost"
    >
      Publish
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { PlusIcon, PhotoIcon, TrashIcon } from '@/components/Icons';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


// Static content options
const contentType = [
  { id: 'post', name: 'Post' },
  { id: 'case', name: 'Case Study' },
  { id: 'content-bundle', name: 'Content Bundle' }
];

// Form with static defaults
const form = reactive({
  type: 'post',
  audience: 'all',
  autoDelete: 'never',
  description: ''
});

// Static images for preview
interface ImageItem { 
  file: { name: string; size: number }; 
  preview: string; 
}

const images = ref<ImageItem[]>([
  {
    file: { name: 'example1.jpg', size: 1024 },
    preview: 'https://storage.yandexcloud.net/chaose/hq720.jpg'
  },
  {
    file: { name: 'example2.jpg', size: 2048 },
    preview: 'https://storage.yandexcloud.net/chaose/hq720.jpg'
  }
]);

const fileInput = ref<HTMLInputElement>();

function triggerFileInput() {
  // Simulate file input click
  console.log('File input triggered');
}

function handleFiles() {
  // Static handler - doesn't actually process files
  console.log('Files would be processed here');
}

function removeImage(idx: number) {
  images.value.splice(idx, 1);
}

function onFocus(e: FocusEvent) {
  (e.target as HTMLElement).scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

function submitPost() {
  // Static submission handler
  console.log('Form would be submitted with:', form);
  alert('Post created successfully (static demo)');
  form.description = '';
  images.value = [];
}
</script>

<style scoped>
/* Ensure proper scrolling on mobile */
:root, body, #app {
  height: 100vh;
  overflow: hidden;
}

.flex-1.overflow-y-auto {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>