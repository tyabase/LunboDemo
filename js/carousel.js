/**
 * @typedef CarouselItem 轮播图轮播项目
 * @type {Object}
 * @property {string} serial 系列
 * @property {string} title 标题
 * @property {string} desc 简短描述
 * @property {string} thumbnail 图片
 * @property {string | null} href 跳转地址
 */

/** @type {Array<CarouselItem>} */
// thumbnail 和 href 在下面的 for 赋值处理
let carouselList = [
  { serial: '01', title: '公主殿下驾到', desc: '#三九!#', thumbnail: '', href: '' },
  { serial: '02', title: '蕾姆会一直陪在昴身边', desc: '#Rem#', thumbnail: '', href: '' },
  { serial: '03', title: '二次元真的太有实力辣', desc: '#拾起所有的勇气#', thumbnail: '', href: '' },
  { serial: '04', title: '「想更瞭解02」', desc: '#爱#', thumbnail: '', href: '' },
  { serial: '05', title: '「爱酱」', desc: '#感谢你开创了这个行业#', thumbnail: '', href: '' },
  { serial: '06', title: '「我的青春恋爱故事」', desc: '#大老师恋爱导师#', thumbnail: '', href: '' },
  { serial: '07', title: '「永恒的骑士之王」', desc: '#这一次，我会——睡得更久一些#', thumbnail: '', href: '' },
  { serial: '08', title: '「这不是我的妄想」', desc: '#2.5条悟#', thumbnail: '', href: '' },
  { serial: '09', title: '「萝卜鲑鱼」', desc: '#富冈义勇#', thumbnail: '', href: '' },
  { serial: '10', title: 'ROUND 1', desc: '#JNK DOG击碎一切#', thumbnail: '', href: '' },
  { serial: '11', title: '「你抓不住我」', desc: '#我是山里灵活的狗#', thumbnail: '', href: '' },
  { serial: '12', title: '「淋漓」', desc: '#誓言#', thumbnail: '', href: '' },
  { serial: '13', title: '「葱葱葱葱葱」', desc: '#看看里在干森么#', thumbnail: '', href: '' },
  { serial: '14', title: '阿米驴', desc: '#想吃胡萝卜#', thumbnail: '', href: '' },
  { serial: '15', title: '「我名申鹤」', desc: '#闻鹤于野#', thumbnail: '', href: '' },
  { serial: '16', title: '「亚丝娜」', desc: '#二次元的入门篇章#', thumbnail: '', href: '' },
  { serial: '17', title: '「四月是你的谎言」', desc: '#又到了没有你的四月#', thumbnail: '', href: '' },
  { serial: '18', title: '「Clannad」', desc: '#读作人生，写作CLANNAD#', thumbnail: '', href: '' },
]

// 轮播图图片切换
for (let i = 0; i < carouselList.length; i++) {
  carouselList[i].thumbnail = `img/carousel_${i + 1}.png`
}

//初始化布局
carouselList.forEach((item, index) => {
  document.querySelector('#media-list').innerHTML += `
  <div 
    class="media-list-item"
    data-index="${index}"
    data-serial="${item.serial}"
    data-title="${item.title}"
    data-desc="${item.desc}"
    data-thumbnail="${item.thumbnail}"
  >
    <div 
      class="media-list-item-img" 
      style="background-image: url(${item.thumbnail})"
      data-title="${item.title}"
    ></div>
  </div>
  `
  document.querySelector('#media-layer-front .media-nav-wrapper').innerHTML += `
  <div
    class="media-nav-item"
    active="${index === 0}"
    data-index="${index}"
    data-serial="${item.serial}"
    data-title="${item.title}"
    data-desc="${item.desc}"
    data-thumbnail="${item.thumbnail}"
  ></div>
  `
})

let activeIndex = 0//初始化轮播图索引
const layerFront = document.querySelector('#media-layer-front')
const mediaSerial = layerFront.querySelector('.media-info-serial')
const mediaTitle = layerFront.querySelector('.media-info-title')
const mediaDetail = layerFront.querySelector('.media-info-detail')
const mediaMainPic = document.querySelector('#media-layer-view .media-main-pic')
const mediaImage = mediaMainPic.querySelector('.media-img')
const mediaList = document.querySelector('#media-list')

// 初始化轮播资讯
mediaImage.href = carouselList[0].href
mediaImage.style = `background-image: url(${carouselList[0].thumbnail}); transform-origin: left top; transform: scale(1)`
mediaSerial.innerHTML = carouselList[0].serial
mediaTitle.innerHTML = carouselList[0].title
mediaDetail.innerHTML = carouselList[0].desc

/**
 * 轮播间隔与监听事件
 */
for (let i = 0; i < carouselList.length; i++) {
  let mediaItem = mediaList.querySelector(`.media-list-item:nth-child(${i + 1})`)
  let navItem = layerFront.querySelector(`.media-nav-item:nth-child(${i + 1})`)

  const mediaListItem = mediaList.querySelector(`.media-list-item:nth-child(1)`)
  const mediaListItemWidth = getComputedStyle(mediaListItem).width.replace('px', '')
  let mediaListItemPaddingRight = getComputedStyle(mediaListItem).paddingRight.replace('px', '')

  // 宽度 = media-list-item 的 width + 左右padding
  let xWidth = (parseFloat(mediaListItemWidth) + parseFloat(mediaListItemPaddingRight) * 2).toFixed(0)

  // 显示前四张照片
  if (i <= 3) {
    mediaItem.style.transform = `translateX(${xWidth * i}px)`
    mediaItem.style.opacity = '1'
  } else {
    mediaItem.style.transform = `translateX(${xWidth * 3}px)`
    mediaItem.style.opacity = '0'
    mediaItem.style.pointerEvents = 'none'
  }

  // 点击处理器
  let array = [mediaItem, navItem]
  array.forEach(item => {
    item.addEventListener('click', () => {
      if (parseInt(item.dataset.index) > parseInt(activeIndex)) {
        carouselItemSwitching(i, 'left')
      } else if (parseInt(item.dataset.index) < parseInt(activeIndex)) {
        carouselItemSwitching(i, 'right')
      }
      activeIndex = item.dataset.index
    })
  })
}

/**
 * click处理事件
 */
const arrowBtnPrev = document.querySelector('#arrow-btn-prev')
const arrowBtnNext = document.querySelector('#arrow-btn-next')

arrowBtnPrev.addEventListener('click', () => {
  activeIndex > 0 ? activeIndex-- : (activeIndex = carouselList.length - 1)
  carouselItemSwitching(activeIndex, 'right')
})

arrowBtnNext.addEventListener('click', () => {
  activeIndex < carouselList.length - 1 ? activeIndex++ : (activeIndex = 0)
  carouselItemSwitching(activeIndex, 'left')
})



function carouselItemSwitching(index, direction) {

  for (let i = 0; i < carouselList.length; i++) {
    layerFront.querySelector(`.media-nav-item:nth-child(${i + 1})`).setAttribute('active', 'false')
  }

  layerFront.querySelector(`.media-nav-item:nth-child(${index + 1})`).setAttribute('active', 'true')

  imageZoom(0.25, direction, carouselList[index].thumbnail, carouselList[index].href).then(() => {})
  slideInText(mediaSerial, direction, 0.2, 0.4, carouselList[index].serial).then(() => {})
  slideInText(mediaTitle, direction, 0.2, 0.5, carouselList[index].title).then(() => {})
  slideInText(mediaDetail, direction, 0.2, 0.6, carouselList[index].desc).then(() => {})
  setSlidePosition(index)
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}


async function slideInText(element, direction, duration, delay, newText) {
  let a
  if (direction === 'left') {
    a = -50
  } else if (direction === 'right') {
    a = 50
  }
  element.style.transition = `${duration}s ease-out`

  await sleep(delay * 1000)
  element.style.opacity = `0`
  element.style.transform = `translateX(${a}%)`
  await sleep(duration * 1000)
  element.style.transform = `translateX(${-a}%)`
  element.style.opacity = `0`
  await sleep(duration * 1000)
  element.innerHTML = newText
  element.style.transform = `translateX(0)`
  element.style.opacity = `1`
  await sleep(delay * 1000)
}

async function imageZoom(duration, direction, newImg, href) {
  let oldImgTransformOrigin
  let newImgTransformOrigin
  if (direction === 'left') {
    oldImgTransformOrigin = 'left top'
    newImgTransformOrigin = 'right bottom'
  } else if (direction === 'right') {
    oldImgTransformOrigin = 'right bottom'
    newImgTransformOrigin = 'left top'
  }

  mediaMainPic.innerHTML += mediaMainPic.innerHTML
  const mediaOldImg = mediaMainPic.querySelector('.media-img:nth-child(1)')
  const mediaNewImg = mediaMainPic.querySelector('.media-img:nth-child(2)')
  mediaNewImg.href = href
  mediaNewImg.style.backgroundImage = `url(${newImg})`

  mediaOldImg.style.transformOrigin = oldImgTransformOrigin
  mediaOldImg.style.transform = 'scale(1)'
  mediaOldImg.style.transition = `${duration}s`

  mediaNewImg.style.transformOrigin = newImgTransformOrigin
  mediaNewImg.style.transform = 'scale(0)'
  mediaNewImg.style.transition = `${duration}s`

  await sleep(duration * 1000)
  mediaOldImg.style.transform = 'scale(0)'
  mediaNewImg.style.transform = 'scale(1)'
  await sleep(duration * 1000)
  mediaMainPic.innerHTML = mediaNewImg.outerHTML
}

function setSlidePosition(activeIndex) {
  for (let i = 0; i < carouselList.length; i++) {
    let mediaItem = mediaList.querySelector(`.media-list-item:nth-child(${i + 1})`)

    const mediaListItem = mediaList.querySelector(`.media-list-item:nth-child(1)`)
    const mediaListItemWidth = getComputedStyle(mediaListItem).width.replace('px', '')
    let mediaListItemPaddingRight = getComputedStyle(mediaListItem).paddingRight.replace('px', '')

    // 计算 = media-list-item 的 width + 左右padding
    let xWidth = (parseFloat(mediaListItemWidth) + parseFloat(mediaListItemPaddingRight) * 2).toFixed(0)

    let xPosition = xWidth * i - xWidth * (activeIndex - 1)

    if (xPosition <= -xWidth) {
      mediaItem.style.transform = `translateX(${-xWidth}px)`
      mediaItem.style.opacity = '0'
      mediaItem.style.pointerEvents = 'none'
    } else if (xPosition >= xWidth * 4) {
      mediaItem.style.transform = `translateX(${xWidth * 4}px)`
      mediaItem.style.opacity = '0'
      mediaItem.style.pointerEvents = 'none'
    } else {
      mediaItem.style.transform = `translateX(${xWidth * i - xWidth * (activeIndex - 1)}px)`
      mediaItem.style.opacity = '1'
      mediaItem.style.pointerEvents = 'auto'
    }

    if (activeIndex === 0) {
      for (let j = 0; j < 2; j++) {
        mediaList.querySelector(
          `.media-list-item:nth-child(${carouselList.length - j})`
        ).style.transform = `translateX(${xWidth * -j}px)`
        mediaList.querySelector(`.media-list-item:nth-child(${carouselList.length})`).style.opacity = '1'
        mediaList.querySelector(`.media-list-item:nth-child(${carouselList.length})`).style.pointerEvents = 'auto'
      }
    }

    if (activeIndex === 1) {
      for (let j = 0; j < 2; j++) {
        mediaList.querySelector(
          `.media-list-item:nth-child(${carouselList.length - j})`
        ).style.transform = `translateX(${-xWidth}px)`
        mediaList.querySelector(`.media-list-item:nth-child(${carouselList.length - j})`).style.opacity = '0'
        mediaList.querySelector(`.media-list-item:nth-child(${carouselList.length - j})`).style.pointerEvents = 'none'
      }
    }

    if (activeIndex >= carouselList.length - 3) {
      for (let j = 0; j < 3; j++) {
        mediaList.querySelector(`.media-list-item:nth-child(${j + 1})`).style.transform = `translateX(${xWidth * 4}px)`
        mediaList.querySelector(`.media-list-item:nth-child(2)`).style.opacity = '0'
        mediaList.querySelector(`.media-list-item:nth-child(2)`).style.pointerEvents = 'none'
      }
    }

    if (activeIndex >= carouselList.length - 2) {
      let a = activeIndex % 3
      for (let j = 0; j < 2; j++) {
        mediaList.querySelector(`.media-list-item:nth-child(${j + 1})`).style.transform = `translateX(${
          xWidth * (4 - a + j)
        }px)`
      }

      if (activeIndex === carouselList.length - 2) {
        mediaList.querySelector(`.media-list-item:nth-child(1)`).style.opacity = '1'
        mediaList.querySelector(`.media-list-item:nth-child(1)`).style.pointerEvents = 'auto'
      }

      if (activeIndex === carouselList.length - 1) {
        mediaList.querySelector(`.media-list-item:nth-child(1)`).style.opacity = '1'
        mediaList.querySelector(`.media-list-item:nth-child(2)`).style.opacity = '1'
        mediaList.querySelector(`.media-list-item:nth-child(1)`).style.pointerEvents = 'auto'
        mediaList.querySelector(`.media-list-item:nth-child(2)`).style.pointerEvents = 'auto'
      }
    }
  }
}
