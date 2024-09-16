<script setup lang="ts">
import 'assets/reset.css'
import 'assets/cubic-11.css'

import { breakpointsSematic } from '@vueuse/core'
import IconMoon from '~icons/mingcute/moon-fill'
import IconDiscord from '~icons/mingcute/discord-fill'
import IconGitHub from '~icons/mingcute/github-fill'
import IconClose from '~icons/mingcute/close-fill'
import IconMenu from '~icons/mingcute/menu-fill'

useHead({
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' },
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],
})

const breakpoints = useBreakpoints(breakpointsSematic)
const mobile = breakpoints.smaller('tablet')

const mobileMenuOpen = ref(false)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <header class="header">
      <div class="left">
        <img src="assets/npc-horizontal.svg">
      </div>

      <div
        v-if="mobile"
        class="right"
      >
        <DropdownMenuRoot v-model:open="mobileMenuOpen">
          <DropdownMenuTrigger class="mobile-menu-trigger">
            <IconClose v-if="mobileMenuOpen" />
            <IconMenu v-else />
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent class="mobile-menu-content">
              <DropdownMenuItem>
                <NuxtLink
                  class="mobile-menu-route"
                  to="/"
                >
                  關於
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NuxtLink
                  class="mobile-menu-route"
                  to="/projects"
                >
                  專案
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a
                  href="https://to.ntut.club/discord"
                  target="_blank"
                ><IconDiscord />Discord</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href="https://github.com/NTUT-NPC"
                  target="_blank"
                ><IconGitHub />GitHub</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><button><IconMoon />深色主題</button></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </div>

      <template v-else>
        <nav class="center">
          <ul>
            <li>
              <NuxtLink to="/">
                關於
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projects">
                專案
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="right">
          <ul>
            <li><IconDiscord /></li>
            <li><IconGitHub /></li>
            <li><IconMoon /></li>
          </ul>
        </div>
      </template>
    </header>

    <NuxtPage />
  </div>
</template>

<style>
body {
  font-family: 'Cubic 11';
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  height: 4rem;
  padding: 0.5rem 2rem;

  > * {
    flex: 1;
    display: flex;
    align-items: center;
  }

  > .left > img {
    height: 2rem;
  }

  > .center {
    justify-content: center;

    a.router-link-active {
      text-decoration: underline;
      text-underline-offset: 0.5rem;
    }
  }

  > .right {
    justify-content: flex-end;
  }

  ul {
    display: flex;
    gap: 0.5rem;
    > li {
      padding: 0.25rem;
      list-style: none;
    }
  }
}

.header a,
.mobile-menu-content a {
  color: inherit;
  text-decoration: none;
}

.mobile-menu-trigger {
  all: unset;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
}

.mobile-menu-content {
  width: 100vw;
  height: 100vh;
  background-color: #333;
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;

  .mobile-menu-route {
    &::before {
      content: '◆';
      display: inline-block;
      visibility: hidden;
    }
    &.router-link-active::before {
      visibility: visible;
    }
  }

  [role='menuitem'] {
    display: flex;
    align-items: center;
    &:hover {
      background-color: #fff3;
    }

    > * {
      all: unset;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.5rem;
      width: 100%;
      height: 100%;
    }
  }

  [role='separator'] {
    border-top: calc(1rem / 11) solid darkgray;
  }
}
</style>
