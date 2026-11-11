;(function () {
  var root = document.body
  var total = Number(root.dataset.pages)
  var directory = root.dataset.directory
  var extension = root.dataset.extension || 'jpg'
  var sourceWidth = Number(root.dataset.pageWidth)
  var sourceHeight = Number(root.dataset.pageHeight)
  var book = document.getElementById('book')
  var stage = document.querySelector('.stage')

  for (var pageNumber = 1; pageNumber <= total; pageNumber += 1) {
    var page = document.createElement('div')
    page.className = 'page'
    if (pageNumber === 1 || pageNumber === total) page.dataset.density = 'hard'

    var image = document.createElement('img')
    image.alt = 'Page ' + pageNumber
    image.dataset.src = directory + '/page-' + pageNumber + '.' + extension
    image.decoding = 'async'
    page.appendChild(image)
    book.appendChild(page)
  }

  var images = book.querySelectorAll('img')
  function load(around) {
    for (
      var index = Math.max(0, around - 3);
      index <= Math.min(total - 1, around + 5);
      index += 1
    ) {
      var image = images[index]
      if (!image.src) image.src = image.dataset.src
    }
  }

  load(0)

  requestAnimationFrame(function () {
    var availableWidth = Math.max(1, stage.clientWidth - 24)
    var availableHeight = Math.max(1, stage.clientHeight - 20)
    var pageRatio = sourceHeight / sourceWidth
    var pageWidth = availableWidth >= 760 ? availableWidth / 2 : availableWidth
    var pageHeight = pageWidth * pageRatio

    if (pageHeight > availableHeight) {
      pageHeight = availableHeight
      pageWidth = pageHeight / pageRatio
    }

    var pageFlip = new St.PageFlip(book, {
      width: Math.max(1, Math.floor(pageWidth)),
      height: Math.max(1, Math.floor(pageHeight)),
      size: 'fixed',
      showCover: true,
      usePortrait: true,
      maxShadowOpacity: 0.35,
      mobileScrollSupport: false,
      flippingTime: 800,
    })

    pageFlip.loadFromHTML(book.querySelectorAll('.page'))

    var count = document.getElementById('count')
    var first = document.getElementById('first')
    var previous = document.getElementById('prev')
    var next = document.getElementById('next')
    var last = document.getElementById('last')
    var hint = document.getElementById('hint')

    function update() {
      var current = pageFlip.getCurrentPageIndex()
      var landscape = pageFlip.getOrientation() === 'landscape'
      var visible =
        landscape && current > 0 && current < total - 1
          ? current + 1 + '–' + Math.min(current + 2, total)
          : String(current + 1)

      load(current)
      count.textContent = visible + ' / ' + total
      previous.disabled = first.disabled = current === 0
      next.disabled = last.disabled =
        current >= total - 1 || (landscape && current >= total - 2 && current > 0)
    }

    first.addEventListener('click', function () {
      pageFlip.turnToPage(0)
      update()
    })
    previous.addEventListener('click', function () {
      pageFlip.flipPrev()
    })
    next.addEventListener('click', function () {
      pageFlip.flipNext()
    })
    last.addEventListener('click', function () {
      pageFlip.turnToPage(total - 1)
      update()
    })
    pageFlip.on('flip', function () {
      hint.style.opacity = 0
      update()
    })
    pageFlip.on('changeOrientation', update)
    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') pageFlip.flipPrev()
      if (event.key === 'ArrowRight') pageFlip.flipNext()
    })

    update()
    setTimeout(function () {
      hint.style.opacity = 0
    }, 5000)

    var initialWidth = window.innerWidth
    var initialHeight = window.innerHeight
    var resizeTimer
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        if (
          Math.abs(window.innerWidth - initialWidth) > 20 ||
          Math.abs(window.innerHeight - initialHeight) > 20
        ) {
          window.location.reload()
        }
      }, 250)
    })
  })
})()
