<template>
  <div class="flex-1 space-y-4 p-4">
    <!-- Header -->
    <div class="space-y-1">
      <h1 class="text-2xl font-bold tracking-tight">My Wallet</h1>
      <Separator />
    </div>

    <!-- Balance Card -->
    <Card>
      <CardHeader class="flex flex-row items-center space-x-4 pb-4">
        <div class="rounded-full bg-primary p-3">
          <Wallet2Icon class="h-5 w-5 text-primary-foreground" />
        </div>
        <div class="flex flex-col">
          <CardDescription>Current Balance</CardDescription>
          <CardTitle class="text-3xl">$100.500</CardTitle>
        </div>
      </CardHeader>
    </Card>

    <!-- Withdrawal Form -->
    <Card>
      <CardHeader>
        <CardTitle>Withdraw Funds</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex gap-2">
          <Button class="w-full">Withdraw</Button>
        </div>

        <div class="relative flex items-center">
          <div
            class="absolute left-3 inline-flex items-center justify-center rounded-md bg-secondary px-2 py-1"
          >
            <span class="text-xs font-medium">$GOVNO</span>
          </div>
          <Input
            inputmode="decimal"
            pattern="[0-9,]*"
            placeholder="0.00"
            class="pl-20"
          />
        </div>

        <Button variant="destructive" class="w-full">
          Withdraw to $GOVNO
        </Button>
      </CardContent>
    </Card>

    <!-- Transaction History -->
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <!-- Deposit Transaction -->
        <div class="flex items-center justify-between rounded-lg border p-3">
          <div class="flex items-center space-x-3">
            <div class="rounded-full bg-green-100 p-2">
              <PlusIcon class="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p class="text-sm font-medium">Deposit</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-green-600">+$50.000</p>
            <p class="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>

        <!-- Withdrawal Transaction -->
        <div class="flex items-center justify-between rounded-lg border p-3">
          <div class="flex items-center space-x-3">
            <div class="rounded-full bg-red-100 p-2">
              <MinusIcon class="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p class="text-sm font-medium">Withdrawal</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-red-600">-$20.500</p>
            <p class="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>

        <!-- Another Deposit -->
        <div class="flex items-center justify-between rounded-lg border p-3">
          <div class="flex items-center space-x-3">
            <div class="rounded-full bg-green-100 p-2">
              <PlusIcon class="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p class="text-sm font-medium">Deposit</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-semibold text-green-600">+$70.000</p>
            <p class="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Wallet2Icon, PlusIcon, MinusIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
</script>
