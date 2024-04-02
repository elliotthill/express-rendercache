# Express middleware to retreive cached HTML from redis/ORM/memory 

Usage:

`import rendercache from './rendercache.js'`

## Setting your storage location

### Sequelize ORM:
`rendercache.set_store(models.RenderCacheStore, "findByPk");`

Replace `models.RenderCacheStore` with the name of your model and the name of the object on which the models are loaded.

### Redis 
`rendercache.set_store(redis, "get");`

## Using in an Express route
`router.get('/',rendercache.middleware, Index);`
