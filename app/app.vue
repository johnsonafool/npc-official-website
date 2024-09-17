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
  title: '北科程式設計研究社',
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' },
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],
})

const routes = {
  '/': '關於',
  '/projects': '專案',
}

const breakpoints = useBreakpoints(breakpointsSematic)
const isMobile = breakpoints.smaller('tablet')

const [mobileMenuOpen, toggleMobileMenu] = useToggle(false)
</script>

<template>
  <NuxtRouteAnnouncer />

  <header>
    <div id="header-container">
      <div class="left">
        <a href="/">
          <img src="assets/npc-horizontal.svg">
        </a>
      </div>

      <template v-if="isMobile">
        <div class="right">
          <ul>
            <li>
              <button @click="toggleMobileMenu()">
                <IconClose v-if="mobileMenuOpen" />
                <IconMenu v-else />
              </button>
            </li>
          </ul>
        </div>
      </template>

      <template v-else>
        <nav class="center">
          <ul>
            <li
              v-for="(route, path) in routes"
              :key="path"
            >
              <NuxtLink :to="path">
                {{ route }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="right">
          <ul>
            <li>
              <a
                href="https://to.ntut.club/discord"
                target="_blank"
              ><IconDiscord /></a>
            </li>
            <li>
              <a
                href="https://github.com/NTUT-NPC"
                target="_blank"
              ><IconGitHub /></a>
            </li>
            <li>
              <button @click="toggleDark()">
                <IconMoon />
              </button>
            </li>
          </ul>
        </div>
      </template>
    </div>

    <ul
      v-if="mobileMenuOpen"
      id="header-mobile-menu"
    >
      <li
        v-for="(name, path) in routes"
        :key="path"
      >
        <NuxtLink
          class="mobile-menu-route"
          :to="path"
          @click="toggleMobileMenu()"
        >
          {{ name }}
        </NuxtLink>
      </li>
      <div class="separator" />
      <li>
        <a
          href="https://to.ntut.club/discord"
          target="_blank"
        ><IconDiscord />Discord</a>
      </li>
      <li>
        <a
          href="https://github.com/NTUT-NPC"
          target="_blank"
        ><IconGitHub />GitHub</a>
      </li>
      <div class="separator" />
      <li>
        <button @click="() => { toggleDark(); toggleMobileMenu(); }">
          <IconMoon />深色主題
        </button>
      </li>
    </ul>
  </header>

  <NuxtPage />
</template>

<style>
body {
  font-family: 'Cubic 11';
}

header {
  background-color: #333;
  color: white;

  ul {
    display: flex;
    gap: 0.5rem;
    padding: 0;
    > li {
      display: flex;
      align-items: center;
      list-style: none;

      &:hover {
        cursor: pointer;
        background-color: #fff3;
      }
    }
  }

  button,
  a {
    all: unset;
    display: inline-block;
    padding: 0.5rem;
  }

  &:has(#header-mobile-menu) {
    position: fixed;
    inset: 0;
  }
}

#header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding: 0.5rem 2rem;

  > * {
    flex: 1;
    display: flex;
    align-items: center;
  }

  > .left img {
    height: 2rem;
  }

  > .center {
    justify-content: center;

    .router-link-active {
      text-decoration: underline;
      text-underline-offset: 0.5rem;
    }
  }

  > .right {
    justify-content: flex-end;
  }
}

#header-mobile-menu {
  height: 100%;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;

  li {
    display: flex;
    align-items: center;

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

  .separator {
    border-top: calc(1rem / 11) solid darkgray;
  }
}
</style>
