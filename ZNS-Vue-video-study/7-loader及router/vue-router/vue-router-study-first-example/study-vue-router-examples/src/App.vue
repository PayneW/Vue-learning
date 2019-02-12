<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <ul>
            <li>
              <router-link to="/home">主页</router-link>
            </li>
            <li>
              <router-link to="/news">新闻</router-link>
            </li>
          </ul>

          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .row {
    margin-top:5em; border-radius:6px;
    padding:.4em; font-size:14px;
    background:#ccc; min-height:20em;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  ul {
    overflow: hidden;
    list-style: none;
    text-align: center;
  }
  li {
    width: 100px;
    height: 40px;
    float: left;
    line-height: 40px;
    margin: 0 10px;
    border-radius: 5px;
    background: lightseagreen;
  }
  li > a {
    width: 100%;
    height: 100%;
    display: block;
  }
  .router-link-active {
    font-size: 18px !important;
    color:#0774FB;
  }
</style>
