<script setup lang="ts">
import {ref, reactive} from 'vue'

</script>

<template>
  <div id="index">
    <!-- 歌单每日推荐 -->
    <div class="row-1">
      <div class="header">Hi shiramashiro 今日为你推荐</div>
      <div class="body flex flex-between items-center overflow-x">
        <div class="wrapper flex flex-between items-center">
          <!-- 个性电台 -->
          <div class="radio">
            <div class="content flex flex-between items-center">
              <div class="col-1">
                <div class="title">个性电台</div>
                <div class="greeting">
                  <div>下午好</div>
                </div>
                <div class="desc">有兴趣来点音乐吗？</div>
              </div>
              <div class="col-2">
                <img
                    class="inherit-wh"
                    src="https://qpic.y.qq.com/music_cover/DuKUYHgAKNJF4HrKEl0Fia3HmctlSqqico7GOQqVJZuFY14eanBicpNfg/300?n=1"
                />
              </div>
            </div>
            <div class="desc textflow">Hall of Fame - The Script</div>
          </div>

          <!-- 每日推荐 -->
          <div class="other">
            <div class="content daily">
              <img
                  :src="'https://qpic.y.qq.com/music_cover/bFQsibroB8LXJhoIUKkjbJNLTCN5eMYYZJzOFtPT6VamuxqMA8zuuKs6pA73PUiapo/300?n=1'"
              />
            </div>
            <div class="desc textflow">每日30首</div>
          </div>

          <!-- 下一首心动 -->
          <div class="other">
            <div class="content">
              <img
                  :src="'https://qpic.y.qq.com/music_cover/bFQsibroB8LXJhoIUKkjbJNLTCN5eMYYZJzOFtPT6VamuxqMA8zuuKs6pA73PUiapo/300?n=1'"
              />
            </div>
            <div class="desc textflow">下一首心动</div>
          </div>

          <!-- 新歌推荐 -->
          <div class="other">
            <div class="content">
              <img
                  :src="'https://qpic.y.qq.com/music_cover/bFQsibroB8LXJhoIUKkjbJNLTCN5eMYYZJzOFtPT6VamuxqMA8zuuKs6pA73PUiapo/300?n=1'"
              />
            </div>
            <div class="desc textflow">新歌推荐</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 歌曲每日推荐 -->
    <div class="row-2">
      <div class="header">根据 「Yunomi」 推荐</div>
      <div class="body">
        <div class="item flex items-flex flex-between">
          <div class="col-1">
            <img
                src="https://qpic.y.qq.com/music_cover/Z2sIPAibthS5ZXgh3bKWZ6s79cicnY5zrARER1chNc6ibibk0UMuYqiaicvA/300?n=1"
            />
          </div>
          <div class="col-2 flex items-center">
            <div class="wrapper">
              <div class="title">Rememo</div>
              <div class="desc">Kings of Leon - Aha Shake Heartbreak</div>
            </div>
          </div>
        </div>
        <div class="item flex items-flex flex-between flex-center">
          <div class="col-1">
            <img
                src="https://qpic.y.qq.com/music_cover/Z2sIPAibthS5ZXgh3bKWZ6s79cicnY5zrARER1chNc6ibibk0UMuYqiaicvA/300?n=1"
            />
          </div>
          <div class="col-2 flex items-center">
            <div class="wrapper">
              <div class="title">Welcome Back, Spock</div>
              <div class="desc">Michael Giacchino - Star Trek</div>
            </div>
          </div>
        </div>
        <div class="item flex items-flex flex-between flex-center">
          <div class="col-1">
            <img
                src="https://qpic.y.qq.com/music_cover/Z2sIPAibthS5ZXgh3bKWZ6s79cicnY5zrARER1chNc6ibibk0UMuYqiaicvA/300?n=1"
            />
          </div>
          <div class="col-2 flex items-center">
            <div class="wrapper">
              <div class="title">Forget It</div>
              <div class="desc">Cut And Paste - The Fatboy Slim Collection</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#index {
  .row-1,
  .row-2 {
    margin-top: 3vh;
  }

  .row-1 .header,
  .row-2 .header {
    font-size: 0.38rem;
    margin-bottom: 1vh;
  }

  .row-1 {
    color: #4A4A4A;
    overflow-x: auto;
    overflow-y: hidden;

    .body {
      .wrapper {
        .radio {
          width: 60vw;

          .content {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url('../assets/img/starry-sky.gif');
            border-radius: 2vw;
            color: #F7F7F7;
            height: 15vh;
            padding: 1vh;

            .col-1 {
              .title {
                font-size: 0.4rem;
                font-weight: bold;
                margin-bottom: 3vw;
              }

              .greeting {
                font-size: 0.3rem;
                font-weight: bold;
              }

              .desc {
                font-size: 0.3rem;
              }
            }

            .col-2 {
              width: 23vw;
              height: 23vw;
              position: relative;

              img {
                width: 100%;
                height: 100%;
                border-radius: 2vw;
              }
            }

            .col-2::before {
              content: '';
              width: 6vw;
              height: 6vw;
              z-index: 1;
              display: block;
              position: absolute;
              bottom: 5%;
              left: 5%;
              background-size: cover;
              background-position: center;
              background-image: url('../assets/img/play-btn.png');
            }
          }

          .desc {
            margin-top: 1vh;
            font-size: 0.3rem;
          }
        }

        .other {
          margin: 0 3vw;

          .content {
            width: 17vh;
            height: 17vh;
            position: relative;

            img {
              width: 100%;
              height: 100%;
              border-radius: 2vw;
            }
          }

          .daily::before {
            content: 'Daily 30';
            z-index: 1;
            width: 10vw;
            font-size: 0.45rem;
            font-weight: bolder;
            position: absolute;
            top: 2vw;
            left: 2vw;
            color: white;
          }

          .desc {
            margin-top: 1vh;
            font-size: 0.3rem;
          }
        }

        .other:nth-child(2) {
          margin: 0 3vw 0 6vw !important;
        }
      }
    }
  }

  .row-2 {
    .body {
      .item:nth-child(1) {
        margin-top: 0 !important;
      }

      .item {
        margin-top: 2vh;

        .col-1 {
          width: 20vw;
          height: 20vw;

          img {
            width: 100%;
            height: 100%;
            border-radius: 2vw;
          }
        }

        .col-2 {
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>
