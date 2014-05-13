const test = require('tap').test
const app = require('../')
const spawn = require('./spawn')

spawn(app).then(function (api) {
  test('Get all milestones', function (t) {
    api.get('/systems/chicago/milestones')
      .then(function (res) {
        t.same(res.statusCode, 200, '200 OK')
        t.ok(res.body.milestones.length >= 1, 'at least one milestone')
        t.end()
      })
      .catch(api.fail(t))
  })

  test('Get one milestone', function (t) {
    api.get('/systems/chicago/milestones/1')
      .then(function (res) {
        const milestone = res.body.milestone
        t.same(res.statusCode, 200, '200 OK')
        t.same(milestone.id, 1, 'has correct ID')
        t.same(milestone.primaryBadge.slug, 'chicago-badge', 'has correct primary badge')
        t.end()
      })
      .catch(api.fail(t))
  })

  test(':cleanup:', function (t) {
    api.done(); t.end()
  })
})
