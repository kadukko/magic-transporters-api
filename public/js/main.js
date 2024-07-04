const loadMagicMovers = () => {
  const tbody = document.querySelector('#magic-movers tbody')
  tbody.innerHTML = ''

  $.ajax({
    url: '/magic-movers',
    method: 'GET',
    success: function (movers) {
      movers.forEach(mover => {
        const tr = document.createElement('tr')

        tr.innerHTML = `
          <td>${mover.id}</td>
          <td>${mover.name}</td>
          <td>${mover.energy}</td>
          <td>${mover.weightLimit}</td>
          <td>${mover.questState}</td>
          <td>${mover.totalMissions}</td>
        `

        if (mover.questState === 'LOADING') {
          tr.innerHTML += '<td><button class="border-2 px-3" action="show-items">Items</button></td>'
        } else {
          tr.innerHTML += '<td></td>'
        }

        tbody.append(tr)

        if (mover.questState === 'LOADING') {
          tr.querySelector('button[action=show-items]').onclick = function (e) {
            $.ajax({
              url: '/magic-movers/' + mover.id + '/current-mission',
              method: 'GET',
              success: function (mission) {
                const header = 'ID | NAME | WEIGHT\n'
                const items = mission.items.map(({item}) => `${item.id} | ${item.name} | ${item.weight}`).join('\n')
                const totalWeight = mission.items.reduce((prev, {item}) => prev + item.weight, 0)
                const footer = '\n\nTotal Weight: ' + totalWeight

                alert(header + items + footer)
              }
            })
          }
        }
      })
    },
    error: function (request) {
      alert(request.responseText)
    }
  })
}

const loadMagicItems = () => {
  const tbody = document.querySelector('#magic-items tbody')
  tbody.innerHTML = ''

  $.ajax({
    url: '/magic-items',
    method: 'GET',
    success: function (data) {
      data.forEach(mover => {
        const tr = document.createElement('tr')

        tr.innerHTML = `
          <td>${mover.id}</td>
          <td>${mover.name}</td>
          <td>${mover.weight}</td>
        `
        
        tbody.append(tr)
      })
    },
    error: function (request) {
      alert(request.responseText)
    }
  })
}

loadMagicMovers();
loadMagicItems();

const serializeObject = (serializeArray) => {
}

$("#create-mover-form").on("submit", function (e) {
  e.preventDefault()

  const name = $(this).find('input[name=name]').val()
  const energy = $(this).find('input[name=energy]').val()
  const weightLimit = $(this).find('input[name=weightLimit]').val()

  $.ajax({
    url: '/magic-movers',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      name,
      energy: Number(energy),
      weightLimit: Number(weightLimit)
    }),
    success: function (data) {
      location.reload()
    },
    error: function (request, textStatus, errorThrown ) {
      alert(request.responseText)
    },

  })
})

$("#create-item-form").on("submit", function (e) {
  e.preventDefault()

  const name = $(this).find('input[name=name]').val()
  const weight = $(this).find('input[name=weight]').val()

  $.ajax({
    url: '/magic-items',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      name,
      weight: Number(weight)
    }),
    success: function (data) {
      location.reload()
    },
    error: function (request, textStatus, errorThrown ) {
      alert(request.responseText)
    },

  })
})

$("#load-mover-form").on("submit", function (e) {
  e.preventDefault()

  const moverId = $(this).find('input[name=moverId]').val()
  const itemId = $(this).find('input[name=itemId]').val()

  $.ajax({
    url: '/magic-movers/' + moverId + '/load-item',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      itemId
    }),
    success: function (data) {
      location.reload()
    },
    error: function (request, textStatus, errorThrown ) {
      alert(request.responseText)
    }
  })
})

$("#unload-mover-form").on("submit", function (e) {
  e.preventDefault()

  const moverId = $(this).find('input[name=moverId]').val()
  const itemId = $(this).find('input[name=itemId]').val()

  $.ajax({
    url: '/magic-movers/' + moverId + '/unload-item',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      itemId
    }),
    success: function (data) {
      location.reload()
    },
    error: function (request, textStatus, errorThrown ) {
      alert(request.responseText)
    }
  })
})

$("#start-mission-form").on("submit", function (e) {
  e.preventDefault()

  const moverId = $(this).find('input[name=moverId]').val()

  $.ajax({
    url: '/magic-movers/' + moverId + '/start-mission',
    method: 'POST',
    success: function (data) {
      location.reload()
    },
    error: function (request, textStatus, errorThrown ) {
      alert(request.responseText)
    }
  })
})

$("#end-mission-form").on("submit", function (e) {
  e.preventDefault()

  const moverId = $(this).find('input[name=moverId]').val()

  $.ajax({
    url: '/magic-movers/' + moverId + '/end-mission',
    method: 'POST',
    success: function (data) {
      location.reload()
    },
    error: function (request, textStatus, errorThrown ) {
      alert(request.responseText)
    }
  })
})