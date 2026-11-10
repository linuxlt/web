(function () {
  // Mobile menu
  var toggle = document.querySelector('.header .menu-toggle')
  var nav = document.querySelector('.header .nav')
  var icon = document.querySelector('.header .menu-icon')

  function setMenuOpen (open) {
    nav.classList.toggle('open', open)
    icon.classList.toggle('open', open)
  }

  toggle.addEventListener('click', function () {
    setMenuOpen(!nav.classList.contains('open'))
  })
  nav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () { setMenuOpen(false) })
  })

  // Upcoming / past meetups are split at build time. Re-evaluate against the
  // visitor's clock so the lists stay correct between deploys.
  var now = Date.now()

  function time (card) {
    return new Date(card.getAttribute('data-date')).getTime()
  }

  function setPast (card, past) {
    card.classList.toggle('is-past', past)
    var badge = card.querySelector('.meetup-badge')
    badge.className = 'meetup-badge ' + (past ? 'past' : 'upcoming')
    badge.textContent = past ? 'Praėjęs' : 'Artėjantis'
  }

  var empty = document.querySelector('[data-meetups-empty]')

  // Home page: the 3 nearest upcoming meetups
  var home = document.querySelector('[data-meetups-home]')
  if (home) {
    var shown = 0
    home.querySelectorAll('.meetup-card').forEach(function (card) {
      var show = shown < 3 && time(card) >= now
      card.hidden = !show
      if (show) shown++
    })
    home.hidden = shown === 0
    empty.hidden = shown > 0
  }

  // Meetups page: upcoming and past lists, newest first
  var upcoming = document.querySelector('[data-meetups-upcoming]')
  var past = document.querySelector('[data-meetups-past]')
  if (upcoming && past) {
    var cards = Array.prototype.slice.call(
      document.querySelectorAll('[data-meetups-upcoming] .meetup-card, [data-meetups-past] .meetup-card')
    )
    cards.sort(function (a, b) { return time(b) - time(a) })
    cards.forEach(function (card) {
      var isUpcoming = time(card) >= now
      setPast(card, !isUpcoming)
      ;(isUpcoming ? upcoming : past).appendChild(card)
    })
    upcoming.hidden = upcoming.children.length === 0
    past.hidden = past.children.length === 0
    empty.hidden = !upcoming.hidden
  }
})()
