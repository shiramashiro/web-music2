<script setup lang="ts">
import { ref } from 'vue'
import musics from '../assets/data/musics'

let audio = ref<any>(null)

let cureentIndex = ref(0) // 当前歌曲索引
let isPlaying = ref(false) // 是否播放中
let songs = ref(musics) // 歌曲列表
let lastSong = ref(songs.value[songs.value.length - 1]) // 上一首歌曲
let currentSong = ref(songs.value[cureentIndex.value]) // 当前歌曲
let nextSong = ref(songs.value[cureentIndex.value + 1]) // 下一首歌曲
let animation = ref({
    last: false,
    next: false,
    currentToNex: false,
    lastToCurrent: false,
    dropdown: false,
    dropup: false
})
let axisWidth = ref(0) // 进度条宽

/**
 * 对lastSong、currentSong、nextSong进行赋值。
 */
function setSongsPosition(): void {
    let startPoint: number = 0 // 开始临界值
    let endPoint: number = songs.value.length - 1 // 终点临界值
    let lastIndex: number = 0 // 上一首歌曲索引值
    let nextIndex: number = 0 // 下一首歌曲索引值
    if (cureentIndex.value == startPoint) {
        nextIndex = cureentIndex.value + 1
        lastIndex = endPoint
    } else if (cureentIndex.value == endPoint) {
        nextIndex = 0
        lastIndex = cureentIndex.value - 1
    } else {
        nextIndex = cureentIndex.value + 1
        lastIndex = cureentIndex.value - 1
    }
    nextSong.value = songs.value[nextIndex]
    lastSong.value = songs.value[lastIndex]
}

/**
 * 播放下一首歌曲
 */
function playNextSong(): void {
    animation.value.currentToNex = true
    animation.value.next = true
    setTimeout(() => {
        cureentIndex.value++
        if (cureentIndex.value > songs.value.length - 1) {
            cureentIndex.value = 0
        }
        currentSong.value = songs.value[cureentIndex.value]
        setSongsPosition()
        animation.value.currentToNex = false
        animation.value.next = false
    }, 1000)
}

/**
 * 控制是否播放歌曲
 */
function controlAudio(): void {
    if (isPlaying.value) {
        audio.value.pause()
        isPlaying.value = false
    } else {
        audio.value.play()
        isPlaying.value = true
    }
}

/**
 * 播放上一首歌曲
 */
function playLastSong(): void {
    animation.value.lastToCurrent = true
    animation.value.last = true
    setTimeout(() => {
        cureentIndex.value--
        if (cureentIndex.value < 0) {
            cureentIndex.value = songs.value.length - 1
        }
        currentSong.value = songs.value[cureentIndex.value]
        setSongsPosition()
        animation.value.lastToCurrent = false
        animation.value.last = false
    }, 1000)
}

/**
 * 控制是否展示歌曲列表
 */
function controlSongPanel(): void {
    if (!animation.value.dropdown) {
        animation.value.dropdown = true
    } else {
        animation.value.dropdown = false
        animation.value.dropup = true
        setTimeout(() => {
            animation.value.dropup = false
        }, 500)
    }
}

/**
 * 歌曲每播放一帧调用该函数
 */
function timeupdate(): void {}

/**
 * 当歌曲播放完成时
 */
function ended(): void {}
</script>

<template>
    <div id="player">
        <div class="masking" v-bind:style="{ backgroundImage: 'url(' + currentSong.surface + ')' }"></div>
        <div class="content">
            <div class="player-row-1 flex flex-between">
                <img class="col-1" src="../assets/img/dropdown.png" alt="" />
                <div class="col-2">
                    <div class="title">{{ currentSong.name }}</div>
                    <div class="album">{{ currentSong.album }}</div>
                </div>
                <img class="col-3" src="../assets/img/sharing.png" alt="" />
            </div>
            <div class="player-row-2 flex flex-center">
                <div class="film" style="display: none" v-bind:class="{ 'last-film': animation.last }">
                    <img class="surface" v-bind:src="lastSong.surface" />
                </div>
                <div
                    class="film"
                    v-bind:class="{
                        'from-current-to-next-film': animation.currentToNex,
                        'from-last-to-current-film': animation.lastToCurrent
                    }"
                >
                    <img class="surface" v-bind:src="currentSong.surface" />
                </div>
                <div class="film" style="display: none" v-bind:class="{ 'next-film': animation.next }">
                    <img class="surface" v-bind:src="nextSong.surface" />
                </div>
            </div>
            <!-- 歌词 -->
            <div class="player-row-3">
                <div class="lyrics-content" style="transition: 1s" v-html="currentSong.lyrics"></div>
            </div>
            <div class="player-row-4">
                <div class="row-1 flex flex-between">
                    <img class="col-1" src="../assets/img/like.png" />
                    <img class="col-2" src="../assets/img/download.png" />
                    <img class="col-3" src="../assets/img/comments.png" />
                </div>
                <!-- 进度条 -->
                <div class="row-2 flex flex-between">
                    <div class="processor">
                        <!-- 轴 -->
                        <div class="axis" v-bind:style="{ width: axisWidth + '%' }"></div>
                    </div>
                </div>
                <!-- 操作 -->
                <div class="row-3 flex flex-between">
                    <img class="col-1" src="../assets/img/recycle.png" />
                    <img class="col-2" v-on:click="playLastSong" src="../assets/img/last.png" />
                    <img class="col-3" v-on:click="controlAudio" src="../assets/img/last.png" />
                    <img class="col-4" v-on:click="playNextSong" src="../assets/img/next.png" />
                    <img class="drop-or-down-music-list" v-on:click="controlSongPanel" src="../assets/img/play-list_white.png" />
                </div>
            </div>
        </div>
        <!-- 音乐列表 -->
        <div class="music-list" v-bind:class="{ 'dropup-list': animation.dropup, 'dropdown-list': animation.dropdown }">
            <!-- 列表菜单 -->
            <div class="list-menu flex flex-end">
                <!-- 关闭按钮 -->
                <img class="close" v-on:click="controlSongPanel" src="../assets/img/close.png" />
            </div>
            <!-- 列表头部 -->
            <div class="list-header flex flex-between">
                <div class="col-1">歌曲名</div>
                <div class="col-2">专辑</div>
            </div>
            <!-- 列表项 -->
            <div
                class="list-item flex flex-between"
                v-bind:class="{ 'playing-music': index == cureentIndex ? true : false }"
                v-for="(item, index) in songs"
                :key="index"
            >
                <div class="col-1 flex">
                    <img class="current-play" src="../assets/img/playing.png" v-if="index == cureentIndex" />
                    <div class="name">{{ item.name }}</div>
                </div>
                <div class="col-2">{{ item.album }}</div>
            </div>
        </div>
        <audio v-on:ended="ended" v-on:timeupdate="timeupdate" ref="audio" v-bind:src="currentSong.src"></audio>
    </div>
</template>

<style lang="scss" scoped>
#player {
    position: relative;
    height: calc(100vh);
}

.masking {
    top: 0;
    left: 0;
    content: '';
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(50px);
    position: absolute;
    background-size: cover;
    background-repeat: no-repeat;
}

/* 调整全局内边距 */
.content {
    padding: 3vw;
}

.player-row-1 {
    display: flex;
    align-content: center;
}

/* 顶部两边的图标大小 */
.player-row-1 .col-1,
.player-row-1 .col-3 {
    width: 6vw;
    height: 6vw;
}

.player-row-1 .col-2 {
    width: 190px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: white;
    text-align: center;
}

.player-row-1 .col-2 .title {
    font-size: 16px;
}

.player-row-1 .col-2 .album {
    font-size: 12px;
}

/* 唱片 */
.player-row-2 {
    height: 43vh;
    margin-top: 14vw;
    position: relative;
}

/* 歌词 */
.player-row-3 {
    height: 100px;
    font-size: 4vw;
    overflow: hidden;
    margin-top: 2.5vw;
    line-height: 30px;
    text-align: center;
    word-break: break-all;
    color: rgb(230 230 230 / 90%);
}

.player-row-4 {
    margin-top: 4vh;
}

.player-row-4 .row-1 {
    margin: 0 16vw;
}

.player-row-4 .row-1 img {
    width: 7vw;
    height: 7vw;
}

/* 进度条 */
.player-row-4 .row-2 {
    margin: 4vh 0;
    color: rgb(233, 233, 233);
}

/* 开始时间和结束时间 */
.player-row-4 .row-2 .start-time,
.player-row-4 .row-2 .end-time {
    font-size: 1vw;
}

.player-row-4 .row-2 .start-time {
    margin-right: 3vw;
}

.player-row-4 .row-2 .end-time {
    margin-left: 3vw;
}

/* 进度条 */
.player-row-4 .row-2 .processor {
    width: 100%;
    height: 0.5vh;
    background-color: rgb(176 176 176);
}

.player-row-4 .row-2 .processor .axis {
    position: relative;
    height: 100%;
    border-radius: 0 5px 5px 0px;
    background-color: white;
}

.player-row-4 .row-2 .processor .axis::after {
    content: '';
    position: absolute;
    border-radius: 100%;
    height: 8px;
    width: 8px;
    top: -50%;
    right: -1vw;
    background-color: white;
}

.player-row-4 .row-3 img {
    width: 5vw;
    height: 5vw;
}

.player-row-4 .row-3 .col-3 {
    width: 8vw !important;
    height: 8vw !important;
}

/* 唱片 */
.film {
    width: 47vw;
    height: 47vw;
    position: absolute;
    border-radius: 100%;
    border: 10vw solid black;
    box-shadow: 2vw 2vw 3vw #5451519c;
}

/* 唱片封面 */
.film .surface {
    width: 47vw;
    height: 47vw;
    border-radius: 100%;
}

/* 上一个唱片的动画 */
.last-film {
    display: block !important;
    animation-name: last-film-animation;
    animation-duration: 1000ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
}

/* 从上一个到中间的动画 */
.from-last-to-current-film {
    display: block !important;
    animation-name: from-last-to-current-film-animation;
    animation-duration: 1000ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
}

/* 从中间到下一个唱片的动画 */
.from-current-to-next-film {
    display: block !important;
    animation-name: from-current-to-last-film-animation;
    animation-duration: 1000ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
}

/* 下一个唱片的动画 */
.next-film {
    display: block !important;
    animation-name: next-film-animation;
    animation-duration: 1000ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
}

@keyframes last-film-animation {
    0% {
        transform: translate(-130%, 0);
    }
    100% {
        transform: translate(0%, 0);
    }
}

@keyframes from-last-to-current-film-animation {
    0% {
        transform: translate(0%, 0);
    }
    100% {
        transform: translate(130%, 0);
    }
}

@keyframes from-current-to-last-film-animation {
    0% {
        transform: translate(0%, 0);
    }
    100% {
        transform: translate(-130%, 0);
    }
}

@keyframes next-film-animation {
    0% {
        transform: translate(130%, 0);
    }
    100% {
        transform: translate(0%, 0);
    }
}

/* 音乐列表 */
.music-list {
    display: none;
    font-size: 3vw;
    position: absolute;
    width: 80vw;
    background-color: #f7f7f7e6;
    left: 0%;
    bottom: 0%;
    color: #525050;
    padding: 3vw;
    border-radius: 3vw;
    background-size: 100% 100%;
    height: 80vw;
}

/* 列表菜单 */
.music-list .list-menu .close {
    width: 4vw;
    height: 4vw;
    margin: 1.5vw 0;
}

/* 列表头部 */
.music-list .list-header {
    margin-bottom: 3vw;
    font-size: 4vw;
    font-weight: bold;
}

.music-list .list-header .col-1 {
    flex: 2;
}

.music-list .list-header .col-2 {
    flex: 1;
}

/* 列表项 */
.music-list .list-item {
    margin: 3vw 0;
}

.music-list .list-item .col-1 {
    flex: 2;
    font-size: 4vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.music-list .list-item .col-1 .current-play {
    width: 12px;
    height: 12px;
    margin-right: 4px;
}

.music-list .list-item .col-2 {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.playing-music > div {
    font-weight: bold;
    color: #d37070;
}

/* 上拉音乐列表时的动画 */
.dropup-list {
    display: block !important;
    animation-name: dropup-music-list;
    animation-duration: 500ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
}

/* 下拉音乐列表时的动画 */
.dropdown-list {
    display: block !important;
    animation-name: dropdown-music-list;
    animation-duration: 500ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
}

@keyframes dropup-music-list {
    0% {
        transform: translate(0, 0%);
    }

    100% {
        transform: translate(0, 100%);
    }
}

@keyframes dropdown-music-list {
    0% {
        transform: translate(0, 100%);
    }
    100% {
        transform: translate(0, 0%);
    }
}
</style>
