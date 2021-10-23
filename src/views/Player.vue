<script setup lang="ts">
import { ref } from 'vue'
import musics from '../assets/data/musics'

let audio = ref<any>(null)
let progress = ref<any>(null)
let controlIcon = ref('/icon/播放.png')

let songs = ref(musics) // 歌曲列表
let isPlaying = ref(false) // 是否播放中
let currentIndex = ref(0) // 当前歌曲索引
let lastSong = ref(songs.value[songs.value.length - 1]) // 上一首歌曲
let currentSong = ref(songs.value[currentIndex.value]) // 当前歌曲
let nextSong = ref(songs.value[currentIndex.value + 1]) // 下一首歌曲
let animation = ref({
    lastFilm: false,
    nextFilm: false,
    currentToNextFilm: false,
    lastToCurrentFilm: false,
    isDroppedDown: false,
    isDroppedUp: false
})

let axis = ref(0) // 进度轴

/**
 * 改变歌曲的顺序
 */
function replaceSongsSequence(callback: Function): void {
    callback()

    let startPoint: number = 0 // 歌曲列表开始索引
    let endPoint: number = songs.value.length - 1 // 歌曲列表结束索引
    let lastIndex: number = 0 // 上一首歌曲索引
    let nextIndex: number = 0 // 下一首歌曲索引

    if (currentIndex.value == startPoint) {
        nextIndex = currentIndex.value + 1
        lastIndex = endPoint
    } else if (currentIndex.value == endPoint) {
        nextIndex = startPoint
        lastIndex = currentIndex.value - 1
    } else {
        nextIndex = currentIndex.value + 1
        lastIndex = currentIndex.value - 1
    }

    currentSong.value = songs.value[currentIndex.value]
    nextSong.value = songs.value[nextIndex]
    lastSong.value = songs.value[lastIndex]
}

/**
 * 控制是否播放歌曲
 */
function controlAudio(): void {
    if (isPlaying.value) {
        audio.value.pause()
        isPlaying.value = false
        controlIcon.value = '/icon/播放.png'
    } else {
        audio.value.play()
        isPlaying.value = true
        controlIcon.value = '/icon/暂停.png'
    }
}

/**
 * 播放下一首歌曲
 */
function setNextSong(): void {
    animation.value.currentToNextFilm = true
    animation.value.nextFilm = true
    setTimeout(() => {
        replaceSongsSequence(() => {
            currentIndex.value++
            if (currentIndex.value > songs.value.length - 1) {
                currentIndex.value = 0
            }
        })
        animation.value.currentToNextFilm = false
        animation.value.nextFilm = false
    }, 1000)
}

/**
 * 播放上一首歌曲
 */
function setLastSong(): void {
    animation.value.lastToCurrentFilm = true
    animation.value.lastFilm = true
    setTimeout(() => {
        replaceSongsSequence(() => {
            currentIndex.value--
            if (currentIndex.value < 0) {
                currentIndex.value = songs.value.length - 1
            }
        })
        animation.value.lastToCurrentFilm = false
        animation.value.lastFilm = false
    }, 1000)
}

/**
 * 控制是否展示歌曲列表
 */
function controlSongsPanel(): void {
    if (!animation.value.isDroppedDown) {
        animation.value.isDroppedDown = true
    } else {
        animation.value.isDroppedDown = false
        animation.value.isDroppedUp = true
        setTimeout(() => {
            animation.value.isDroppedUp = false
        }, 500)
    }
}

/**
 * 歌曲每播放一帧调用该函数
 */
function timeupdate(): void {
    axis.value = (audio.value.currentTime / audio.value.duration) * 100
}

/**
 * 改变歌曲进度条
 */
function dragProgress(event: any): void {
    let rate = event.offsetX / progress.value.offsetWidth
    axis.value = rate * 100
    audio.value.currentTime = audio.value.duration * rate
}

/**
 * 当歌曲播放完成时
 */
function ended(): void {
    controlAudio()
    setNextSong()
}
</script>

<template>
    <div id="player">
        <div class="matte" :style="{ backgroundImage: 'url(' + currentSong.surface + ')' }"></div>

        <div class="container">
            <!-- 头部 -->
            <div class="header flex flex-between items-center">
                <img class="back-icon" src="../assets/img/dropdown.png" />
                <div class="middle">
                    <div class="title">{{ currentSong.name }}</div>
                    <div class="album">{{ currentSong.album }}</div>
                </div>
                <img class="share-icon" src="../assets/img/sharing.png" />
            </div>

            <!-- 唱片 -->
            <div class="film-container flex flex-center">
                <!-- 上一首唱片 -->
                <div class="film-item" :class="{ 'last-film': animation.lastFilm }" style="display: none">
                    <img class="surface" :src="lastSong.surface" />
                </div>

                <!-- 当前唱片 -->
                <div
                    class="film-item"
                    :class="{
                        'from-current-to-next-film': animation.currentToNextFilm,
                        'from-last-to-current-film': animation.lastToCurrentFilm
                    }"
                >
                    <img class="surface" :src="currentSong.surface" />
                </div>

                <!-- 下一首唱片 -->
                <div class="film-item" :class="{ 'next-film': animation.nextFilm }" style="display: none">
                    <img class="surface" :src="nextSong.surface" />
                </div>
            </div>

            <!-- 歌词 -->
            <div class="lyrics-container">
                <div class="lyrics-text" style="transition: 1s" v-html="currentSong.lyrics"></div>
            </div>

            <div class="bottom">
                <!-- 操作列表1 -->
                <div class="operate-species-1 flex flex-between">
                    <img class="col-1" src="../assets/img/like.png" />
                    <img class="col-2" src="../assets/img/download.png" />
                    <img class="col-3" src="../assets/img/comments.png" />
                </div>

                <!-- 进度条 -->
                <div class="progress flex flex-between">
                    <!-- 进度轴的最大运动区域 -->
                    <div class="axis-max-area" @click="dragProgress($event)" ref="progress">
                        <!-- 进度轴 -->
                        <div class="axis" :style="{ width: axis + '%' }"></div>
                    </div>
                </div>

                <!-- 操作列表2 -->
                <div class="operate-species-2 flex flex-between items-center">
                    <!-- 循环 -->
                    <img class="loop-icon" src="../assets/img/recycle.png" />
                    <!-- 上一首 -->
                    <img class="last-icon" src="../assets/img/last.png" @click="setLastSong" />
                    <!-- 控制器 -->
                    <img class="control-icon" :src="controlIcon" @click="controlAudio" />
                    <!-- 下一首 -->
                    <img class="next-icon" src="../assets/img/last.png" @click="setNextSong" />
                    <!-- 音乐列表上升或下降 -->
                    <img class="drop-or-down-music-list" src="../assets/img/play-list_white.png" @click="controlSongsPanel" />
                </div>
            </div>
        </div>

        <!-- 音乐列表 -->
        <div class="musics" :class="{ 'dropup-list': animation.isDroppedUp, 'dropdown-list': animation.isDroppedDown }">
            <!-- 菜单 -->
            <div class="menu flex flex-end">
                <img class="close-icon" @click="controlSongsPanel" src="../assets/img/close.png" />
            </div>

            <!-- 表格头部 -->
            <div class="table-header flex flex-between">
                <!-- 列表项 - 歌曲名 -->
                <div class="col-1">歌曲名</div>
                <!-- 列表项 - 专辑 -->
                <div class="col-2">专辑</div>
            </div>

            <!-- 表格内容 -->
            <div
                class="table-body flex flex-between"
                :class="{ playing: index == currentIndex ? true : false }"
                v-for="(item, index) in songs"
                :key="index"
            >
                <div class="col-1 flex">
                    <!-- 正在播放时，显示播放图标 -->
                    <img class="current-icon" src="../assets/img/playing.png" v-if="index == currentIndex" />
                    <!-- 列表项内容 - 歌曲名 -->
                    <div class="name">{{ item.name }}</div>
                </div>
                <!-- 列表项内容 - 专辑 -->
                <div class="col-2">{{ item.album }}</div>
            </div>
        </div>

        <!-- 媒体元素 -->
        <audio @ended="ended" @timeupdate="timeupdate" ref="audio" :src="currentSong.src"></audio>
    </div>
</template>

<style lang="scss" scoped>
#player {
    position: relative;
    height: calc(100vh);

    .matte {
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

    .container {
        padding: 3vw;
    }

    .header {
        display: flex;
        align-content: center;

        .back-icon,
        .share-icon {
            width: 6vw;
            height: 6vw;
        }

        .middle {
            width: 190px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: white;
            text-align: center;

            .title {
                font-size: 16px;
            }

            .album {
                font-size: 12px;
            }
        }
    }

    .film-container {
        height: 43vh;
        margin-top: 14vw;
        position: relative;

        .film-item {
            width: 47vw;
            height: 47vw;
            position: absolute;
            border-radius: 100%;
            border: 10vw solid black;
            box-shadow: 2vw 2vw 3vw #5451519c;

            .surface {
                width: 47vw;
                height: 47vw;
                border-radius: 100%;
            }
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
    }

    .lyrics-container {
        height: 100px;
        font-size: 4vw;
        overflow: hidden;
        margin-top: 2.5vw;
        line-height: 30px;
        text-align: center;
        word-break: break-all;
        color: rgb(230 230 230 / 90%);
    }

    .bottom {
        margin-top: 4vh;

        .operate-species-1 {
            margin: 0 16vw;

            img {
                width: 7vw;
                height: 7vw;
            }
        }

        .progress {
            margin: 4vh 0;
            color: rgb(233, 233, 233);

            .axis-max-area {
                width: 100%;
                height: 0.5vh;
                background-color: rgb(176 176 176);

                .axis {
                    position: relative;
                    height: 100%;
                    border-radius: 0 5px 5px 0px;
                    background-color: white;
                }

                .axis::after {
                    content: '';
                    position: absolute;
                    border-radius: 100%;
                    height: 8px;
                    width: 8px;
                    top: -50%;
                    right: -1vw;
                    background-color: white;
                }
            }
        }

        .operate-species-2 {
            img {
                width: 5vw;
                height: 5vw;
            }

            .control-icon {
                width: 8vw !important;
                height: 8vw !important;
            }

            .next-icon {
                transform: rotate(180deg);
            }
        }
    }

    /* 音乐列表 */
    .musics {
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

        .menu {
            .close-icon {
                width: 4vw;
                height: 4vw;
                margin: 1.5vw 0;
            }
        }

        .table-header {
            margin-bottom: 3vw;
            font-size: 4vw;
            font-weight: bold;

            .col-1 {
                flex: 2;
            }

            .col-2 {
                flex: 1;
            }
        }

        .table-body {
            margin: 3vw 0;

            .col-1 {
                flex: 2;
                font-size: 4vw;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                .current-icon {
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                }
            }

            .col-2 {
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        .playing > div {
            font-weight: bold;
            color: #d37070;
        }
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
}
</style>
