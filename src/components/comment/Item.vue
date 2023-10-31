<template>
  <li class="item">
    <div class="avatar">
      <img src="@/assets/img/default.jpeg" alt="">
    </div>
  
    <div class="body">
      <div class="header">
        <div class="left">
          <span class="name">Fans</span>
          <span class="location">
            <span class="emoji">🇯🇵</span>
            <span>JP</span>
            <span>.</span>
            <span>Tokyo</span>
          </span>
          <span class="user-agent">
            <span class="os">Mac OS</span>
            <span class="browser">Chrome</span>
          </span>
        </div>
        <div class="right">
          <span class="sort">#1214</span>
        </div>
      </div>
      <div class="content">
        <span>我在此记录下来，在未来我也会不断审视曾经的经历，从中得到该留下的经验，也会把新的感受寄付给已经逝去的灵魂。</span>
      </div>
      <div class="footer">
        <span class="create-date">
          2 个月前
        </span>
        <button>赞(1)</button>
        <button>踩(0)</button>
        <button>回复</button>
      </div>
    </div>
  </li>
</template>

<style lang="less" scoped>
.item {
  padding-left: 24px;
  position: relative;
  
  .avatar {
    position: absolute;
    left: 0px;
    top: 24px;
    
    img {
      width: 48px;
      height: 48px;
    }
  }
  
  > .body {
    background-color: #e8e8e8;
    padding: 8px 8px 8px 36px;

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .content {
      margin-bottom: 12px;
    }
  }
}
</style>
