const { NOT_FOUND } = require('http-status-codes');
// const {Logger} = require('../config');
const AppErrors = require('../utils/errors/app-errors');

class CrudRepository {

    constructor(model){
        this.model = model;
    }

    async create(data){ //* Here Data --> {col:value}
            const response = await this.model.create(data); 
            return response;
    }

    async destroy(data){ //* Here Data --> {col:value}
      
            const response = await this.model.destroy({where:{
                    id:data
            }})
            if(!response){
                throw new AppErrors("Not able to find the resource",NOT_FOUND);
            }
            return response;
         
    }

    async get(data){ //* Here Data --> {col:value}
       
            const response = await this.model.findByPk(data);
            if(!response){
                throw new AppErrors("Not able to find the resource",NOT_FOUND);
            }
            return response;
       
    }

    async getAll(){
        
            const response = await this.model.findAll();
            return response;
        
    }

    async update(data,id){
           
                const response = await this.model.update(data,{
                    where:{
                    id:id
                    }
                })
                if(!response[0]){
                    throw new AppErrors('Not able to find the resources',NOT_FOUND);
                }

                
                return response;
            
    }
}


module.exports = CrudRepository;

