const express=require('express')
const route=express.Router()
const { v4: uuidv4 } = require('uuid');

const repository=[]

route.get('/',async(request,response)=>{
    const data = await repository.map(list=>list)
    return response.json({ say: data})
})


route.post('/repositories', async (request, response) => {
    const {title,url,techs,like}= await request.body
    const id=uuidv4()
    const ids=repository.push(
        {   id:id,
            title: title,
            url: url,
            techs: techs,
            like: like
         }
        )
    return response.json({ say: ids })
})



route.delete('/repositories/:id',async (request, response)=>{
   const {id}=await request.params

   repository.filter(item=>{
          if( item.id == id){
      
          repository.splice(repository.indexOf(item),1)

              return response.json({ say: item.id })
          }else{
              return response.json({ say: "erro" })
          }
      })
})

route.post('/repositories/:id/like',async(request,response)=>{
    const {id}=request.params
    repository.filter(item => {
        if(item.id===id){
            item.like++
            return response.json({ say: item })
        }else{
            return response.status(400).json({ errors: 'nao existes repositorys' })
        }
    })

})

route.put('/repositories/:id', async (request, response) => {
    const { id } = request.params
    const {title,url,techs}=request.body
    repository.filter(item => {
        if (item.id === id) {
          item.title=title,
          item.url=url,
          item.techs=techs
         return response.json({ say: item })
        }else {
            return response.status(400).json({ error: 'nao existe repository' })
        }
    })
})
module.exports=route