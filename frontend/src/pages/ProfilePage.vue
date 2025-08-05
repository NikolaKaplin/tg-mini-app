<template>
  <AppPage title="Мой профиль">
    <div id="webcrumbs">
      <div class="flex flex-col min-h-screen bg-white w-full max-w-md mx-auto">
        <div class="bg-primary h-40 relative">
          <div class="absolute -bottom-16 left-6">
            <div
              class="w-32 h-32 bg-primary rounded-full border-4 border-white"
            >
              <Avatar class="w-full h-full rounded-full">
                <AvatarImage src="" />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="absolute bottom-1 right-1 bg-black text-white rounded-full w-6 h-6"
            >
              <Camera class="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div class="mt-20 px-4">
          <div class="flex flex-col">
            <h2 class="font-bold text-xl">Никнейм</h2>
            <span class="text-amber-500">@username</span>
          </div>

          <Card class="mt-4">
            <CardHeader class="p-3">
              <CardTitle class="text-sm text-muted-foreground"
                >Описание профиля</CardTitle
              >
            </CardHeader>
            <CardContent class="p-3 pt-0">
              <Textarea
                class="mt-1 border border-gray-200 p-2 rounded text-gray-400"
                placeholder="Старое описание"
              />
              <p class="text-xs text-muted-foreground mt-1">51/500 символов</p>
            </CardContent>
          </Card>

          <Card class="mt-4">
            <CardHeader class="p-3">
              <CardTitle class="flex items-center font-bold">
                <Star class="w-4 h-4 mr-2 text-gray-800" />
                Подписка
              </CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0">
              <div class="flex justify-between items-center mb-4">
                <span>Уровни подписки</span>
                <Button
                  class="bg-primary text-white px-2 py-1 rounded flex items-center text-sm h-8"
                >
                  <Plus class="w-3 h-3 mr-1" />
                  Добавить уровень
                </Button>
              </div>

              <Separator class="my-3" />

              <div>
                <div class="flex justify-between items-center mb-2">
                  <h3 class="font-bold">Уровень 1</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="w-6 h-6 text-destructive"
                  >
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>

                <div class="mb-2">
                  <Label class="mb-1 block">Название</Label>
                  <Input
                    type="text"
                    placeholder="Введите название подписки"
                    class="w-full border border-gray-300 rounded p-2 text-sm placeholder-gray-400"
                  />
                </div>

                <div class="mb-2">
                  <Label class="mb-1 block">Сумма ($/мес)</Label>
                  <div class="flex items-center">
                    <Input
                      type="text"
                      placeholder="Введите цену подписки"
                      class="w-full border border-gray-300 rounded p-2 text-sm placeholder-gray-400"
                    />
                    <span class="ml-2 text-lg">$</span>
                  </div>
                </div>

                <div class="mb-2">
                  <Label class="mb-1 block">Описание</Label>
                  <Textarea
                    placeholder="Введите описание этой подписки..."
                    class="w-full border border-gray-300 rounded p-2 text-sm placeholder-gray-400 h-20"
                  />
                </div>

                <Alert class="mt-4 p-2">
                  <Info class="w-4 h-4 text-muted-foreground" />
                  <AlertDescription class="text-sm text-muted-foreground">
                    Подписчики получат доступ к эксклюзивному контенту
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card class="mt-4">
            <CardHeader class="p-3">
              <CardTitle class="flex items-center font-bold">
                <Heart class="w-4 h-4 mr-2 text-gray-800" />
                Донаты
              </CardTitle>
            </CardHeader>
            <CardContent class="p-3 pt-0">
              <div class="flex justify-between items-center mb-3">
                <span>Принимать донаты</span>
                <Switch />
              </div>

              <div class="mb-3">
                <Label class="mb-1 block">Минимальная сумма доната ($)</Label>
                <div class="flex items-center">
                  <Input
                    type="text"
                    class="w-full border border-gray-300 rounded p-2 text-sm"
                    value="50"
                  />
                  <span class="ml-2 text-lg">$</span>
                </div>
              </div>

              <div class="mb-2">
                <Label class="mb-1 block">Сообщение для донатеров</Label>
                <Textarea
                  class="w-full border border-gray-300 rounded p-2 text-sm text-gray-400 h-20"
                >
                  Старое сообщение
                </Textarea>
              </div>

              <p class="text-xs text-muted-foreground mb-3">0/200 символов</p>

              <Alert class="p-2">
                <Heart class="w-4 h-4 text-muted-foreground" />
                <AlertDescription class="text-sm text-muted-foreground">
                  Донатеры увидят персональное сообщение
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Button
            class="w-full bg-primary text-white py-3 rounded-md mt-4 mb-4 h-12"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import AppPage from "@/components/AppPage.vue";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Star, Plus, Trash2, Info, Heart } from "lucide-vue-next";
</script>
