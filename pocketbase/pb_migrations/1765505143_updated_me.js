/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2326910859")

  // remove field
  collection.fields.removeById("text1581114487")

  // remove field
  collection.fields.removeById("file3309110367")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2293400711",
    "max": 0,
    "min": 0,
    "name": "prodi",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1901783676",
    "max": 0,
    "min": 0,
    "name": "kampus",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2326910859")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1581114487",
    "max": 0,
    "min": 0,
    "name": "skill",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file3309110367",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "image",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // remove field
  collection.fields.removeById("text2293400711")

  // remove field
  collection.fields.removeById("text1901783676")

  return app.save(collection)
})
